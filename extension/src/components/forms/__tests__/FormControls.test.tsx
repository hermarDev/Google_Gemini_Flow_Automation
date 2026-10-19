import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  TextInput,
  TextArea,
  Select,
  SegmentedControl,
  FileInput,
  FieldError,
} from '../FormControls.tsx';

describe('Reusable Form Controls (CORE-011 / RES-017)', () => {
  describe('FieldError', () => {
    it('renders role="alert" when error string is present', () => {
      render(<FieldError error="Prompt is required" />);
      const alert = screen.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toContain('Prompt is required');
    });

    it('renders null when error is undefined or empty', () => {
      const { container } = render(<FieldError error={undefined} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('TextInput', () => {
    it('renders input with label and handles typing', () => {
      const handleChange = vi.fn();
      render(<TextInput label="Run Name" onChange={handleChange} />);

      const input = screen.getByLabelText('Run Name');
      fireEvent.change(input, { target: { value: 'Sci-Fi Batch 01' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('sets aria-invalid and links aria-describedby when error exists', () => {
      render(<TextInput label="Project URL" error="Invalid Google URL" />);

      const input = screen.getByLabelText('Project URL');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeDefined();

      const alert = screen.getByRole('alert');
      expect(alert.getAttribute('id')).toBe(errorId);
    });

    it('respects disabled state', () => {
      render(<TextInput label="Disabled Field" disabled />);
      const input = screen.getByLabelText('Disabled Field');
      expect((input as HTMLInputElement).disabled).toBe(true);
    });
  });

  describe('TextArea', () => {
    it('renders textarea with monospace styling and handles input', () => {
      const handleChange = vi.fn();
      render(<TextArea label="Prompt Batch" onChange={handleChange} />);

      const textarea = screen.getByLabelText('Prompt Batch');
      fireEvent.change(textarea, { target: { value: 'Prompt line 1\nPrompt line 2' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('sets aria-invalid and displays error alert on failure', () => {
      render(<TextArea label="Prompt Batch" error="Batch exceeds 50 prompts" />);
      const textarea = screen.getByLabelText('Prompt Batch');
      expect(textarea.getAttribute('aria-invalid')).toBe('true');
      expect(screen.getByRole('alert').textContent).toContain('Batch exceeds 50 prompts');
    });
  });

  describe('Select', () => {
    it('renders options and responds to selection', () => {
      const handleChange = vi.fn();
      const options = [
        { value: 'flow', label: 'Google Flow' },
        { value: 'gemini', label: 'Gemini Chat' },
      ];
      render(<Select label="Provider" options={options} onChange={handleChange} />);

      const select = screen.getByLabelText('Provider');
      fireEvent.change(select, { target: { value: 'gemini' } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('SegmentedControl', () => {
    it('renders radiogroup with keyboard and aria-checked states', () => {
      const handleChange = vi.fn();
      const options = [
        { value: 't2v', label: 'Text to Video' },
        { value: 'i2v', label: 'Image to Video', badge: 'Fast' },
      ];

      render(
        <SegmentedControl label="Mode" options={options} value="t2v" onChange={handleChange} />
      );

      const radiogroup = screen.getByRole('radiogroup', { name: 'Mode' });
      expect(radiogroup).toBeDefined();

      const radio1 = screen.getByRole('radio', { name: /text to video/i });
      const radio2 = screen.getByRole('radio', { name: /image to video/i });

      expect(radio1.getAttribute('aria-checked')).toBe('true');
      expect(radio2.getAttribute('aria-checked')).toBe('false');

      fireEvent.click(radio2);
      expect(handleChange).toHaveBeenCalledWith('i2v');
    });
  });

  describe('FileInput', () => {
    it('renders file picker and displays selected filename', () => {
      const handleFile = vi.fn();
      render(
        <FileInput
          label="Reference Frame"
          selectedFileName="character_anchor.png"
          onFileSelect={handleFile}
        />
      );

      expect(screen.getByText('character_anchor.png')).toBeDefined();
    });

    it('renders error state when invalid file is provided', () => {
      render(
        <FileInput
          label="Reference Frame"
          error="File size exceeds 10MB limit"
          onFileSelect={vi.fn()}
        />
      );

      expect(screen.getByRole('alert').textContent).toContain('File size exceeds 10MB limit');
    });
  });
});
