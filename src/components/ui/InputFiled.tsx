import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
interface InputFieldProps {
    label: string;
    register: UseFormRegister<FieldValues>;
    placeholder?: string;
    errors?: FieldErrors<FieldValues>;
    describe?: string;
    type: 'text' | 'email' | 'password';
}

const InputField: React.FC<InputFieldProps> = ({ label, register, errors, placeholder, describe, type }) => {
    const fieldName = label.toLowerCase();

    const validationRules = (() => {
        switch (type) {
            case 'text':
                return {
                    required: `${label} is required`,
                    minLength: {
                        value: 3,
                        message: `${label} must be at least 3 characters long`,
                    },
                };
            case 'email':
                return {
                    required: `${label} is required`,
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: `Please enter a valid ${label.toLowerCase()} address`,
                    },
                };
            case 'password':
                return {
                    required: `${label} is required`,
                    minLength: {
                        value: 8,
                        message: `${label} must be at least 8 characters long`,
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: `${label} must contain at least one uppercase letter, one lowercase letter, and one number`,
                    },
                };
            default:
                return {};
        }
    })();

    return (
        <div className="flex flex-col gap-0.5 w-full">
            <div className='flex flex-col gap-2'>
                <label htmlFor={fieldName} className="font-medium capitalize">
                    {label}
                </label>
                <InputText
                    {...register(fieldName, validationRules)}
                    id={fieldName}
                    aria-describedby={`${fieldName}-help`}
                    className={`p-inputtext-sm ${errors?.[fieldName] ? 'p-invalid' : ''}`}
                    variant="filled"
                    placeholder={placeholder}
                    type={type}
                />
            </div>
            {describe && (
                <small id={`${fieldName}-help`} className="text-gray-400 text-xs">
                    {describe}
                </small>
            )}
            {errors?.[fieldName] && (
                <small className="text-red-500" id={`${fieldName}-error`}>
                    {errors[fieldName]?.message as string}
                </small>
            )}
        </div>
    );
};

export default InputField;