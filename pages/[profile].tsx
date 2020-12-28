import React, {useContext, useState} from 'react';
import {FaUserEdit} from 'react-icons/fa';
import DefaultLayout from "../components/layouts/default";
import PublishBlogCard from "../components/blogs/PublishBlogCard";
import {Card, Nav, Row, Tab} from "react-bootstrap";
import Link from "next/link";
import {ProfileContext} from "../context/ProfileContext";

const ProfilePage = () => {
    // @ts-ignore
    const {user} = useContext(ProfileContext);
    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="profile">
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/static/img/profile.jpg" className="card-img" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{user && user.name}</h5>
                                        {/*<small>Data Scientist</small>*/}
                                        <p className="card-text">{user && user.occupation}</p>
                                        <Link href="/account-settings">
                                            <a className="profile-edit">
                                                <FaUserEdit className="mr-2"/> Edit Profile
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="bio">
                            <Row>
                                <Nav  variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="bio">About</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="published">Published</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="draft">Draft</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Row>
                            <Row>
                                <Tab.Content>
                                    <Tab.Pane eventKey="bio">
                                        <h5 className="mb-3 mt-3">Biography</h5>
                                        <p>
                                            {user && user.bio}
                                        </p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="published">
                                        <Row>
                                            {user && user.blogEntries.map((blog: any, i: number )=><PublishBlogCard key={i} blog={blog}/>)}
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="draft">
                                        <Row>
                                            {user && user.blogEntries.map((blog: any, i: number )=><PublishBlogCard key={i} blog={blog}/>)}
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </div>
    );
}
ProfilePage.Layout = DefaultLayout;

// export async function getStaticProps(context:any) {
//     const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/1`)
//     const data = await res.json()
//     console.log(data)
//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }
//
//     return {
//         props: {
//             user: data,
//         }, // will be passed to the page component as props
//     }
// }
export default ProfilePage;
