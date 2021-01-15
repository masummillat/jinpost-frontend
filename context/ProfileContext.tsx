import React, {useEffect} from "react";
import jwt_decode from "jwt-decode";

import isAuthenticated from "../utils/isAuthenticated";
import {useState} from "react";
import httpClient from "../utils/api";
import {ToasterError, ToasterSuccess} from "../utils/statusMessage";
import {useRouter} from "next/router";

interface IUser {
    name: string;
    [propName: string]: any;
}
interface ILoginInput {
    email: string;
    password: string;
}
interface IProfile {
    user?: IUser | null;
    isLoggedIn: boolean;
    handleLogin?: (values: ILoginInput)=>Promise<any> | null;
    handleLogout?: ()=>Promise<any> | null;
}
export const ProfileContext = React.createContext<IProfile | null>({isLoggedIn: isAuthenticated()});

export const ProfileProvider = ({children}: any) =>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    console.log(router)
    console.log(user)
    useEffect(()=>{
        setIsLoggedIn(isAuthenticated())
        if(isAuthenticated()){
            getCurrentUser();
        }
    },[])

    const getCurrentUser = () =>{
        if(typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('access_token');
            if ([undefined, null, ''].includes(accessToken)) {
                return;
            }
            try {

                if (accessToken !== null) {
                    const decodedToken = jwt_decode(accessToken);
                    // @ts-ignore
                    fetch(`${process.env.BACKEND_BASE_URL}/users/${decodedToken.id}`)
                        .then(res=>res.json())
                        .then(r =>{
                            console.log(r)
                            setUser(r)
                        })
                        .catch(e=>console.log(e))
                }
            } catch (e) {
                return false;
            }
        }

    }
    const handleLogin = (values: any): Promise<any> =>{

        try{
            httpClient.post('/auth/login', values)
                .then(res=>{
                    console.log(res)
                    if (typeof window !== "undefined") {
                        localStorage.setItem('access_token', res.data.access_token);
                        setIsLoggedIn(true)
                        getCurrentUser();
                        if(router.pathname === '/registration') router.push('/')
                        ToasterSuccess('Successfully logged in');


                    }
                })
                .catch(err=>{
                    console.log(err.response.data);
                    const { message, statusCode} = err.response.data;
                    ToasterError(message)
                });
            return Promise.resolve();
        }catch (e) {
           return Promise.reject();
        }
        return Promise.reject()
    }
    const handleLogout = async (): Promise<any> => {
        if (typeof window !== 'undefined'){
            setIsLoggedIn(false)
            await localStorage.removeItem('access_token');
            router.push('/')
        }
        return Promise.resolve();
    }
    return(
        <ProfileContext.Provider value={{isLoggedIn, user, handleLogin, handleLogout}}>
            {children}
        </ProfileContext.Provider>
    );
};

