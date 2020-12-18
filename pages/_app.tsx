// import App from 'next/app'
import * as React from "react";
import MainLayout from "../components/layouts/main";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/static/css/style.css';
import '../public/static/css/user-panel.css';
import BlankLayout from "../components/layouts/blank";
function MyApp({ Component, pageProps }:{Component: any, pageProps: any}) {
    const {Layout: Layout1} = Component;
    const Layout = Layout1 || BlankLayout;
    return  <MainLayout>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </MainLayout>
}

export default MyApp
