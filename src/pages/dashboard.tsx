import DashboardLayout from '@/components/layout/DashboardLayout';
import TableComments from '@/components/ui/TableComments';
import { IComments } from '@/types/IComments';
import { Suspense, useState } from 'react';

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
                data: []
            }
        }
    }
}

export default function DashboardPage({ status, data }: {
    status: boolean;
    data: IComments[];
}) {

    return (
        <DashboardLayout>
            <div className='space-y-4'>
                <h2 className="font-semibold text-custPurple text-2xl">Dashboard</h2>
                <TableComments data={status ? data : []} />
            </div>
        </DashboardLayout>
    );
}