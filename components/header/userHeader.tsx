import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import UserLoginComponent from "../login/userLoginComponent";
import {GiBookmarklet} from 'react-icons/gi';
import {IoMdNotificationsOutline} from "react-icons/io";
import WriterRequestModal from "../authors/WriterRequestModal";
import {ProfileContext} from "../../context/ProfileContext";
import httpClient from "../../utils/api";
import {CategoryEntry} from "../../types";
import {Dropdown, Nav} from "react-bootstrap";
import {FcMenu} from "react-icons/fc";
import {AiOutlineSearch} from "react-icons/ai";
import {useFormik} from "formik";


const UserHeader = () => {
    const profileCtx = useContext(ProfileContext);
    const [categories, setCategories] = useState<CategoryEntry[]>([])
    // @ts-ignore
    const {user, isLoggedIn, handleLogin, handleLogout} = profileCtx;
    const [visible, setVisible] = useState(false);
    const [wriVisible, setWriVisible] = useState(false);
    const [show, setShow] = useState(false);
    const toggle = () => setVisible(!visible);
    const toggleWriVisible = () => setWriVisible(!wriVisible);
    const toggleShow = () => setShow(prevState => !prevState);

    const router = useRouter();

    useEffect(() => {
        httpClient.get('/categories?limit=150').then(res => {
            setCategories(res.data.items);
        }).catch(err => {
        });
    }, [setCategories]);

    const handleWrite = () => {
        if( user && (user.role === 'author' || user.role === 'admin')){
            router.push('/new-post');
        }else {
            toggleWriVisible();
        }
    }

    const searchForm = useFormik({
        initialValues: {
            q: '',
        },
        onSubmit: values => {
            router.push(`/search?q=${values.q}&page=1&limit=10`);
        },
    });
    return (
        <header>
            <nav className="container navbar navbar-expand-lg">
                <Link href="/">
                    <a className="navbar-brand">
                        <img src="/static/img/logo.png"/>
                    </a>
                </Link>
                <button onClick={toggleShow} className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <FcMenu size={30}/>
                </button>

                <div className={`collapse navbar-collapse ${show ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto chinasdg-nav">
                        <li className="nav-item active">
                            <Link href="/">
                                <a className="nav-link selected">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item d-flex justify-content-center align-items-center topic-nav-item">
                            <Dropdown>
                               <Dropdown.Toggle style={{cursor: 'pointer'}} as={Nav}  className="nav-link"  id="dropdown-split-basic" >
                                    Topics
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        categories.map((category: CategoryEntry) => (
                                            <Link key={category.id} href={`/categories/${category.id}`}>
                                                <a className="dropdown-item pr-lg-5">{category.name} </a>
                                            </Link>
                                        ))
                                    }
                                </Dropdown.Menu>
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
                   <div className="d-flex">
                         <form onSubmit={searchForm.handleSubmit} className="searchBox mr-4">
                             <input onChange={searchForm.handleChange}
                                    value={searchForm.values.q}
                                    className="searchInput"
                                    type="text" name="q"
                                    placeholder="Search" />
                             <button className="searchButton" type="submit" > <AiOutlineSearch/> </button>
                         </form>

                       {
                           isLoggedIn ? (
                               <div className="my-2 my-lg-0 d-flex" >
                                   <a href="#" className="notification-icon">
                                       <IoMdNotificationsOutline style={{fontSize: 24}}/>
                                   </a>

                                   <a onClick={handleWrite} style={{cursor: 'pointer'}}  className="be-writter d-flex justify-content-center align-items-center">
                                       <GiBookmarklet
                                           style={{fontSize: 24}}
                                           className=" pr-2 "/>
                                       {user && (
                                           user.role === 'author' || user.role === 'admin')
                                           ? 'Write' : 'Become a writter'}
                                   </a>

                                   <Dropdown>
                                       <Dropdown.Toggle style={{cursor: 'pointer'}} as={Nav} className="nav-link"  id="dropdown-split-basic" >
                                           {user && user.profileImage ?
                                               <img style={{width: 50, borderRadius: 7}} src={user.profileImage}/> :
                                               <img style={{width: 50, borderRadius: 7}} src="/static/img/profile.jpg"/>}
                                       </Dropdown.Toggle>

                                       <Dropdown.Menu>
                                           <Dropdown.Item>
                                               <Link href="/membership"><a>Upgrade</a></Link>
                                           </Dropdown.Item>
                                           <Dropdown.Item>
                                               <Link href="/new-post"><a>Write</a></Link>
                                           </Dropdown.Item>
                                           <Dropdown.Item>
                                               {user && (<Link href={`/${user.domain}`}><a>Profile</a></Link>)}
                                           </Dropdown.Item>
                                           <Dropdown.Item>
                                               <Link href="/account-settings"><a>Account Settings</a></Link>
                                           </Dropdown.Item>
                                           <Dropdown.Item>
                                               <a onClick={handleLogout} className="">Log Out</a>
                                           </Dropdown.Item>
                                       </Dropdown.Menu>
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

                </div>
            </nav>
            <UserLoginComponent toggle={toggle} visible={visible}/>
            <WriterRequestModal wriVisible={wriVisible} toggleWriVisible={toggleWriVisible}/>
        </header>
    );
}

export default UserHeader;
