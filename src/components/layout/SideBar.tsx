'use client';

import { usePathname, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ButtonModule } from "../ui/ButtonModule";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const dataModule = [
    {
        text: "Dashboard",
        link: "/dashboard",
        icon: <span className="pi pi-home"></span>,
    },
    {
        text: "Study Case",
        link: "/study-case",
        icon: <span className="pi pi-list"></span>,
    },
];

export const SideBar = () => {

    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const location = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        setLoading(true)
        setUser(null);
        location.push('/');
        setTimeout(() => {
            setLoading(false);
        }, 700)
    }

    return (
        <aside className="bg-custWhite py-5 ps-8 pe-5 shadow-lg flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3">
                {dataModule.map((item, index) => {
                    return (
                        <ButtonModule
                            key={index}
                            link={item.link}
                            text={item.text}
                            icon={item.icon}
                            pathname={pathname}
                        />
                    );
                })}
            </div>
            <div className="flex justify-end">
                <Button
                    label={'Logout'}
                    aria-label="Submit"
                    size="small"
                    disabled={loading}
                    loading={loading}
                    onClick={handleLogout}
                />
            </div>
        </aside>
    )
}

