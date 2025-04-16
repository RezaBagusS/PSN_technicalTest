import DashboardLayout from "@/components/layout/DashboardLayout";
import FormComment from "@/components/layout/FormComment";
import { Messages } from "primereact/messages";
import { useRef } from "react";

export default function CreateCommentPage() {

    const msgs = useRef<Messages | null>(null);

    return (
        <DashboardLayout>
            <Messages ref={msgs} />
            <div className='space-y-4 bg-white rounded-md ring-1 ring-black/5 px-4 py-3'>
                <FormComment msgs={msgs} />
            </div>
        </DashboardLayout>
    );
}