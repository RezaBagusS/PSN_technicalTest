'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../ui/InputFiled";
import ErrorInput from "../ui/ErrorInput";
import { Button } from 'primereact/button';
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

const validLogin = {
    username: "frontendTest",
    password: "frontendTest123",
}

const FormLogin = () => {

    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            console.log("Form data:", data);

            if (data.username === validLogin.username && data.password === validLogin.password) {
                showToast({
                    severity: 'success',
                    summary: 'Login Success',
                    detail: 'Login Validation has been successful',
                })
            } else {
                throw new Error("Invalid username or password");
            }

            

            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error: any) {
            console.error(error.message);
            console.log("Invalid credentials");
            showToast({
                severity: 'error',
                summary: 'Failed Login',
                detail: error.message,
            })
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
                type="text"
                register={register}
            />
            {errors.username && (
                <ErrorInput message={errors.username} />
            )}
            <InputField
                label="Password"
                type="password"
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