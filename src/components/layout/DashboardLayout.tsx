import { HeaderDashboard } from "@/components/layout/HeaderDashboard";
import { SideBar } from "@/components/layout/SideBar";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { showToast } = useToast();
    const router = useRouter();
    const { getUser } = useContext(UserContext);

    useEffect(() => {
        if (!getUser()) {
            showToast({
                severity: 'error',
                summary: 'Failed get data User',
                detail: 'Redirect to login page',
            });
            router.push('/');
        }   
    }, [router, getUser]);

    return getUser() ? (
        <div className="bg-custBackground h-screen w-full flex flex-col">
            <HeaderDashboard />
            <div className="grid grid-cols-12 h-full">
                <div className="grid col-span-2 overflow-hidden">
                    <SideBar />
                </div>
                <div className="grid col-span-10 mt-20 pb-5 ps-8 pe-4 overflow-y-auto mr-5">
                    {children}
                </div>
            </div>
        </div>
    ) : null;
}