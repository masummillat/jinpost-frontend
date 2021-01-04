import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import httpClient from "../../utils/api";
import {ToasterError, ToasterSuccess} from "../../utils/statusMessage";

const changePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    newPassword: Yup.string()
        .min(6, 'Password can not be less than 6 characters')
        .max(50, 'Password can not be more than 50 characters')
        .required('Password is required'),
    confirmPassword: Yup.string().required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});
const PasswordChangeForm: React.FC<{id: number}> = ({id}) => {

    const changePasswordFormik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            httpClient.post(`/auth/change-password/${id}`, values)
                .then((res)=>{
                    ToasterSuccess(res.data.message);
                    changePasswordFormik.resetForm();
                })
                .catch(err=>{
                    ToasterError(err.response.data.message)
                });
        },
        validationSchema: changePasswordSchema,
    });
    return (
        <form onSubmit={changePasswordFormik.handleSubmit}>
            <div className="form-group">
                <label>Old Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Type current password"
                    onChange={changePasswordFormik.handleChange}
                    value={changePasswordFormik.values.password}
                />
                <p className="small text-danger">{changePasswordFormik.errors.password}</p>
            </div>
            <div className="form-group">
                <label>New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Type new password"
                    onChange={changePasswordFormik.handleChange}
                    value={changePasswordFormik.values.newPassword}
                />
                <p className="small text-danger">{changePasswordFormik.errors.newPassword}</p>
            </div>
            <div className="form-group">
                <label>Confirmed Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Retype new password"
                    onChange={changePasswordFormik.handleChange}
                    value={changePasswordFormik.values.confirmPassword}
                />
                <p className="small text-danger">{changePasswordFormik.errors.confirmPassword}</p>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
        </form>
    );
}

export default PasswordChangeForm;
