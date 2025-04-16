import { Sidebar } from "primereact/sidebar";
import { Dispatch, SetStateAction, useContext } from "react";
import SideBar from "@/components/layout/SideBar";
import { Avatar } from "primereact/avatar";
import { UserContext } from "@/contexts/UserContext";

const MobileSideBar = ({ visible, setVisible }: {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}) => {

    const { getUser } = useContext(UserContext);

    const customIcons = (
        <>
            <div className='flex justify-between items-center gap-3 mr-3'>
                <p className='text-base'>
                    {getUser() ? getUser() : 'User Tidak Ditemukan'}
                </p>
                <Avatar icon="pi pi-user" size="normal" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
            </div>
        </>
    );

    return (
        <Sidebar visible={visible} onHide={() => setVisible(false)} icons={customIcons}>
            <SideBar />
        </Sidebar>
    )
}

export default MobileSideBar;