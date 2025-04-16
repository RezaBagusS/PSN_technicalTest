import DashboardLayout from "@/components/layout/DashboardLayout";
import FormComment from "@/components/layout/FormComment";

export default function CreateCommentPage() {

    return (
        <DashboardLayout>
            <div className='space-y-4 bg-white rounded-md ring-1 ring-black/5 px-4 py-3'>
                <FormComment />
            </div>
        </DashboardLayout>
    );
}