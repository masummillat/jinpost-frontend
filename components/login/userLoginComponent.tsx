import React, {useState} from 'react';
import { Modal } from 'reactstrap';
import * as Yup from "yup";
import {useFormik} from "formik";
import httpClient from "../../utils/api";
import { useRouter } from 'next/router'
const UserLoginComponent = ({visible, toggle}: {visible: boolean; toggle: ()=>void}) => {
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
            password: ''
        },
        onSubmit: values => {

            httpClient.post('/auth/login', values)
                .then(res=>{
                    console.log(res.data)
                    if (typeof window !== "undefined") {
                        localStorage.setItem('access_token', res.data.access_token);
                        toggle();
                        // router.push('/');
                    }
                })
                .catch(err=>{
                    console.log({err});
                })
            console.log(JSON.stringify(values, null, 2));
        },
        validationSchema: loginSchema
    });
    return(
        <Modal centered isOpen={visible} toggle={toggle} >
            <div className="modal-header">
                <h5 className="modal-title" id="loginModalTitle"></h5>
                <button onClick={toggle} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <div className="modal-body">
                    <div className="login-form">
                        <h4>Welcome back</h4>
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
                            <button type="submit" className="btn btn-primary">sign in</button>
                            <a href="#" className="green-text mt-2">Forgot password?</a>
                        </form>
                    </div>
                </div>
        </Modal>
    );
}

export default UserLoginComponent;
