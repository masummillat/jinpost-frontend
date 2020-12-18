import React from 'react';
import UserHeader from "../header/userHeader";
import UserFooter from "../header/UserFooter";

const DefaultLayout = ({ children }: {children: React.Component}) => (
    <>
        <UserHeader/>
        <div>{children}</div>
        <UserFooter/>
    </>
);

export default DefaultLayout;
