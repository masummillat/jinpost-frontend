import React from 'react';
import Link from "next/link";

const UserFooter = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <footer>
                        <img src="/static/img/logo.png"/>
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>
                            <li><Link href="/about"><a>About Us</a></Link></li>
                            <li><Link href="/privacy"><a>Privacy Policy</a></Link></li>
                            <li><Link href="/terms"><a>Terms of Services</a></Link></li>
                        </ul>
                        <hr/>
                        <p>Copyright © 2020 JinPost. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default UserFooter;
