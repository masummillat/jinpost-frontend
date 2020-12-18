import React from 'react';
import {MdFace, MdLock} from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import BlankLayout from "../../components/layouts/blank";
import Head from "../../components/head";
import {router} from "next/client";


const Login = () => {
    const router = useRouter()
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
           router.push('/admin/users');
        },
        validationSchema:loginSchema,
    });
    return (
        <div style={{backgroundColor: '#202329', height: '100vh'}}>
            <Head/>
            <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className="login">
                    <img src="/static/img/logo.jpg" style={{maxWidth: '150px', padding: '1rem 0'}}/>
                    <form onSubmit={formik.handleSubmit}>
                        <span><MdFace style={{fontSize: 25}}/></span>
                        <input id="firstName"
                               name="email"
                               type="email"
                               onChange={formik.handleChange}
                               value={formik.values.email}
                               placeholder="Email"/>
                        {formik.touched.email && formik.errors.email}
                        <span className="lock-icon"><MdLock style={{fontSize: 25}}/></span>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password}
                        <button type="submit">Login</button>
                        <a href="forgot-password.php">Forgot your password?</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

Login.Layout = BlankLayout;
export default Login;
