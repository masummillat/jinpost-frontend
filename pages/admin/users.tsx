import React from 'react';
import AdminLayout from "../../components/layouts/admin";
import Head from "../../components/head";

const UsersComponent = () => {

    return (
        <div>
            <Head/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>User List</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="user-list">
                                        <table id="user-list" className="table table-bordered" style={{width: '100%'}}>
                                            <thead>
                                            <tr>
                                                <th>Person</th>
                                                <th>Interest</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Natural Language Processing & Speech</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i></a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

UsersComponent.Layout = AdminLayout;
export default UsersComponent;
