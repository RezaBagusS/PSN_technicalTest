import DashboardLayout from '@/components/layout/DashboardLayout';
import TableComments from '@/components/ui/TableComments';
import { IComments } from '@/types/IComments';
import { Suspense, useState } from 'react';

export async function getServerSideProps() {

    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`)
    const data: IComments[] = await res.json();

    return {
        props: {
            status: true,
            data: data
        }
    }
}

export default function DashboardPage({ status, data }: {
    status: boolean;
    data: IComments[];
}) {

    const [dataComment, setDataComment] = useState<IComments[]>(data);

    return (
        <DashboardLayout>
            <div className='space-y-4'>
                <h2 className="font-semibold text-custPurple text-2xl">Dashboard</h2>
                <Suspense
                    fallback={
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    }
                >
                    <TableComments data={status ? dataComment : []} />
                    {/* <TableComments data={[]} /> */}
                </Suspense>
            </div>
        </DashboardLayout>
    );
}