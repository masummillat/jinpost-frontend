import React, { useState } from "react";
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";
import httpClient from "../../utils/api";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToasterSuccess, ToasterError } from '../../utils/statusMessage';
import { BiTrash } from "react-icons/bi";

const Authors = ({authorsData}:{authorsData: any}) => {
    const [authors, setAuthors] = useState<any[]>(authorsData.items);

    const handleUserDelete = (id: number): void => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure deleting this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        httpClient.delete(`/users/${id}`)
                            .then(res => {
                                setAuthors(authors.filter(author => author.id !== id));
                                ToasterSuccess('Successfully deleted');
                            })
                            .catch(err => {
                                console.log(err);
                                ToasterError("Couldn't delete");
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
        console.log('called', id)

    }
    return (
        <div>
            <Head title="Jinpost Admin | authors"/>
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
                                            {authors.map((user: { id: number, occupation: string, name: string })=>(
                                                <tr key={user.id}>
                                                    <td>
                                                        <img src="/static/img/profile.jpg" className="author-list-img"/>
                                                        <span className="ml-2">{user.name}</span>
                                                    </td>
                                            <td>{user.occupation}</td>
                                                    <td>
                                                    <BiTrash onClick={() => handleUserDelete(user.id)} size={25} />
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

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users?role=author`)
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            authorsData: data
        }, // will be passed to the page component as props
    }
}
export default Authors;
