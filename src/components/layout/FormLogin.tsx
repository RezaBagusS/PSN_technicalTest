import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../ui/InputFiled";
import ErrorInput from "../ui/ErrorInput";
import { Button } from 'primereact/button';
import { useContext, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { User, UserContext } from "../../contexts/UserContext";

const validLogin = {
    username: "frontendTest",
    password: "frontendTest123",
}

const FormLogin = () => {

    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const location = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {

            if (data.username === validLogin.username && data.password === validLogin.password) {
                showToast({
                    severity: 'success',
                    summary: 'Login Success',
                    detail: `Hi, ${data.username}`,
                })
                setUser(data as User);
            } else {
                throw new Error("Invalid username or password");
            }

            location.push('/dashboard');
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
                    aria-label="Submit"
                    size="small"
                    disabled={loading || isSubmitting}
                    loading={loading}
                />
            </div>

        </form>
    )

}

export default FormLogin;