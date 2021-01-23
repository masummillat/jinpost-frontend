import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { FaUserEdit } from 'react-icons/fa';
import DefaultLayout from "../components/layouts/default";
import PublishBlogCard from "../components/blogs/PublishBlogCard";
import { Card, Nav, Row, Tab } from "react-bootstrap";
import Link from "next/link";
import { ProfileContext } from "../context/ProfileContext";
import isAuthenticated from '../utils/isAuthenticated';
import { UserDto } from '../types';

const ProfilePage = ({ profile }: { profile: UserDto }) => {
    const [authorized, setAuthorized] = useState<boolean>(false)
    const router = useRouter();
    console.log(router)
    // @ts-ignore
    const { user } = useContext(ProfileContext);
    useEffect(() => {
        if (profile) {
            setAuthorized((router.query.domain === profile.domain) &&
            isAuthenticated() && (user.domain === profile.domain))
        }
    }, [profile])
    console.log(authorized)
    return (
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
                                        <h5 className="card-title">{profile && profile.name}</h5>
                                        {/*<small>Data Scientist</small>*/}
                                        <p className="card-text">{profile && profile.occupation}</p>
                                        {isAuthenticated() && authorized && (<Link href="/account-settings">
                                            <a className="profile-edit">
                                                <FaUserEdit className="mr-2" /> Edit Profile
                                            </a>
                                        </Link>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="bio">
                            <Row>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="bio">About</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="published">Published</Nav.Link>
                                    </Nav.Item>
                                    {isAuthenticated() && authorized && (
                                        <Nav.Item>
                                            <Nav.Link eventKey="draft">Draft</Nav.Link>
                                        </Nav.Item>

                                    )}
                                </Nav>
                            </Row>
                            <Row>
                                <Tab.Content>
                                    <Tab.Pane eventKey="bio">
                                        <h5 className="mb-3 mt-3">Biography</h5>
                                        <p>
                                            {profile && profile.bio}
                                        </p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="published">
                                        <Row>
                                            {
                                            profile && profile.blogs && profile.blogs.filter((b: any) => b.isPublished === true)
                                            .map((blog: any, i: number) => (
                                                <PublishBlogCard key={i} blog={blog} authorized={authorized} />
                                            ))}
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="draft">
                                        <Row>
                                            {profile && profile.blogs && profile.blogs.map((blog: any, i: number) => <PublishBlogCard authorized={authorized} key={i} blog={blog} />)}
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

export async function getServerSideProps(context: any) {

    console.log('===========')
        console.log(context.query)
    console.log('===========')
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/domain/${context.params.domain}`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            profile: data
        }, // will be passed to the page component as props
    }
}
export default ProfilePage;
