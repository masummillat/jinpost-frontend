import React from 'react';

const UserFooter = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <footer>
                        <img src="/static/img/logo.png"/>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Services</a></li>
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
