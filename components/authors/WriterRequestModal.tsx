import React, {useState} from 'react';
import { Modal } from 'reactstrap';
import * as Yup from "yup";
import {useFormik} from "formik";
import {GiBookmarklet} from 'react-icons/gi';
import httpClient from "../../utils/api";
import { useRouter } from 'next/router'
import {GrSend} from "react-icons/gr";
const WriterRequestModal = ({wriVisible, toggleWriVisible}: {wriVisible: boolean; toggleWriVisible: ()=>void}) => {
    const router = useRouter()
    const messageValidationSchema = Yup.object().shape({
        message: Yup.string(),
    });
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: values => {
            // httpClient.post('/auth/login', values)
            //     .then(res=>{
            //         console.log(res.data)
            //         if (typeof window !== "undefined") {
            //             localStorage.setItem('access_token', res.data.access_token);
            //             toggleWriVisible();
            //             // router.push('/');
            //         }
            //     })
            //     .catch(err=>{
            //         console.log({err});
            //     })
            console.log(JSON.stringify(values, null, 2));
        },
        validationSchema: messageValidationSchema
    });
    return(
        <Modal centered isOpen={wriVisible} toggle={toggleWriVisible} >
            <div className="modal-header">
                <h5 className="modal-title" id="loginModalTitle"></h5>
                <button onClick={toggleWriVisible} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="bewriter-confirmation">
                    <h4>Thank you for your interest in becoming a writer</h4>
                    <p>Write anything you have and send it to us. You can start writing as soon as our review team
                        verifies and allows you.</p>
                    <form onSubmit={formik.handleSubmit}>
                        <textarea
                            name="message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            className="form-control"
                            rows={5}
                            placeholder="Write something" />
                        <button type="submit" className="btn btn-primary">
                            <GrSend style={{color: 'white', rotate: 'revert'}}/> &nbsp; &nbsp; &nbsp; Send
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default WriterRequestModal;
