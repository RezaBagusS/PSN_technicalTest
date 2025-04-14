'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../ui/InputFiled";
import ErrorInput from "../ui/ErrorInput";
import { Button } from 'primereact/button';
import { useEffect, useState } from "react";

const FormLogin = () => {

    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            console.log("Form data:", data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid gap-1"
        >
            <InputField
                label="Username"
                register={register}
            />
            {errors.username && (
                <ErrorInput message={errors.username} />
            )}
            <InputField
                label="Password"
                register={register}
            />
            {errors.password && (
                <ErrorInput message={errors.password} />
            )}

            <div className="mt-3 flex justify-end w-full">
                <Button
                    label={loading || isSubmitting ? 'Loading ...' : 'Submit'}
                    type="submit"
                    disabled={loading || isSubmitting}
                    aria-label="Submit"
                    size="small"
                    loading={loading}
                />
            </div>

        </form>
    )

}

export default FormLogin;