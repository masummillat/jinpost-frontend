import React from "react";
import DefaultLayout from "../components/layouts/default";
import Head from "../components/head";
import {Field, Form, Formik, useFormik} from "formik";
import httpClient from "../utils/api";
import {ToasterError, ToasterSuccess} from "../utils/statusMessage";

const Membership: React.FC<any> = ({plans}) => {

    const handleSubscription = (values: any) =>{
        console.log(values)
        httpClient.post('/subscriptions', {
            plan:{
                id: parseInt(values.plan)
            }
        })
            .then(r=>{
                console.log(r);
                ToasterSuccess("Successfully bought subscription");
            })
            .catch(err=>{
                console.log(err);
                ToasterError("Couldn't buy subscription");
            })
    }
    return (
        <div>
            <Head
            title="Jinpost | join with us"/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 style={{ fontSize: '32px', textAlign: 'center', marginTop: '2rem' }}>Get unlimited access to
                            everything
                        on Jinpost</h2>
                    </div>
                </div>
                <div className="row">

                    <Formik
                        initialValues={{
                            plan: '',
                        }}
                        onSubmit={async (values) => {
                            await handleSubscription(values);
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <div id="my-radio-group">Plans</div>
                                <div className="d-flex flex-column" role="group" aria-labelledby="my-radio-group">
                                    {
                                        plans.map((plan: any,i: number)=>(
                                            <label className="d-flex justify-content-around align-items-center">
                                                <Field type="radio" name="plan" value={plan.id.toString()} />
                                                <h5>{plan.name}</h5>
                                                <span>USD {plan.cost}</span>
                                                <span>{`${plan.month} months`}</span>
                                                <span>{plan.description}</span>
                                            </label>
                                        ))
                                    }
                                    <div>Picked: {values.plan}</div>
                                </div>

                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>





                    {/*<div className="offset-lg-3 col-lg-3">*/}
                    {/*    <div className="monthly">*/}
                    {/*        <h4>Monthly</h4>*/}
                    {/*        <span>$5</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="col-lg-3">*/}
                    {/*    <div className="yearly">*/}
                    {/*        <h4>Yearly</h4>*/}
                    {/*        <span>$50</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="offset-lg-3 col-lg-6">
                        <div className="checkout">
                            <h2>
                                <span
                                    style={{ fontSize: '24px' }}
                                >Total bill
                            </span><span className="float-right"
                                    style={{ fontSize: '32px' }}>50 <small>USD</small></span>
                            </h2>
                            <p>Pay with</p>
                            <button disabled type="submit" className="btn">
                                <img src="/static/img/paypal.png" />
                            </button>
                        </div>
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
