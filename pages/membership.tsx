import React, {useContext, useState} from "react";
import DefaultLayout from "../components/layouts/default";
import Head from "../components/head";
import {useFormik} from "formik";
import httpClient from "../utils/api";
import {ToasterError, ToasterSuccess} from "../utils/statusMessage";

import {PayPalButton} from "react-paypal-button-v2";
import {ProfileContext} from "../context/ProfileContext";

const Membership: React.FC<any> = ({plans}) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const proCtx = useContext(ProfileContext);

    const formik = useFormik({
        initialValues: {
            plan: null,
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    if (!proCtx.isLoggedIn) {
        return (
            <div className="d-flex justify-content-center align-items-center my-5">
                <h1>To get subscription please login</h1>
            </div>
        )
    }
    return (
        <div>
            <Head
                title="Jinpost | join with us"/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 style={{fontSize: '32px', textAlign: 'center', marginTop: '2rem'}}>Get unlimited access to
                            everything
                            on Jinpost</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <h3>Plans</h3>
                            </div>

                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">Plan</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    plans.map((plan: any, i: number) => (
                                        <tr key={i}>
                                            <td>
                                                <label onClick={() => {
                                                    setSelectedPlan(plan)
                                                }} className="d-flex  align-items-center">

                                                    <input
                                                        className="mx-2"
                                                        onChange={formik.handleChange}
                                                        type="radio"
                                                        name="plan"
                                                        value={plan.id.toString()}/>
                                                    <h5>{plan.name}</h5>
                                                </label>
                                            </td>
                                            <td><span>USD {plan.cost}</span></td>
                                            <td><span>{`${plan.month} months`}</span></td>
                                            <td><span>{plan.description || 'description'}</span></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            {/*<div className="col-md-12">Selected plan: {selectedPlan && plans.find((plan:any )=>plan.id.toString() === formik.values.plan).name}</div>*/}
                            {
                                selectedPlan && (

                                    <div className="col-md-6 justify-content-center mx-auto">
                                        <div className="checkout">
                                            <h2>
                                <span
                                    style={{fontSize: '24px'}}
                                >Total bill
                            </span><span className="float-right"
                                         style={{fontSize: '32px'}}>{
                                                // @ts-ignore
                                                selectedPlan && selectedPlan.cost || 0} <small>USD</small></span>
                                            </h2>
                                            <p>Pay with</p>

                                            <PayPalButton
                                                key="live"
                                                createOrder={(data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { currency_code: string; value: string; }; }[]; }) => any; }; }) => {

                                                    return actions.order.create({
                                                        purchase_units: [{
                                                            amount: {
                                                                currency_code: "USD",
                                                                // @ts-ignore
                                                                value: selectedPlan.cost
                                                            }
                                                        }],
                                                        // application_context: {
                                                        //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                                        // }
                                                    });
                                                }}
                                                onApprove={(data: { orderID: any; }, actions: { order: { capture: () => Promise<any>; }; }) => {
                                                    // Capture the funds from the transaction
                                                    return actions.order.capture().then(async function (details) {
                                                        // Show a success message to your buyer
                                                        console.log(details)
                                                        await httpClient.post('/subscriptions', {
                                                            plan: selectedPlan,
                                                            transactionInfo: details
                                                        })
                                                            .then(res => {
                                                                ToasterSuccess('Successfully Subscribed');
                                                                proCtx.handleLogout();
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                            });
                                                        // OPTIONAL: Call your server to save the transaction
                                                        return fetch("/paypal-transaction-complete", {
                                                            method: "post",
                                                            body: JSON.stringify({
                                                                orderID: data.orderID
                                                            })
                                                        });
                                                    });
                                                }}
                                                options={{
                                                    clientId: "AWiMNCQI2sQr_fou4umMe6EUiE5GEIrtD4vw-fbWfS1D0eIpuc-Pr-XovaNqfwpzDAtBVojNLA0UPy3Q"
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

// @ts-ignore
Membership.Layout = DefaultLayout;

export async function getServerSideProps() {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/plans`)
    const plans = await res.json()
    return {
        props: {
            plans,
        },
    }
}

export default Membership;
