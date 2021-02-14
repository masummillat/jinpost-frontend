import React from 'react';
import './unauthorized.module.scss';
import Link from "next/link";
import Head from "../head";
const UnAuthorized: React.FC = () => {

    return (
        <>
            <Head
                title="Jinpost: access denied"
                description="you don't have permission for this page"
            />
            <div className="unauthorized-wrapper d-flex align-items-center flex-column m-auto justify-content-center">
                <p className="text-black-50" style={{fontSize: 100}}>401</p>
                <p className="text-muted font-weight-bolder">Access Denied !</p>
                <Link href="/" shallow={false} as={undefined}>
                    <a className="btn-link"> Go Back To Home</a>
                </Link>
            </div>
        </>
    );
}

export default UnAuthorized;
