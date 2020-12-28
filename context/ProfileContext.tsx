import React, {useEffect} from "react";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import isAuthenticated from "../utils/isAuthenticated";
import MainLayout from "../components/layouts/main";
import {useState} from "react";
import httpClient from "../utils/api";

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

    console.log(user)
    useEffect(()=>{
        setIsLoggedIn(isAuthenticated())
        if(isAuthenticated()){
            getCurrentUser()
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
                        toast.success('Successfully logged in', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch(err=>{
                    console.log(err.response.data);
                    const { message, statusCode} = err.response.data;
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
            return Promise.resolve();
        }catch (e) {
           return Promise.reject();
        }
        console.log(JSON.stringify(values, null, 2));
        return Promise.reject()
    }
    const handleLogout = async (): Promise<any> => {
        if (typeof window !== 'undefined'){
            setIsLoggedIn(false)
            await localStorage.removeItem('access_token');
        }
        return Promise.resolve();
    }
    return(
        <ProfileContext.Provider value={{isLoggedIn, user, handleLogin, handleLogout}}>
            {children}
        </ProfileContext.Provider>
    );
};

