import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string; // To make it a controlled component
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for input change
  required?: boolean; // Optional required attribute
  placeholder?: string; // Optional placeholder
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id} className='text-[16px]'>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value} // Controlled input
        onChange={onChange} // onChange event handler
        required={required} // Optional required attribute
        placeholder={placeholder} // Optional placeholder
      />
    </div>
  );
};
