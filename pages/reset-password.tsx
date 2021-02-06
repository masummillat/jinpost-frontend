import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from "next/link";
import UserLoginComponent from "../components/login/userLoginComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import httpClient from "../utils/api";
import { ToasterError, ToasterSuccess } from "../utils/statusMessage";
import isAuthenticated from "../utils/isAuthenticated";
import Head from '../components/head';

const ResetPassword = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const toggle: () => void = () => setVisible(!visible);
    console.log(router)

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/')
        }
    }, [])
    const resetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required').min(3).max(50),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        conf_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')

    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            conf_password: ''
        },
        onSubmit: async values => {

            await fetch(`${process.env.BACKEND_BASE_URL}/auth/reset-password`, {
                method: 'POST', 
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${router.query.access_token}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({...values, id: router.query.id}) // body data type must match "Content-Type" header
            }).then(response => response.json())
                .then(res => {
                    if(res.statusCode){
                        ToasterError(res.message);
        
                    }else {
                        formik.resetForm();
                        ToasterSuccess('Successfully reset password');
                        router.push('/');
                    }
                    formik.resetForm();
               
                }).catch(err => {
                    ToasterError(err.response.data.message)
                })


        },
        validationSchema: resetPasswordSchema
    });
    return (
        <div>
            <Head
                title="Jinpost | Reset Password" />
            <div className="registration-page">
                <header className="registration-header container">
                    <Link href="/">
                        <a className="navbar-brand mt-4">
                            <img src="/static/img/logo.png" />
                        </a>
                    </Link>
                    <p className="mt-4"><button onClick={toggle}
                        className="btn btn-white ml-3">sign in</button></p>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-1 col-lg-4">
                            <div className="registration-left"></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="registration-right">
                                <h4>Reset your password</h4>
                                <form onSubmit={formik.handleSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your email"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    <p className="text-danger m-0">{formik.errors.email}</p>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    <p className="text-danger m-0">{formik.errors.password}</p>

                                    <input
                                        type="password"
                                        name="conf_password"
                                        placeholder="Confirm password"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.conf_password}
                                    />
                                    <p className="text-danger m-0">{formik.errors.conf_password}</p>
                                    <button type="submit" className="btn btn-primary">Reset</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <UserLoginComponent toggle={toggle} visible={visible} />
            </div>
        </div>
    )
}

export default ResetPassword;
