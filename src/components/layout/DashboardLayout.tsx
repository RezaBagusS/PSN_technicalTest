import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { usePathname } from "next/navigation";
import BreadCrumbManagement from "@/components/ui/BreadcumbManagement";
import { Button } from "primereact/button";
import dynamic from "next/dynamic";

const LazySideBar = dynamic(() => import('@/components/layout/SideBar'));
const LazyHeaderDashboard = dynamic(() => import('@/components/layout/HeaderDashboard'));
const LazyMobileSideBar = dynamic(() => import('@/components/layout/MobileSideBar'));

export default function DashboardLayout({ children }: { children: ReactNode }) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { getUser } = useContext(UserContext);

    const lastPath = pathname.split('/').pop()?.split('-').join(' ');

    useEffect(() => {

        if (!getUser()) {
            router.push('/');
        }
    }, [router, getUser]);

    return getUser() ? (
        <>
            <LazyMobileSideBar
                visible={visible}
                setVisible={setVisible}
            />
            <div className="bg-custBackground h-screen w-full flex flex-col">
                <LazyHeaderDashboard />
                <div className="grid grid-cols-12 h-full">
                    <div className="lg:grid col-span-2 hidden overflow-hidden">
                        <LazySideBar />
                    </div>
                    <div className="col-span-12 lg:col-span-10 mt-20 pb-5 px-2 md:ps-8 md:pe-4 overflow-y-auto mr-2 md:mr-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="lg:hidden inline-block">
                                <Button
                                    icon="pi pi-bars"
                                    onClick={() => setVisible(true)}
                                />
                            </span>
                            <h2 className="font-semibold text-custPurple text-2xl capitalize">{lastPath}</h2>
                        </div>
                        <BreadCrumbManagement />
                        {children}
                    </div>
                </div>
            </div>
        </>
    ) : null;
}