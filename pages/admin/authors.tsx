import React from "react";
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";

const Authors = ({authors}:{authors: any[]}) => {
    console.log(authors)
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
                                            {authors.map((user: { id: number, name: string })=>(
                                                <tr key={user.id}>
                                                    <td>
                                                        <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                        <span className="ml-2">{user.name}</span>
                                                    </td>
                                                    <td>Data Science, Natural Language Processing & Speech</td>
                                                    <td>
                                                        <a href="#"><i className="far fa-trash-alt"></i></a>
                                                    </td>
                                                </tr>
                                            ))}
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

export async function getStaticProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users`)
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            authors: data
        }, // will be passed to the page component as props
    }
}
export default Authors;
