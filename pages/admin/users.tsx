import React, { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import AdminLayout from "../../components/layouts/admin";
import Head from "../../components/head";
import httpClient from "../../utils/api";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToasterSuccess, ToasterError } from '../../utils/statusMessage';

interface UsersComponentProps {
    usersData: any;
}
const UsersComponent = ({ usersData }: UsersComponentProps) => {

    const [users, setUsers] = useState<any[]>(usersData.items);

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
                                setUsers(users.filter(user => user.id !== id));
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

    }
    return (
        <div>
            <Head title="Jinpost admin | users" />
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
                                        <table id="user-list" className="table table-bordered" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Person</th>
                                                    <th>Interest</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user: { id: number, occupation: string, name: string }) => (
                                                    <tr key={user.id}>
                                                        <td>
                                                            <img src="/static/img/profile.jpg" className="author-list-img" />
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
    )
}


export async function getServerSideProps(context: any) {
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
