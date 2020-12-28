import React, {useContext, useEffect, useState} from 'react';
import AdminHeader from "../header/adminHeader";
import {IoIosArrowForward} from 'react-icons/io'
import {useRouter} from "next/router";
import isAuthenticated from "../../utils/isAuthenticated";
import {ProfileContext} from "../../context/ProfileContext";
import UnAuthorized from "../unauthorized/UnAuthorized";

const AdminLayout = ({ children }: {children: React.ReactChildren}) => {
    const userCtx = useContext(ProfileContext);
    // @ts-ignore
    const {user} = userCtx;
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const router = useRouter();
    useEffect(()=>{
        if(user){
            if (router.pathname.startsWith('/admin/') && isAuthenticated() && user.role === 'admin') {
                setIsAllowed(true)
            }
        }
    },[user])

    const handleToggle = (event: any): void =>{
        // @ts-ignore
        document.getElementById('page-wrapper').classList.toggle('toggled')
    }
    return isAllowed ? (
        <div id="page-wrapper" className="page-wrapper chiller-theme toggled ">
            <a onClick={handleToggle} id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                <IoIosArrowForward style={{fontSize: 25, fontWeight: 700}}/>
            </a>
            <AdminHeader/>
            {children}
        </div>
    )  : (<UnAuthorized/>);
}

export default AdminLayout;
