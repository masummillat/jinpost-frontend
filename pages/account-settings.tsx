import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/layouts/default";
import { Tab, Col, Nav, Row, Card } from "react-bootstrap";
import BasicForm, { IBasicInfo } from "../components/account-setting/BasicForm";
import PasswordChangeForm from "../components/account-setting/PasswordChangeForm";
import { userInfo } from "os";
import httpClient from "../utils/api";
import { ProfileContext } from "../context/ProfileContext";
import { AiOutlineUser } from "react-icons/ai";
import { ToasterError, ToasterSuccess } from "../utils/statusMessage";
import Head from "../components/head";

const AccountSettings = ({ userInfo }: { userInfo: any }) => {
    const profileCtx = useContext(ProfileContext);
    const [profileImg, setProfileImg] = useState<ArrayBuffer | string | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const imageInputRef = useRef(null);
    const handleProfileImg = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // @ts-ignore
        let file = event.currentTarget.files[0];
        // @ts-ignore
        setProfileImg(file);
        let reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result)
            // @ts-ignore
            setImagePreviewUrl(reader.result)
            // @ts-ignore

        }

        reader.readAsDataURL(file)

    }
    const handleUpdateUser = async (userInfo: IBasicInfo) => {
        const { email, ...payload } = userInfo;
        if (profileImg) {
            var imageFormData = new FormData();
            // @ts-ignore
            await imageFormData.append('file', profileImg)
            console.log(imageFormData.get('file'))
            await fetch(`${process.env.BACKEND_BASE_URL}/blogs/image/upload`, {
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: imageFormData,
                method: 'post',
            }).then(res => res.json())
                .then(r => {
                    if (profileCtx.user) {
                        httpClient.put(`/users/${profileCtx.user.id}`, { ...payload, profileImage: r.Location })
                            .then(res => {
                                console.log(res);
                                ToasterSuccess("Successfully updated")
                            })
                            .catch(err => {
                                console.error(err.response.data)
                                ToasterError(err.response.data.message)
                            })
                    }
                })

        } else {
            if (profileCtx.user) {
                httpClient.put(`/users/${profileCtx.user.id}`, payload)
                    .then(res => {
                        console.log(res)
                        ToasterSuccess('Successfully Updated');
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

        console.log(JSON.stringify(payload, null, 2));
    }

    useEffect(() => {
        if (profileCtx.user) {
            setImagePreviewUrl(profileCtx.user.profileImg)
        }
    }, [profileCtx.user])
    return (
        <div>
            <Head
                title="Jinpost | account settings" />
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-10">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="edit-profile">
                            <Row>
                                <Col sm={3}>
                                    <Card>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="edit-profile">Edit Profile</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="change-password">Change Password</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="delete-account">Delete Account</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card>
                                </Col>
                                <Col sm={7}>
                                    <Card>
                                        <Card.Body>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="edit-profile">
                                                    {
                                                        profileCtx.user && (<BasicForm basicInfo={{
                                                            name: profileCtx.user.name,
                                                            email: profileCtx.user.email,
                                                            bio: profileCtx.user.bio,
                                                            occupation: profileCtx.user.occupation
                                                        }}
                                                            handleSubmit={handleUpdateUser}
                                                        />)
                                                    }
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="change-password">
                                                    {profileCtx.user && (<PasswordChangeForm id={profileCtx.user.id} />)}
                                                
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="delete-account">
                                                    <p>If you delete account you will not be logged in again without
                                                    registration.</p>
                                                    <button className="btn btn-danger">Delete Account</button>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                    <div className="col-lg-2">
                        <div onClick={() => {
                            // @ts-ignore
                            imageInputRef.current.click()
                        }} className="profile-photo-change-preview">
                            {profileCtx.user && profileCtx.user.profileImage ?
                                <img src={profileCtx.user.profileImage} className="img-fluid" /> : imagePreviewUrl ?
                                    <img src={imagePreviewUrl} className="img-fluid" /> : <AiOutlineUser size={100} />}


                            <input style={{ visibility: 'hidden' }} ref={imageInputRef} type="file" accept="image/*"
                                onChange={handleProfileImg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AccountSettings.Layout = DefaultLayout;

export async function getStaticProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/1`)
    const data = await res.json()
    console.log(data)
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            userInfo: data,
        }, // will be passed to the page component as props
    }
}

export default AccountSettings;
