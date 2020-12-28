import React from "react";
import DefaultLayout from "../components/layouts/default";

const Membership = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 style={{fontSize: '32px', textAlign: 'center', marginTop: '2rem'}}>Get unlimited access to
                        everything
                        on China SDG</h2>
                </div>
            </div>
            <div className="row">
                <div className="offset-lg-3 col-lg-3">
                    <div className="monthly">
                        <h4>Monthly</h4>
                        <span>$5</span>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="yearly">
                        <h4>Yearly</h4>
                        <span>$50</span>
                    </div>
                </div>
                <div className="offset-lg-3 col-lg-6">
                    <div className="checkout">
                        <h2>
                            <span
                                style={{fontSize: '24px'}}
                            >Total bill
                            </span><span className="float-right"
                                         style={{fontSize: '32px'}}>50 <small>USD</small></span>
                        </h2>
                        <p>Pay with</p>
                        <button type="submit" className="btn">
                            <img src="/static/img/paypal.png"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Membership.Layout = DefaultLayout;
export default Membership;
