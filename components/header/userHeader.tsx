import React, {useState} from "react";
import Link from "next/link";
import UserLoginComponent from "../login/userLoginComponent";
import {Dropdown,DropdownMenu, DropdownItem, DropdownToggle} from "reactstrap";

const UserHeader = () => {
    const [visible, setVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle: ()=>void = () => setVisible(!visible);


    const toggleDropdown         = () => setDropdownOpen(prevState => !prevState);
    return(
        <header>
            <nav className="container navbar navbar-expand-lg">
                <Link href="/">
                    <a className="navbar-brand">
                        <img src="/static/img/logo.png" />
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
                            <Dropdown  isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle nav caret>
                                    Topics
                                </DropdownToggle>
                                <DropdownMenu>
                                    <a className="dropdown-item" href="category-page.php">5G</a>
                                    <a className="dropdown-item" href="category-page.php">AI</a>
                                    <a className="dropdown-item" href="category-page.php">Automobile</a>
                                    <a className="dropdown-item" href="category-page.php">Autonomous Driving</a>
                                    <a className="dropdown-item" href="category-page.php">Big Data</a>
                                    <a className="dropdown-item" href="category-page.php">Biotech</a>
                                    <a className="dropdown-item" href="category-page.php">Blockchain</a>
                                    <a className="dropdown-item" href="category-page.php">Cloud Computing</a>
                                    <a className="dropdown-item" href="category-page.php">Ecommerce</a>
                                    <a className="dropdown-item" href="category-page.php">Finance</a>
                                    <a className="dropdown-item" href="category-page.php">FinTech</a>
                                    <a className="dropdown-item" href="category-page.php">Internet of Things</a>
                                    <a className="dropdown-item" href="category-page.php">Logistics</a>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="nav-item">
                            <Link  href="/discover">
                                <a className="nav-link">Discover</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/authors">
                                <a className="nav-link">Authors</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="my-2 my-lg-0">
                        <Link href="/registration">
                            <a className="green-text register-item" >Register</a>
                        </Link>
                        <button onClick={toggle} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </nav>
            <UserLoginComponent toggle={toggle} visible={visible}/>
        </header>
    );
}

export default UserHeader;
