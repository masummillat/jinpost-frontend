import React from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import httpClient from "../../utils/api";

export interface IBasicInfo {
    name: string;
    email?: string;
    bio: string;
    occupation: string;
}
interface IBasicForm {
    basicInfo: IBasicInfo;
    handleSubmit: (userInfo: IBasicInfo) =>void;
}
const basicInfoSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
const BasicForm: React.FC<IBasicForm> = ({basicInfo, handleSubmit}) => {

    const basicForm = useFormik({
        initialValues: basicInfo,
        validationSchema: basicInfoSchema,
        onSubmit: values => handleSubmit(values),

    });
    return(
        <form onSubmit={basicForm.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={basicForm.handleChange}
                    value={basicForm.values.name}
                />
                <p className="small text-danger">{basicForm.errors && basicForm.errors.name}</p>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    disabled
                    name="email"
                    type="email"
                    className="form-control disabled"
                    onChange={basicForm.handleChange}
                    value={basicForm.values.email}
                />
            </div>
            <div className="form-group">
                <label>Occupation</label>
                <input
                    name="occupation"
                    type="text"
                    className="form-control"
                    onChange={basicForm.handleChange}
                    value={basicForm.values.occupation}
                />
            </div>
            <div className="form-group">
                <label>Biography</label>
                <textarea
                    name="bio"
                    className="form-control"
                    rows={7}
                    onChange={basicForm.handleChange}
                    value={basicForm.values.bio}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
        </form>
    );
}

export default BasicForm;
