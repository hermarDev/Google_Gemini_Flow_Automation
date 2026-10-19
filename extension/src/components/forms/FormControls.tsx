import React, { forwardRef, useId } from 'react';
import { AlertCircle, Upload, Check } from 'lucide-react';

/* =========================================================================
   FieldError Component (Accessible alert callout)
   ========================================================================= */

export interface FieldErrorProps {
  id?: string;
  error?: string | null;
}

export const FieldError: React.FC<FieldErrorProps> = ({ id, error }) => {
  if (!error) return null;
  return (
    <div
      id={id}
      role="alert"
      className="flex items-center gap-1.5 mt-1.5 text-[11px] text-rose-400 font-medium"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{error}</span>
    </div>
  );
};

/* =========================================================================
   TextInput Component
   ========================================================================= */

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, helperText, error, prefixIcon, id: customId, disabled, className = '', ...props },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="space-y-1">
        <label htmlFor={id} className="block text-xs font-medium text-zinc-300">
          {label}
        </label>
        <div className="relative flex items-center">
          {prefixIcon && (
            <div className="absolute left-2.5 pointer-events-none text-zinc-400">{prefixIcon}</div>
          )}
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full bg-zinc-950 border rounded px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-1 ${
              prefixIcon ? 'pl-8' : ''
            } ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500'
            } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          />
        </div>
        {helperText && !error && (
          <p id={helperId} className="text-[11px] text-zinc-500">
            {helperText}
          </p>
        )}
        <FieldError id={errorId} error={error} />
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

/* =========================================================================
   TextArea Component
   ========================================================================= */

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, helperText, error, id: customId, disabled, className = '', ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="space-y-1">
        <label htmlFor={id} className="block text-xs font-medium text-zinc-300">
          {label}
        </label>
        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`w-full bg-zinc-950 border rounded p-2.5 text-xs font-mono text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-1 resize-y ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
              : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500'
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="text-[11px] text-zinc-500">
            {helperText}
          </p>
        )}
        <FieldError id={errorId} error={error} />
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

/* =========================================================================
   Select Component
   ========================================================================= */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, options, helperText, error, id: customId, disabled, className = '', ...props },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="space-y-1">
        <label htmlFor={id} className="block text-xs font-medium text-zinc-300">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`w-full bg-zinc-950 border rounded px-3 py-1.5 text-xs text-zinc-100 transition-colors focus:outline-none focus:ring-1 ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
              : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500'
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-zinc-900 text-zinc-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
        {helperText && !error && (
          <p id={helperId} className="text-[11px] text-zinc-500">
            {helperText}
          </p>
        )}
        <FieldError id={errorId} error={error} />
      </div>
    );
  }
);
Select.displayName = 'Select';

/* =========================================================================
   SegmentedControl Component
   ========================================================================= */

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

export interface SegmentedControlProps<T extends string> {
  label: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  disabled?: boolean;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-1.5">
      <span className="block text-xs font-medium text-zinc-300">{label}</span>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex items-center p-0.5 rounded border border-zinc-800 bg-zinc-950"
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(opt.value)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span>{opt.label}</span>
              {opt.badge && (
                <span className="text-[10px] px-1 rounded bg-zinc-900 text-zinc-400 font-mono">
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   FileInput Component
   ========================================================================= */

export interface FileInputProps {
  label: string;
  accept?: string;
  selectedFileName?: string | null;
  onFileSelect: (file: File) => void;
  error?: string;
  disabled?: boolean;
  helperText?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  accept,
  selectedFileName,
  onFileSelect,
  error,
  disabled = false,
  helperText = 'Drop file here or click to browse',
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-1">
      <span className="block text-xs font-medium text-zinc-300">{label}</span>
      <label
        htmlFor={inputId}
        className={`flex flex-col items-center justify-center border border-dashed rounded-lg p-4 cursor-pointer transition-colors ${
          error
            ? 'border-rose-500 bg-rose-950/20'
            : selectedFileName
              ? 'border-emerald-700/60 bg-emerald-950/20'
              : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900/60'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="sr-only"
        />
        {selectedFileName ? (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
            <Check className="w-4 h-4" aria-hidden="true" />
            <span className="truncate max-w-[240px]">{selectedFileName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <Upload className="w-4 h-4 text-zinc-400 mb-1" aria-hidden="true" />
            <span className="text-xs text-zinc-300 font-medium">{helperText}</span>
            {accept && <span className="text-[10px] text-zinc-500 mt-0.5">Accepted: {accept}</span>}
          </div>
        )}
      </label>
      <FieldError id={errorId} error={error} />
    </div>
  );
};
