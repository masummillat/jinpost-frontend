import React from "react";
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";

const Team = () => {

    return (
        <div>
            <Head title="Jinpost admin | Team"/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Users</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="card mb-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img src="/static/img/profile.jpg" className="card-img" alt="..."
                                                             style={{padding: '0.8rem'}}/>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <h5>John Doe</h5>
                                                            <span className="mr-2">Manager</span>
                                                            <a href="#"
                                                               data-toggle="modal"
                                                               data-target="#rolechange-modal"><i
                                                                className="fas fa-user-edit"></i></a><br/>
                                                            <p>john.doe@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card mb-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img src="/static/img/profile.jpg" className="card-img"
                                                             alt="..."
                                                             style={{padding: '0.8rem'}}/>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <h5>John Doe</h5>
                                                            <span className="mr-2">Manager</span><a href="#"
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#rolechange-modal"><i
                                                            className="fas fa-user-edit"></i></a><br/>
                                                            <p>john.doe@gmail.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="user-create-area">
                                        <h6 className="mb-3">Create New Team Member</h6>
                                        <form>
                                            <input type="text" placeholder="Full name"/>
                                            <input type="email" placeholder="Email"/>
                                            <select>
                                                <option>Manager</option>
                                                <option>Editor</option>
                                                <option>Viewer</option>
                                            </select>
                                            <button type="submit" className="btn btn-main mt-2">save</button>
                                        </form>
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

Team.Layout = AdminLayout;
export default Team;
