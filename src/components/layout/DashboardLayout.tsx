import { UserContext } from "@/contexts/UserContext";
import { lazy, Suspense, useContext, useEffect } from "react";
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const LazySideBar = lazy(() => import('@/components/layout/SideBar'));
const LazyHeaderDashboard = lazy(() => import('@/components/layout/HeaderDashboard'));

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
            <LazyHeaderDashboard />
            <div className="grid grid-cols-12 h-full">
                <div className="grid col-span-2 overflow-hidden">
                    <LazySideBar />
                </div>
                <div className="grid col-span-10 mt-20 pb-5 ps-8 pe-4 overflow-y-auto mr-5">
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div>
    ) : null;
}