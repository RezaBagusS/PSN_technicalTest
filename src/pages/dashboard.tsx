import DashboardLayout from '@/components/layout/DashboardLayout';
import TableComments from '@/components/ui/TableComments';
import { IComments } from '@/types/IComments';
import { Messages } from 'primereact/messages';
import { useEffect, useRef } from 'react';

export async function getServerSideProps() {

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data: IComments[] = await res.json();

        return {
            props: {
                status: true,
                data: data
            }
        }
    } catch (error) {
        return {
            props: {
                status: false,
                message: error,
                data: []
            }
        }
    }
}

export default function DashboardPage({ status, data }: {
    status: boolean;
    data: IComments[];
}) {

    const msgs = useRef<Messages | null>(null);

    useEffect(() => {
        if (data) {
            msgs.current?.clear()
            msgs.current?.show({
                severity: 'info',
                sticky: true,
                summary: 'Info',
                detail: 'Fetched successfully',
                closable: false
            })
        }

        setTimeout(() => {
            msgs.current?.clear()
        }, 3000)
    }, [data])

    return (
        <DashboardLayout>
            <Messages ref={msgs} className='text-xs'/>
            <div className='space-y-4'>
                <TableComments data={status ? data : []} msgs={msgs} />
            </div>
        </DashboardLayout>
    );
}