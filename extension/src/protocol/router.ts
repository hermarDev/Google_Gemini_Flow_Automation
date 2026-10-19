import {
  ExtensionMessage,
  parseExtensionMessage,
  validateMessageOrigin,
  SenderValidationResult,
} from './messages.ts';

export type MessageHandler<T extends ExtensionMessage['type']> = (
  message: Extract<ExtensionMessage, { type: T }>,
  sender: { id?: string; url?: string; origin?: string }
) => Promise<unknown> | unknown;

export class MessageRouter {
  private handlers = new Map<string, MessageHandler<never>>();
  private expectedExtensionId?: string;

  constructor(expectedExtensionId?: string) {
    this.expectedExtensionId = expectedExtensionId;
  }

  register<T extends ExtensionMessage['type']>(type: T, handler: MessageHandler<T>): void {
    this.handlers.set(type, (message, sender) => handler(message as never, sender));
  }

  async dispatch(
    rawMessage: unknown,
    sender: { id?: string; url?: string; origin?: string } = {}
  ): Promise<{ handled: boolean; result?: unknown; error?: string }> {
    // 1. Origin validation
    const originCheck: SenderValidationResult = validateMessageOrigin(
      sender,
      this.expectedExtensionId
    );
    if (!originCheck.valid) {
      console.warn('[MessageRouter] Security rejected message:', originCheck.reason);
      return { handled: false, error: originCheck.reason };
    }

    // 2. Schema parse & validation
    const parseResult = parseExtensionMessage(rawMessage);
    if (!parseResult.success || !parseResult.message) {
      console.warn('[MessageRouter] Malformed payload rejected:', parseResult.error);
      return { handled: false, error: parseResult.error };
    }

    const message = parseResult.message;
    const handler = this.handlers.get(message.type);

    if (!handler) {
      return { handled: false, error: `No handler registered for message type: "${message.type}"` };
    }

    try {
      const result = await handler(message as never, sender);
      return { handled: true, result };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { handled: false, error: `Handler error: ${msg}` };
    }
  }
}
