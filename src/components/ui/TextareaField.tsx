
import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
    label: string;
    register: UseFormRegister<FieldValues>;
    describe?: string;
}

const TextareaField: React.FC<InputFieldProps> = ({ label, register, describe }) => {

    const fieldName = label.toLowerCase();

    return (
        <div className="flex flex-col gap-0.5 w-full h-full">
            <div className='flex flex-col gap-2'>
                <label htmlFor={fieldName} className="font-medium capitalize">
                    {label}
                </label>
                <InputTextarea
                    autoResize
                    {...register(fieldName)}
                    id={fieldName}
                    aria-describedby={`${fieldName}-help`}
                    className={`p-inputtext-sm`}
                    variant="filled"
                    rows={5} cols={30}
                />
            </div>
            {describe && (
                <small id={`${fieldName}-help`} className="text-gray-400 text-xs">
                    {describe}
                </small>
            )}
        </div>
    )
}

export default TextareaField;