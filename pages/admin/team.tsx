import React, {useEffect, useState} from "react";
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";
import {useFormik} from "formik";
import Select from "react-select";
import httpClient from "../../utils/api";
import {ToasterError, ToasterSuccess} from "../../utils/statusMessage";
import {Modal} from "react-bootstrap";
import {BiEdit} from "react-icons/bi";


const roleOptions = [
    {value: 'manager', label: 'Manager'},
    {value: 'author', label: 'Author'},
    {value: 'viewer', label: 'Viewer'}
];

// @ts-ignore
const Team = ({usersData}) => {

    const [tempUsers, setTempUser] = useState(usersData.items);
    const [selectedUser, setSelectedUser] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const teamFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            role: null
        },
        onSubmit: values => {
            if (values.role) {
                // @ts-ignore
                httpClient.post(`${process.env.BACKEND_BASE_URL}/auth/signup`, {
                    // @ts-ignore
                    ...values, role: values.role.value, password: Math.random().toString(36).slice(-8), type: 'team'
                })
                    .then(res => {
                        console.log(res)
                        teamFormik.resetForm();
                        setTempUser([...tempUsers, res.data]);
                        ToasterSuccess('Successfully created. A email has been sent  to the email.');

                    })
                    .catch(err => {
                        ToasterError(err.response.data.message);
                    });
            }
        },
    });

    const updateForm = useFormik({
        initialValues: {
            role: null
        },
        onSubmit: values => {
            if (values.role) {
                // @ts-ignore
                if (selectedUser) {
                    // @ts-ignore
                    httpClient.put(`/users/role/${selectedUser.id}`, {
                        // @ts-ignore
                        role: values.role.value,
                    })
                        .then(res => {
                            console.log(res);
                            setTempUser((prevState: any) => {
                                // @ts-ignore
                                const ind = prevState.findIndex((user: any) => user.id === selectedUser.id);
                                prevState[ind] = res.data;
                                return prevState;
                            })
                            ToasterSuccess("Successfully updated");
                            handleClose();
                        })
                        .catch(err => {
                            console.error(err.response.data);
                            ToasterError(err.response.data.message);
                            handleClose();
                        })
                }
            }
        },
    });

    useEffect(() => {
        if (selectedUser !== null) {
            // @ts-ignore
            updateForm.setFieldValue('name', selectedUser.name || '');
            // @ts-ignore
            updateForm.setFieldValue('email', selectedUser.email || '');
            // @ts-ignore
            updateForm.setFieldValue('role', roleOptions.find(role => role.value === selectedUser.role) || null);
        }
    }, [selectedUser]);

    return (
        <div>
            <Head title="Jinpost admin | Team"/>
            <main className="page-content" style={{height: '100vh'}}>
                <div className="container-fluid h-100">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Team</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row">
                                        {
                                            tempUsers.map((user: any) => {
                                                return (
                                                    <div key={user.id} className="col-lg-6">
                                                        <div className="card mb-3">
                                                            <div className="row no-gutters">
                                                                <div className="col-md-4">
                                                                    <img
                                                                        src={user.profileImg || "/static/img/profile.jpg"}
                                                                        className="card-img" alt="..."
                                                                        style={{padding: '0.8rem'}}/>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="card-body">
                                                                        <h5>{user.name}</h5>
                                                                        <span
                                                                            className="mr-2 text-capitalize">{user.role}</span>
                                                                        <BiEdit
                                                                            style={{cursor: 'pointer'}}
                                                                            onClick={() => {
                                                                                setSelectedUser(user);
                                                                                handleShow();
                                                                            }} size={25}/>
                                                                        <p><a
                                                                            href={`mailto:${user.email}`}>{user.email}</a>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="user-create-area">
                                        <h6 className="mb-3">Create New Team Member</h6>
                                        <form onSubmit={teamFormik.handleSubmit}>
                                            <input
                                                onChange={teamFormik.handleChange}
                                                value={teamFormik.values.name}
                                                type="text"
                                                name="name"
                                                placeholder="Full name"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                onChange={teamFormik.handleChange}
                                                value={teamFormik.values.email}
                                            />
                                            <Select
                                                id="roleop"
                                                value={teamFormik.values.role}
                                                options={roleOptions}
                                                onChange={(roles) => {
                                                    teamFormik.setFieldValue('role', roles)
                                                }}
                                            />
                                            <button type="submit" className="btn btn-main mt-2">save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="d-flex flex-column" onSubmit={updateForm.handleSubmit}>
                            <label htmlFor="role">Role</label>
                            <Select
                                id="role"
                                value={updateForm.values.role}
                                options={roleOptions}
                                onChange={(role) => {
                                    updateForm.setFieldValue('role', role)
                                }}
                            />

                            <button type="submit" className="btn btn-main mt-2">save</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </main>
        </div>
    );
}

Team.Layout = AdminLayout;

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users?type=team`)
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }
    console.log(data)

    return {
        props: {
            usersData: data
        }, // will be passed to the page component as props
    }
}

export default Team;
