import { InputText } from 'primereact/inputtext';
import { FieldValues, UseFormRegister } from 'react-hook-form';

function InputField({
    label,
    register,
    describe,
    type,
}: {
    label: string;
    register: UseFormRegister<FieldValues>;
    describe?: string;
    type: string;
}) {

    const usernameLowerCase = label.toLowerCase();

    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={`${usernameLowerCase}`}>{label}</label>
            <InputText 
                {...register(usernameLowerCase, {
                    minLength: {
                        value: 8,
                        message: "Username must be at least 8 characters long",
                    },
                    required: `${label} is required`,
                })}
                id={`${usernameLowerCase}`} 
                aria-describedby={`${usernameLowerCase}-help`}
                className='p-inputtext-sm'
                variant="filled"
                type={type}
            />
            {
                describe && (
                    <small id={`${usernameLowerCase}-help`}>
                        {describe}
                    </small>
                )
            }
        </div>
    )
}

export default InputField;