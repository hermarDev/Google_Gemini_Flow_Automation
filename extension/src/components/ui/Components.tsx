import React, { useEffect, useRef } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HelpCircle,
  Loader2,
  XCircle,
  X,
  FileQuestion,
} from 'lucide-react';
import { JobStatus } from '../../shared/types.ts';

/* =========================================================================
   StatusBadge Component (Truth-in-State representation)
   ========================================================================= */

export interface StatusBadgeProps {
  status: JobStatus;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'draft':
      case 'ready':
      case 'pending':
        return {
          bg: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
          icon: Clock,
          defaultLabel: status === 'draft' ? 'Draft' : status === 'ready' ? 'Ready' : 'Pending',
          animate: false,
        };
      case 'submitting':
        return {
          bg: 'bg-blue-950/70 text-blue-300 border-blue-800/60',
          icon: Loader2,
          defaultLabel: 'Submitting',
          animate: true,
        };
      case 'generating':
        return {
          bg: 'bg-blue-950/70 text-blue-400 border-blue-800/60',
          icon: Loader2,
          defaultLabel: 'Generating',
          animate: true,
        };
      case 'verifying':
        return {
          bg: 'bg-indigo-950/70 text-indigo-300 border-indigo-800/60',
          icon: Loader2,
          defaultLabel: 'Verifying',
          animate: true,
        };
      case 'downloading':
        return {
          bg: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/60',
          icon: Loader2,
          defaultLabel: 'Downloading',
          animate: true,
        };
      case 'completed':
        return {
          bg: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60',
          icon: CheckCircle2,
          defaultLabel: 'Completed',
          animate: false,
        };
      case 'needs-review':
        return {
          bg: 'bg-amber-950/70 text-amber-300 border-amber-800/60',
          icon: AlertTriangle,
          defaultLabel: 'Needs Review',
          animate: false,
        };
      case 'policy-refusal':
        return {
          bg: 'bg-rose-950/70 text-rose-300 border-rose-800/60',
          icon: XCircle,
          defaultLabel: 'Policy Refusal',
          animate: false,
        };
      case 'failed':
      default:
        return {
          bg: 'bg-rose-950/70 text-rose-300 border-rose-800/60',
          icon: AlertCircle,
          defaultLabel: 'Failed',
          animate: false,
        };
    }
  };

  const { bg, icon: Icon, defaultLabel, animate } = getBadgeConfig();
  const text = label || defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${bg} ${className}`}
    >
      <Icon className={`w-3 h-3 ${animate ? 'animate-spin' : ''}`} aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
};

/* =========================================================================
   ProgressIndicator Component (Strictly Truthful, Zero Speculative Crawl)
   ========================================================================= */

export interface ProgressIndicatorProps {
  completed: number;
  total: number;
  label?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  completed,
  total,
  label = 'Batch Progress',
}) => {
  const safeTotal = Math.max(0, total);
  const safeCompleted = Math.min(Math.max(0, completed), safeTotal);
  const percentage = safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-300">{label}</span>
        <span className="font-mono text-zinc-400">
          {safeCompleted} of {safeTotal} ({percentage}%)
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={safeCompleted}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-label={label}
        className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden"
      >
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/* =========================================================================
   EmptyState Component
   ========================================================================= */

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.FC<{ className?: string; 'aria-hidden'?: string }>;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = FileQuestion,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-zinc-800 bg-zinc-950">
      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-zinc-400" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
      <p className="text-xs text-zinc-400 mt-1 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-3 py-1.5 text-xs font-medium rounded border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

/* =========================================================================
   NoticeBanner Component
   ========================================================================= */

export type NoticeVariant = 'info' | 'warning' | 'error' | 'success';

export interface NoticeBannerProps {
  title: string;
  message?: string;
  variant?: NoticeVariant;
  onDismiss?: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({
  title,
  message,
  variant = 'info',
  onDismiss,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: 'border-amber-900/60 bg-amber-950/20 text-amber-200',
          icon: AlertTriangle,
          iconColor: 'text-amber-400',
        };
      case 'error':
        return {
          container: 'border-rose-900/60 bg-rose-950/20 text-rose-200',
          icon: AlertCircle,
          iconColor: 'text-rose-400',
        };
      case 'success':
        return {
          container: 'border-emerald-900/60 bg-emerald-950/20 text-emerald-200',
          icon: CheckCircle2,
          iconColor: 'text-emerald-400',
        };
      case 'info':
      default:
        return {
          container: 'border-blue-900/60 bg-blue-950/20 text-blue-200',
          icon: HelpCircle,
          iconColor: 'text-blue-400',
        };
    }
  };

  const { container, icon: Icon, iconColor } = getVariantStyles();

  return (
    <div
      role="status"
      className={`flex items-start justify-between gap-3 p-3 rounded border text-xs leading-relaxed ${container}`}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`} aria-hidden="true" />
        <div className="min-w-0">
          <span className="font-semibold block">{title}</span>
          {message && <p className="text-[11px] opacity-90 mt-0.5">{message}</p>}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-zinc-400 hover:text-zinc-200 p-0.5 rounded transition-colors shrink-0"
          aria-label="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

/* =========================================================================
   Card Component
   ========================================================================= */

export interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, header, footer, className = '' }) => {
  return (
    <div className={`rounded-lg border border-zinc-800 bg-zinc-900/40 ${className}`}>
      {header && (
        <div className="px-4 py-3 border-b border-zinc-800 font-medium text-xs text-zinc-200">
          {header}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-950/40 rounded-b-lg text-xs">
          {footer}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   ModalDialog Primitive
   ========================================================================= */

export interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus first focusable element
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0]?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <h2 id="dialog-title" className="text-sm font-semibold text-zinc-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 p-1 rounded transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4 text-xs text-zinc-300 leading-relaxed">{children}</div>
        {footer && (
          <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
