import React from 'react';
import './unauthorized.module.scss';
import Link from "next/link";
const UnAuthorized: React.FC = () => {

    return (
        <>
            <div className="unauthorized-wrapper d-flex align-items-center flex-column m-auto justify-content-center">
                <p className="text-black-50" style={{fontSize: 100}}>401</p>
                <p className="text-muted font-weight-bolder">Access Denied !</p>
                <Link href="/">
                    <a className="btn-link"> Go Back To Home</a>
                </Link>
            </div>
        </>
    );
}

export default UnAuthorized;
