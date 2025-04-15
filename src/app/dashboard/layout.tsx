'use client'

import { HeaderDashboard } from "@/components/layout/HeaderDashboard";
import { SideBar } from "@/components/layout/SideBar";
import { UserContext } from "@/components/layout/UserContext";
import { useContext, useEffect } from "react";
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { showToast } = useToast();
    const location = useRouter();

    const { getUser } = useContext(UserContext);
    useEffect(() => {
        if (!getUser()) {
            showToast({
                severity: 'error',
                summary: ' Failed get data User',
                detail: `Redirect to login page`,
            })
            location.push('/')
        }
    }, [location, getUser])

    return getUser() && (
        <div className="bg-custBackground h-screen w-full flex flex-col">
            <HeaderDashboard />
            <div className="grid grid-cols-12 h-full">
                <div className="grid col-span-2">
                    <SideBar />
                </div>
                <div className="grid col-span-10 py-5 px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}