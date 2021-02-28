import React from 'react';
import AdminLayout from "../../components/layouts/admin";
import Head from "../../components/head";
import {useFormik} from "formik";
import * as yup from 'yup';
import httpClient from "../../utils/api";
import {ToasterError, ToasterSuccess} from "../../utils/statusMessage";

let planSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().min(3).max(350),
    cost: yup.number().required().integer(),
    month: yup.number().required().positive().integer(),

});

const PaymentPage: React.FC<any> = ({plans}) => {
    console.log(plans)
    const planFormik = useFormik({
        initialValues: {
            name: '',
            cost: 0,
            month: 1,
            description: ''
        },
        validationSchema:planSchema,
        onSubmit: values => {
            console.log(values)
            httpClient.post('/plans', values)
                .then(r=>{
                    console.log(r);
                    ToasterSuccess('Successfully created');
                })
                .catch(err=>{
                    console.log(err);
                    ToasterError("Couldn't create")
                })
        },
    });

    return(
        <div>
            <Head title="Jinpost: Payment"/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Payment</h1>
                            </div>

                            <div className="row">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-12">
                                            <h3>Plans</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <table className="table border">
                                                <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Cost</th>
                                                    <th scope="col">Months</th>
                                                    <th scope="col">Description</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    plans.map((plan: any,ind: number)=>(
                                                        <tr key={ind}>
                                                            <th scope="row">{ind+1}</th>
                                                            <td>{plan.id}</td>
                                                            <td>{plan.name}</td>
                                                            <td>{plan.cost}</td>
                                                            <td>{plan.month}</td>
                                                            <td>{plan.description}</td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                   <div className="row">
                                       <div className="col-md-12">
                                           <h3>Create Plan</h3>
                                       </div>
                                       <div className="col-md-12">
                                           <form onSubmit={planFormik.handleSubmit}>
                                               <div className="form-group">
                                                   <label htmlFor="planName">Name</label>
                                                   <input
                                                       type="text"
                                                       className="form-control"
                                                       id="planName"
                                                       name="name"
                                                       placeholder="Plan name"
                                                       onChange={planFormik.handleChange}
                                                       value={planFormik.values.name}
                                                   />
                                                       <small id="emailHelp" className="form-text text-muted">We'll
                                                           never share your email with anyone else.</small>
                                               </div>
                                               <div className="form-group">
                                                   <label htmlFor="cost">Cost</label>
                                                   <input
                                                       type="number"
                                                       className="form-control"
                                                       id="cost"
                                                       name="cost"
                                                       placeholder="$5"
                                                       onChange={planFormik.handleChange}
                                                       value={planFormik.values.cost}
                                                   />
                                               </div>
                                               <div className="form-group">
                                                   <label htmlFor="month">Months</label>
                                                   <input
                                                       type="number"
                                                       className="form-control"
                                                       id="month"
                                                       name="month"
                                                       placeholder="12"
                                                       onChange={planFormik.handleChange}
                                                       value={planFormik.values.month}
                                                   />
                                               </div>
                                               <div className="form-group">
                                                   <label htmlFor="planName">Description</label>
                                                   <input
                                                       type="text"
                                                       className="form-control"
                                                       id="description"
                                                       name="description"
                                                       placeholder="Plan description"
                                                       onChange={planFormik.handleChange}
                                                       value={planFormik.values.description}
                                                   />
                                                   <small id="emailHelp" className="form-text text-muted">We'll
                                                       never share your email with anyone else.</small>
                                               </div>

                                               <button type="submit" className="btn btn-primary">Submit</button>
                                           </form>
                                       </div>

                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// @ts-ignore
PaymentPage.Layout =  AdminLayout;

export async function getServerSideProps() {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/plans`)
    const plans = await res.json()
    return {
        props: {
            plans,
        },
    }
}
export default PaymentPage;
