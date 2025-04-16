import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../ui/InputFiled";
import { Button } from 'primereact/button';
import { useState } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useRouter } from "next/navigation";

const FormComment = () => {

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
        try {

            const confirmed = await confirmSubmit();

            if (!confirmed) {
                setLoading(false);
                return;
            }

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

            location.push('/dashboard');

            console.log('Field Values:', data);
            reset(); 
        } catch (error: unknown) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid gap-2"
        >
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

            <div className="mt-3 flex justify-end w-full">
                <ConfirmDialog />
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