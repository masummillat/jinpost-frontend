import React, {useContext, useEffect, useState} from 'react';
import UserHeader from "../header/userHeader";
import UserFooter from "../header/UserFooter";
import {useRouter} from "next/router";
import isAuthenticated from "../../utils/isAuthenticated";
import UnAuthorized from "../unauthorized/UnAuthorized";

export  const authorizedRoutes = ['/new-post','/account-settings']
const DefaultLayout = ({ children }: {children: React.Component}) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(true);
    const router = useRouter();
    console.log(router)
   useEffect(()=>{
       if (authorizedRoutes.includes(router.pathname) && !isAuthenticated()) {
           setIsAllowed(false)
       }
   },[])
    console.log(isAllowed)
    console.log(isAuthenticated())
    const ComponentToRender = isAllowed ? children : <UnAuthorized/>;
    return(
        <>
            <UserHeader/>
            <div>{ComponentToRender}</div>
            <UserFooter/>
        </>
    )
};

export default DefaultLayout;
