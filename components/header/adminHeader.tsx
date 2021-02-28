import React, {useContext, useState} from 'react';
import Link from 'next/link';
import {ProfileContext} from "../../context/ProfileContext";
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from "reactstrap";
const AdminHeader: React.FC = ()=>{
    const profileCtx = useContext(ProfileContext);
    const [toolbarOpen, setToolbarOpen] = useState(false);
    const toggleToolbar = () => setToolbarOpen(prevState => !prevState);
    // @ts-ignore
    const { user, handleLogout } = profileCtx;
    const handleToggle = (event: any): void =>{
        // @ts-ignore
        document.getElementById('page-wrapper').classList.toggle('toggled')
    }
    const handlePostToggle = (): void =>{
        // @ts-ignore
        document.getElementById('postDropdown').classList.toggle('active')
        // @ts-ignore
        if(document.getElementById('postSubMenu').style.display === 'block'){
            // @ts-ignore
            document.getElementById('postSubMenu').style.display = 'none';
        }else{
            // @ts-ignore
            document.getElementById('postSubMenu').style.display = 'block'
        }
    }
    const handleUserToggle = (): void =>{
        // @ts-ignore
        document.getElementById('userDropdown').classList.toggle('active')
        // @ts-ignore
        if(document.getElementById('userSubMenu').style.display === 'block'){
            // @ts-ignore
            document.getElementById('userSubMenu').style.display = 'none';
        }else{
            // @ts-ignore
            document.getElementById('userSubMenu').style.display = 'block'
        }
    }

    const handleNotificationToggle = (): void =>{
        // @ts-ignore
        document.getElementById('notificationDropdown').classList.toggle('active')
        // @ts-ignore
        if(document.getElementById('notificationSubMenu').style.display === 'block'){
            // @ts-ignore
            document.getElementById('notificationSubMenu').style.display = 'none';
        }else{
            // @ts-ignore
            document.getElementById('notificationSubMenu').style.display = 'block'
        }
    };

    const handlePaymentToggle = (): void =>{
        // @ts-ignore
        document.getElementById('userDropdown').classList.toggle('active')
        // @ts-ignore
        if(document.getElementById('paymentSubmenu').style.display === 'block'){
            // @ts-ignore
            document.getElementById('paymentSubmenu').style.display = 'none';
        }else{
            // @ts-ignore
            document.getElementById('paymentSubmenu').style.display = 'block'
        }
    }
    return(
        <div>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <Link href="/admin/users"><a>JinPost</a></Link>
                        <div onClick={handleToggle} id="close-sidebar">
                            <i className="fas fa-times"/>
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <ul>
                            <li id="postDropdown" className="sidebar-dropdown">
                                <a onClick={handlePostToggle} href="#">
                                    <i className="fas fa-paste"/>
                                    <span>Posts</span>
                                </a>
                                <div id="postSubMenu" className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <Link href="/admin/posts">
                                                <a >All Posts</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/new-post">
                                                <a >Add New</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/categories">
                                                <a >Categories</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="userDropdown" className="sidebar-dropdown">
                                <a onClick={handleUserToggle} href="#">
                                    <i className="fas fa-users"/>
                                    <span>Users</span>
                                </a>
                                <div id="userSubMenu" className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <Link href="/admin/team">
                                                <a >Team members</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/authors">
                                                <a >Authors</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/users">
                                                <a >Users</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li  id="notificationDropdown"  className="sidebar-dropdown">
                            <a onClick={handleNotificationToggle} href="#">
                                <i className="fas fa-bell"></i>
                                <span>Notifications</span>
                            </a>
                            <div id="notificationSubMenu" className="sidebar-submenu">
                                <ul>
                                    <li>
                                        <Link href="/admin/author-request">
                                            <a>Author request</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                            <li  id="paymentDropdown"  className="sidebar-dropdown">
                                <a onClick={handlePaymentToggle} href="#">
                                    <i className="fas fa-bell"></i>
                                    <span>Payments</span>
                                </a>
                                <div id="paymentSubmenu" className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <Link href="/admin/payment">
                                                <a>Payment</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="dashboard-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-right">
                                <div className="navbar-profile">
                                    <Dropdown isOpen={toolbarOpen} toggle={toggleToolbar}>
                                        <DropdownToggle nav >
                                           <span className="mr-2"> {user?user.name : ''}</span>
                                            <img
                                                style={{width: 40,height: 40, borderRadius: '50%'}}
                                                src={user && user.profileImage || '/static/img/profile.jpg'}
                                                alt={user && user.name || ''}
                                            />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <Link href="/admin/profile-edit"><a>Profile</a></Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link href="/admin/change-password"><a>Change password</a></Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <div onClick={handleLogout} className="font-weight-bold">Log Out</div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;
