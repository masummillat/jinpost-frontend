import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import  * as _ from 'lodash'
import { FaUserEdit } from 'react-icons/fa';
import DefaultLayout from "../components/layouts/default";
import PublishBlogCard from "../components/blogs/PublishBlogCard";
import { Card, Nav, Row, Tab } from "react-bootstrap";
import Link from "next/link";
import { ProfileContext } from "../context/ProfileContext";
import isAuthenticated from '../utils/isAuthenticated';
import { UserDto } from '../types';
import Head from '../components/head';

const ProfilePage = ({ profile }: { profile: UserDto }) => {

    const [authorized, setAuthorized] = useState<boolean>(false)
    const router = useRouter();
    const proCtx = useContext(ProfileContext);

    useEffect(() => {
        if (profile && proCtx.user) {
            setAuthorized((router.query.domain === profile.domain) &&
                isAuthenticated() && (proCtx.user && proCtx.user.domain === profile.domain))
        }
    }, [profile])

    if (profile.statusCode === 404) {
        return (
            <div>
                <Head description="404 - domain not found" />
                <div className="container my-5">
                    <div className="col-12 text-center">
                        <h1 className="text-secondary"> User with domain name {' '}
                            <span className="text-info font-italic">{router.query.domain}</span> not found.
                    </h1>
                        <Link href="/">
                            <a className="btn btn-primary btn-lg">Go to Home</a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Head
                title={`${profile && profile.name} | Jinpost`}
                description={ profile && profile.description}
                ogImage={profile && profile.profileImage}
                keywords={`${profile.name}`}
            />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="profile">
                            <div className="card">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={profile.profileImage || '/static/img/profile.jpg'} className="card-img" alt="..." />
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
                                                    profile &&
                                                    profile.blogs &&
                                                    profile.blogs.filter((b: any) => b.isPublished === true).reverse()
                                                        .map((blog: any, i: number) => (
                                                            <PublishBlogCard key={i} blog={blog} authorized={authorized} />
                                                        ))
                                                }
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="draft">
                                            <Row>
                                                {
                                                    profile &&
                                                    profile.blogs &&
                                                    profile.blogs.filter((b: any) => b.isPublished === false).reverse()
                                                        .map((blog: any, i: number) => (
                                                            <PublishBlogCard key={i} blog={blog} authorized={authorized} />
                                                        ))
                                                }
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
ProfilePage.Layout = DefaultLayout;

export async function getServerSideProps(context: any) {
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
