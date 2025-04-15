import { Avatar } from 'primereact/avatar';
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export const HeaderDashboard = () => {

    const { getUser } = useContext(UserContext);

    return (
        <div className="bg-custWhite px-8 py-3 shadow-lg flex justify-between items-center z-20 absolute w-full">
            <h1 className="font-semibold text-custPurple text-xl">
                Frontend Development Test - PSN
            </h1>
            <div className='flex justify-between items-center gap-3'>
                <Avatar icon="pi pi-user" size="normal" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
                <p className='text-base'>
                    {getUser() ? getUser() : 'User Tidak Ditemukan'}
                </p>
            </div>
        </div>
    )
}

