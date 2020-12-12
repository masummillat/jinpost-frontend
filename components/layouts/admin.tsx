import React, {useEffect} from 'react';
import AdminHeader from "../header/adminHeader";
import {IoIosArrowForward} from 'react-icons/io'

const AdminLayout = ({ children }: {children: React.ReactChildren}) => {
    const handleToggle = (event: any): void =>{
        // @ts-ignore
        document.getElementById('page-wrapper').classList.toggle('toggled')
    }
    return(
        <div id="page-wrapper" className="page-wrapper chiller-theme toggled ">
            <a onClick={handleToggle} id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                <IoIosArrowForward style={{fontSize: 25, fontWeight: 700}}/>
            </a>
            <AdminHeader/>
            {children}
        </div>
    );
}

export default AdminLayout;
