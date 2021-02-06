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

const ForgotPassword = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const toggle: () => void = () => setVisible(!visible);

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/')
        }
    }, [])
    const resetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required').min(3).max(50)

    });
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async values => {
            httpClient.post('/auth/forgot-password', values)
            .then(res=>{
                ToasterSuccess(res.data)
                formik.resetForm();
            })
            .catch(err=>{
                ToasterError(err.response.data.message);
                formik.resetForm();
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
                                <h4>Request for reset password</h4>
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
                                
                                    <button type="submit" className="btn btn-primary">Submit</button>
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

export default ForgotPassword;
