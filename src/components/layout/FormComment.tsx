import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../ui/InputFiled";
import { Button } from 'primereact/button';
import { RefObject, useState } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useRouter } from "next/navigation";
import { useLoadingDialog } from "@/contexts/LoadingContext";
import { Messages } from "primereact/messages";
import { InputTextarea } from "primereact/inputtextarea";
import TextareaField from "../ui/TextareaField";

const FormComment = ({ msgs }: {
    msgs: RefObject<Messages | null>
}) => {

    const { showLoadingDialog, hideLoadingDialog } = useLoadingDialog();
    const [loading, setLoading] = useState(false);
    const location = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FieldValues>();

    const confirmSubmit = (): Promise<boolean> => {
        return new Promise((resolve) => {
            confirmDialog({
                message: 'Are you sure you want to submit this comment?',
                header: 'Submit Confirmation',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-success',
                rejectClassName: 'p-button-secondary',
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                },
            });
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        msgs.current?.clear();

        try {

            const confirmed = await confirmSubmit();

            if (!confirmed) {
                setLoading(false);
                return;
            }

            showLoadingDialog('Added new comment...', 'Please wait while your action is being processed...');

            const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    postId: 1,
                }),
            });

            if (!response.ok) {
                throw new Error('Gagal menambahkan komentar');
            }

            hideLoadingDialog();
            msgs.current?.show({
                severity: 'info',
                sticky: true,
                icon: 'pi pi-check',
                closable: false,
                content: (
                    <>
                        <p className="ml-2">Added new comment successfully</p>
                    </>
                )
            })

            await new Promise((resolve) => setTimeout(resolve, 2000));
            location.push('/dashboard');

            console.log('Field Values:', data);
            reset();
        } catch (error: unknown) {
            console.log('Error:', error);
            msgs.current?.show({
                severity: 'error',
                sticky: true,
                summary: 'Error Message',
                detail: 'Failed to add new comment',
                closable: false
            })
        } finally {
            setTimeout(() => {
                setLoading(false);
                msgs.current?.clear();
            }, 3000)
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid gap-2"
        >
            <div className="grid grid-cols-2 gap-10">
                <div className="w-full grid gap-2 h-full">
                    <InputField
                        label="Name"
                        type="text"
                        register={register}
                        placeholder="Input your name"
                        errors={errors}
                        describe="Masukkan nama Anda"
                    />
                    <InputField
                        label="email"
                        type="email"
                        placeholder="Input your email address"
                        register={register}
                        errors={errors}
                        describe="Masukkan email yang valid"
                    />
                </div>
                <TextareaField
                    label="Body"
                    register={register}
                    describe="Masukkan pesan Anda"
                />
            </div>
            <div className="mt-3 flex gap-3 justify-end w-full">
                <ConfirmDialog />
                <Button
                    severity="secondary"
                    label={'reset'}
                    type="reset"
                    size="small"
                    disabled={loading || isSubmitting}
                />
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

export default FormComment;