import React, {useContext, useEffect, useState} from 'react';
import UserHeader from "../header/userHeader";
import UserFooter from "../header/UserFooter";
import {useRouter} from "next/router";
import UnAuthorized from "../unauthorized/UnAuthorized";
import {ProfileContext} from "../../context/ProfileContext";

export  const authorizedRoutes = ['/new-post','/account-settings', '/blogs/[id]/edit']
const DefaultLayout = ({ children }: {children: React.Component}) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(true);
    const profileCtx = useContext(ProfileContext);
    const router = useRouter();
    console.log(router)
   useEffect(()=>{
       if (authorizedRoutes.includes(router.pathname)) {
           if(!profileCtx.isLoggedIn){
               setIsAllowed(false)
           }else {
               setIsAllowed(true)
           }

       }else {
           setIsAllowed(true);
       }
   },[router.pathname, profileCtx.isLoggedIn])
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
