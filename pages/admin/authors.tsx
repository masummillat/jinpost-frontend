import React from "react";
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";

const Authors = () => {

    return (
        <div>
            <Head/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Author List</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="author-list">
                                        <table id="author-list" className="table table-bordered"
                                               style={{width: '100%'}}>
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
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i> Remove as
                                                        author</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i> Remove as
                                                        author</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i> Remove as
                                                        author</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                    Hossain Samrat, Data Scientist
                                                </td>
                                                <td>Data Science, Computer Science, Electronics</td>
                                                <td>
                                                    <a href="#"><i className="far fa-trash-alt"></i> Remove as
                                                        author</a>
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
    );
}

Authors.Layout = AdminLayout;

export default Authors;
