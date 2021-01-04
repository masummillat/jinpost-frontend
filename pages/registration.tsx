import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import Link from "next/link";
import UserLoginComponent from "../components/login/userLoginComponent";
import {useFormik} from "formik";
import * as Yup from "yup";
import httpClient from "../utils/api";
import {ToasterError, ToasterSuccess} from "../utils/statusMessage";
import isAuthenticated from "../utils/isAuthenticated";

const Registration: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const toggle: () => void = () => setVisible(!visible);


    useEffect(()=>{
        if(isAuthenticated()){
            router.push('/')
        }
    },[])
    const registrationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

    });
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            httpClient.post('http://localhost:3000/auth/signup', values)
                .then(res=>{
                    formik.resetForm();
                    ToasterSuccess('Successfully signed up')
                    router.push('/')

                })
                .catch(err=>{
                    ToasterError(err.response.data.message)
                })
        },
        validationSchema: registrationSchema
    });
    return (
        <div className="registration-page">
            <header className="registration-header container">
                <Link href="/">
                    <a className="navbar-brand mt-4">
                        <img src="/static/img/logo.png"/>
                    </a>
                </Link>
                <p className="mt-4">Already have an account? <button onClick={toggle}
                                                                     className="btn btn-white ml-3">sign in</button></p>
            </header>
            <div className="container">
                <div className="row">
                    <div className="offset-lg-1 col-lg-4">
                        <div className="registration-left"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="registration-right">
                            <h4>Create your free account</h4>
                            <form onSubmit={formik.handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                <p className="text-danger m-0">{formik.errors.name}</p>
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
                                <button type="submit" className="btn btn-primary">sign up</button>
                                <small>Click “Sign Up” to agree to China SDG’s <a href="#">Terms of
                                    Service</a> and acknowledge that China SDG’s <a href="#">Privacy
                                    Policy</a> applies to you.</small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <UserLoginComponent toggle={toggle} visible={visible}/>
        </div>
    )
}

export default Registration;
