import React, {useContext, useEffect, useState} from 'react';
import AdminHeader from "../header/adminHeader";
import {IoIosArrowForward} from 'react-icons/io'
import {useRouter} from "next/router";
import {ProfileContext} from "../../context/ProfileContext";
import UnAuthorized from "../unauthorized/UnAuthorized";

const authorizedRoutes = [
    '/admin/posts/[id]/edit',
    '/admin/new-post',
    '/admin/author-request',
    '/admin/authors',
    '/',
    '/admin',
    '/admin/team',
    '/admin/users',
    '/admin/posts'
]

const AdminLayout = ({children}: { children: React.ReactChildren }) => {
    const profileCtx = useContext(ProfileContext);
    // @ts-ignore
    const {user} = profileCtx;
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        if (authorizedRoutes.includes(router.pathname)) {
            if(user){
                if (profileCtx.isLoggedIn && user.role ==='admin') {
                    setIsAllowed(true)
                } else {
                    setIsAllowed(false)
                }
            }else {
                setIsAllowed(false)
            }

        } else {
            setIsAllowed(false);
        }
    }, [router.pathname, profileCtx.user]);

    const handleToggle = (event: any): void => {
        // @ts-ignore
        document.getElementById('page-wrapper').classList.toggle('toggled')
    };

    return isAllowed ? (
        <div id="page-wrapper" className="page-wrapper chiller-theme toggled ">
            <a onClick={handleToggle} id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                <IoIosArrowForward style={{fontSize: 25, fontWeight: 700}}/>
            </a>
            <AdminHeader/>
            {children}
        </div>
    ) : (<UnAuthorized/>);
}

export default AdminLayout;
