// import App from 'next/app'
import * as React from "react";
import DefaultLayout from "../components/layouts/default";
import MainLayout from "../components/layouts/main";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/static/css/style.css'
function MyApp({ Component, pageProps }:{Component: any, pageProps: any}) {
    const {Layout: Layout1} = Component;
    const Layout = Layout1 || DefaultLayout;
    return  <MainLayout>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </MainLayout>
}

export default MyApp
