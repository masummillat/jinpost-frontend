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
    handleLogin: (values: ILoginInput)=>void;
    handleLogout: ()=>void;
    setUserData: (values: any) => void;
}
export const ProfileContext = React.createContext<IProfile>(
    {
        isLoggedIn: isAuthenticated(),
        handleLogin: (values)=>{},
        handleLogout: ()=>{},
        setUserData: values => {},
    });

export const ProfileProvider = ({children}: any) =>{
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
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
                            setUser(r)
                        })
                        .catch(e=>console.log(e))
                }
            } catch (e) {
                return false;
            }
        }

    }
    const handleLogin = (values: any) =>{

        try{
            httpClient.post('/auth/login', values)
                .then(res=>{
                    console.log(res)
                    if (typeof window !== "undefined") {
                        localStorage.setItem('access_token', res.data.access_token);
                        setIsLoggedIn(true)
                        getCurrentUser();
                        router.push('/',undefined, {shallow: false})
                        ToasterSuccess('Successfully logged in');


                    }
                })
                .catch(err=>{
                    console.log(err);
                    const { message, statusCode} = err.response.data;
                    ToasterError(message);
                });

        }catch (e) {
          console.log(e);
        }
    }
    const handleLogout = async () => {
        if (typeof window !== 'undefined'){
            await localStorage.removeItem('access_token');
            await setIsLoggedIn(isAuthenticated());
            router.push('/', undefined, {shallow: false})
        };
    }

    const setUserData = (values: any) => {
        setUser(values);
    }
    return(
        <ProfileContext.Provider value={{isLoggedIn, user, setUserData, handleLogin, handleLogout}}>
            {children}
        </ProfileContext.Provider>
    );
};

