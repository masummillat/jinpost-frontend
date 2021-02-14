import React from "react";

const PageLoader = () => {

    return(
        <div className="container-fluid">
            <div className="row">
                <div style={{height: '58vh'}} className="col-md-12 d-flex justify-content-center align-items-center">
                    <img src="/static/img/jinpost-loader.svg" alt="loading..."/>
                </div>
            </div>

        </div>
    );
}

export default PageLoader;
