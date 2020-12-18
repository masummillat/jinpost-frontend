import React from 'react';
import Link from 'next/link';
const AdminHeader: React.FC = ()=>{

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
    return(
        <div>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <Link href="/admin/users"><a>JinPost</a></Link>
                        <div onClick={handleToggle} id="close-sidebar">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <ul>
                            <li id="postDropdown" className="sidebar-dropdown">
                                <a onClick={handlePostToggle} href="#">
                                    <i className="fas fa-paste"></i>
                                    <span>Posts</span>
                                </a>
                                <div id="postSubMenu" className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <Link href="/admin/post">
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
                                    <i className="fas fa-users"></i>
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
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle" id="dropdownMenuButton"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            John Doe
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="profile-edit.php">My Profile</a>
                                            <a className="dropdown-item" href="change-password.php">Chnage Password</a>
                                            <a className="dropdown-item" href="#">Logout</a>
                                        </div>
                                    </div>
                                    <img className="profile-pic" src="/static/img/profile.jpg" alt="profile pic" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader;
