'use client';
import { useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Label } from './label';

interface PasswordInputProps {
  id: string;
  label: string;
  value?: string; // For controlled component support
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // To handle input changes
  required?: boolean; // Optional required attribute
  placeholder?: string; // Optional placeholder attribute
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className="pr-12 w-full"
          value={value} // Controlled input
          onChange={onChange} // onChange event handler
          required={required} // Optional required attribute
          placeholder={placeholder} // Optional placeholder
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'} // Accessibility
        >
          {showPassword ? '🙈' : '👁️'}
        </Button>
      </div>
    </div>
  );
};
