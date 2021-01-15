import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import UserLoginComponent from "../login/userLoginComponent";
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from "reactstrap";
import {GiBookmarklet} from 'react-icons/gi';
import {IoMdNotificationsOutline} from "react-icons/io";
import WriterRequestModal from "../authors/WriterRequestModal";
import {ProfileContext} from "../../context/ProfileContext";
import httpClient from "../../utils/api";
import {CategoryEntry} from "../../types";


const UserHeader = () => {
    const profileCtx = useContext(ProfileContext);
    const [categories, setCategories] = useState<CategoryEntry[]>([])
    // @ts-ignore
    const {user, isLoggedIn, handleLogin, handleLogout} = profileCtx;
    const [visible, setVisible] = useState(false);
    const [wriVisible, setWriVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [toolbarOpen, setToolbarOpen] = useState(false);
    const toggle = () => setVisible(!visible);
    const toggleWriVisible = () => setWriVisible(!wriVisible);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleToolbar = () => setToolbarOpen(prevState => !prevState);

    useEffect(() => {
        httpClient.get('/categories').then(res => {
            setCategories(res.data);
        }).catch(err => {
        });
    }, [setCategories]);

    return (
        <header>
            <nav className="container navbar navbar-expand-lg">
                <Link href="/">
                    <a className="navbar-brand">
                        <img src="/static/img/logo.png"/>
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto chinasdg-nav">
                        <li className="nav-item active">
                            <Link href="/">
                                <a className="nav-link selected">Home</a>
                            </Link>
                        </li>
                        <li>
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle nav caret>
                                    Topics
                                </DropdownToggle>
                                <DropdownMenu>
                                    {
                                        categories.map((category: CategoryEntry) => (
                                            <Link key={category.id} href={`/categories/${category.id}`}>
                                                <a className="dropdown-item">{category.name} </a>
                                            </Link>
                                        ))
                                    }
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="nav-item">
                            <Link href="/discover">
                                <a className="nav-link">Discover</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/authors">
                                <a className="nav-link">Authors</a>
                            </Link>
                        </li>
                    </ul>
                    {
                        isLoggedIn ? (
                            <div className="my-2 my-lg-0" style={{display: 'contents'}}>
                                <a href="#" className="notification-icon">
                                    <IoMdNotificationsOutline style={{fontSize: 24}}/>
                                </a>

                                <a onClick={toggleWriVisible} className="be-writter">
                                    <GiBookmarklet
                                        style={{fontSize: 24}} 
                                        className=" pr-2 "/>
                                        {user && user.role === 'author' ? 'Write' : 'Become a writter'}
                                </a>

                                <Dropdown isOpen={toolbarOpen} toggle={toggleToolbar}>
                                    <DropdownToggle nav>
                                        {user && user.profileImage ?
                                            <img style={{width: 40, borderRadius: 7}} src={user.profileImage}/> :
                                            <img style={{width: 50, borderRadius: 7}} src="/static/img/profile.jpg"/>}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link href="/membership"><a>Upgrade</a></Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link href="/new-post"><a>Write</a></Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            {user && (<Link href={`/${user.domain}`}><a>Profile</a></Link>)}
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link href="/account-settings"><a>Account Settings</a></Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <a onClick={handleLogout} className="btn btn-link">Log Out</a>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        ) : (<div className="my-2 my-lg-0">
                            <Link href="/registration">
                                <a className="green-text register-item">Register</a>
                            </Link>
                            <button onClick={toggle} className="btn btn-primary">Login</button>
                        </div>)
                    }

                </div>
            </nav>
            <UserLoginComponent toggle={toggle} visible={visible}/>
            <WriterRequestModal wriVisible={wriVisible} toggleWriVisible={toggleWriVisible}/>
        </header>
    );
}

export default UserHeader;
