import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../ui/InputFiled";
import ErrorInput from "../ui/ErrorInput";
import { Button } from 'primereact/button';
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserContext } from "../../contexts/UserContext";
import { Messages } from "primereact/messages";

const validLogin = {
    username: "frontendTest",
    password: "frontendTest123",
}

const FormLogin = () => {

    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const location = useRouter();
    const msgs = useRef<Messages | null>(null);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        msgs.current?.clear();
        try {

            if (data.username === validLogin.username && data.password === validLogin.password) {
                msgs.current?.show({
                    severity: 'success',
                    sticky: true,
                    icon: 'pi pi-check',
                    closable: false,
                    content: (
                        <>
                            <p className="ml-2">Login Account Successfully</p>
                        </>
                    )
                })
                setUser(data as User);
                setSuccessLogin(true);

            } else {
                throw new Error("Invalid username or password");
            }

            await new Promise((resolve) => setTimeout(resolve, 3000));
            location.push('/dashboard');
        } catch (error: any) {
            console.error(error);
            msgs.current?.show({
                severity: 'error',
                sticky: true,
                icon: 'pi pi-times',
                closable: false,
                content: (
                    <>
                        <p className="ml-2">Invalid username or password</p>
                    </>
                )
            })
        } finally {
            setTimeout(() => {
                msgs.current?.clear()
            }, 3000)
            setLoading(false);
            setSuccessLogin(false);
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full grid gap-1 mt-2"
            >
                <Messages ref={msgs} />

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
                        label={loading || isSubmitting ? successLogin ? 'Redirecting ...' : 'Loading ...'  : 'Submit'}
                        type="submit"
                        aria-label="Submit"
                        size="small"
                        disabled={loading || isSubmitting}
                        loading={loading}
                    />
                </div>
            </form>
        </>
    )

}

export default FormLogin;