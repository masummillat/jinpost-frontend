import * as React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from "../components/layouts/main";
import '../public/static/css/style.css';
import '../public/static/css/user-panel.css';
import BlankLayout from "../components/layouts/blank";
import {ProfileProvider} from "../context/ProfileContext";



function MyApp({Component, pageProps}: { Component: any, pageProps: any }) {
    const {Layout: Layout1} = Component;
    const Layout = Layout1 || BlankLayout;

    return (
        <MainLayout>
           <ProfileProvider >
               <Layout>
                   <Component {...pageProps} />
               </Layout>
               <ToastContainer />
           </ProfileProvider>

        </MainLayout>
    );
}

export default MyApp
