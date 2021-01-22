import React from 'react';
import AdminLayout from "../../components/layouts/admin";
import Head from "../../components/head";
import httpClient from "../../utils/api";

interface UsersComponentProps{
    usersData: any;
}
const UsersComponent = ({usersData}: UsersComponentProps) => {
    console.log(usersData)
    const users = usersData.items;
    console.log(users)
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
                                            {users.map((user: { id: number, name: string })=>(
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
    )
}


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
            usersData: data
        }, // will be passed to the page component as props
    }
}

UsersComponent.Layout = AdminLayout;
export default UsersComponent;
