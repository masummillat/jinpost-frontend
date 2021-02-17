import React, {useContext, useEffect, useState} from 'react';
import moment from "moment";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,

} from "react-share";
import Drawer from 'rc-drawer';
import Link from 'next/link';
import DefaultLayout from "../../../components/layouts/default";
import {createMarkup} from "../../index";
import SuggestionBlogCard from "../../../components/blogs/SuggestionBlogCard";

import Head from '../../../components/head';
import Switch from 'react-switch';
import {FiSend} from "react-icons/fi";
import {useFormik} from "formik";
import * as yup from 'yup';
import httpClient from "../../../utils/api";
import {IComment} from "../../../types";
import {AiFillEdit} from "react-icons/ai";
import {BsTrash} from "react-icons/bs";
import {ToasterError, ToasterSuccess} from "../../../utils/statusMessage";
import {ProfileContext} from "../../../context/ProfileContext";
import {FaComments} from "react-icons/fa";


let schema = yup.object().shape({
    message: yup.string().required().min(1).max(300),
});

// @ts-ignore
const SingleBlogPage = ({blog, suggestions, authorData}) => {
    const [lang, setLang] = useState<string>('en');
    const [commentVisible, setCommentVisible] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const profileCtx = useContext(ProfileContext);
    const {user, isLoggedIn} = profileCtx;

    useEffect(() => {
        httpClient.get(`/comments?blogId=${blog.id}`)
            .then(res => {
                setComments(res.data);
            })
            .catch((err) => {
                ToasterError("Couldn't fetch comments");
            })
    }, []);

    useEffect(() => {
        if (isEdit && selectedComment) {
            formik.setFieldValue('message', selectedComment.message);
        }
    }, [isEdit]);

    const handleEditCancel = () => {
        setIsEdit(false);
        setSelectedComment(null);
        formik.setFieldValue('message', '');
    };

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (isEdit && selectedComment) {
                httpClient.put(`/comments/${ selectedComment.id}`,
                    {...values, id:  selectedComment.id, blog: {id: blog.id}})
                    .then(res => {
                        console.log(res);
                        setComments(prevState => {
                            const ind = prevState.findIndex(v=>v.id === selectedComment.id);
                            prevState[ind].message = res.data.message;
                            return prevState;
                        });
                        setIsEdit(false);
                        setSelectedComment(null);
                        ToasterSuccess('Successfully updated');
                    })
                    .catch(err => {
                        console.log(err);
                        setIsEdit(false);
                        setSelectedComment(null);
                        ToasterError("Couldn't update");
                    });
            } else {
                httpClient.post('/comments', {...values, blog: {id: blog.id}})
                    .then(res => {
                        console.log(res);
                        setComments(prevState => [res.data, ...prevState]);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            formik.resetForm();
        },
    });

    const handleLangChange = () => {
        if (lang === 'en') setLang('chi');
        else setLang('en');
    };

    const handleDeleteComment = (id: number) => {
        httpClient.delete(`/comments/${id}`)
            .then(res => {
                console.log(res.data);
                setComments(prevState => {
                    return prevState.filter(comment => comment.id !== id);
                });
                ToasterSuccess('Successfully deleted comment');
            })
            .catch(err => {
                ToasterError("Couldn't delete comment");
            })
    };

    return (
        <div>
            <Head
                title={blog && blog.title}
                description={blog && blog.description}
                ogImage={blog && blog.featuredImg || `/static/img/pic.jpg`}
                url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}
            />
            <div className="row">
                <Drawer
                    placement="right"
                    onClose={() => setCommentVisible(false)}
                    width="35vw"
                    open={commentVisible}
                    onHandleClick={() => setCommentVisible(!commentVisible)}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between">
                                <span><FaComments style={{color: '#059770'}} size={25} className="mr-2" />{comments.length}</span>
                                {!isLoggedIn && (<button className="btn btn-link" onClick={() => setCommentVisible(false)}>Login</button>)}
                            </div>
                        </div>
                        <hr/>
                        <div className="row mx-3">
                            <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                                <div className="form-group">
                                    <label htmlFor="commentInput">Comment</label>
                                    <textarea
                                        disabled={!isLoggedIn}
                                        className="form-control"
                                        id="commentInput"
                                        name="message"
                                        rows={4}
                                        placeholder="Write here"
                                        onChange={formik.handleChange}
                                        value={formik.values.message}
                                    />
                                    <small className="text-danger" style={{height: '20px'}}> {formik.touched['message'] && formik.errors['message']}</small>
                                </div>
                                <button disabled={!isLoggedIn} className="btn btn-primary"><FiSend
                                    className="mr-2"/> save
                                </button>
                            </form>
                        </div>
                        <div className="row mt-4">
                            {
                                comments.map((comment, index) => (
                                    <div key={index} className="col-12 d-flex mb-4">
                                        <img
                                            className="mx-1"
                                            src={comment.author && comment.author.profileImage || '/static/img/profile.jpg'}
                                            style={{width: 50, height: 50, borderRadius: '50%'}}
                                            alt={comment.author && comment.author.name || ''}
                                        />

                                        <div key={index}>
                                            <div
                                                className="font-weight-bold text-capitalize">{comment.author && comment.author.name || ''}</div>
                                            <span
                                                className="small text-muted font-italic">
                                                {moment(comment.updatedAt).local().format('llll')}
                                            </span>
                                            <div className="mb-1 ">{comment.message}</div>
                                            {
                                                isLoggedIn &&  (comment.author && user) &&   (comment.author.id === user.id) && (
                                                    <div className="d-flex">
                                                        <BsTrash
                                                            className="mr-4 my-2"
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            style={{cursor: 'pointer'}}
                                                        />
                                                        {
                                                            isEdit && selectedComment &&  (selectedComment.id === comment.id) ? (
                                                                    <div
                                                                        className="d-flex justify-content-center align-items-center "
                                                                        style={{cursor: 'pointer'}}
                                                                        onClick={() => handleEditCancel()}>Cancel</div>) :
                                                                (<AiFillEdit
                                                                    className="my-2"
                                                                    style={{cursor: 'pointer'}}
                                                                    onClick={() => {
                                                                        setSelectedComment(comment);
                                                                        setIsEdit(true);
                                                                    }}/>)
                                                        }

                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Drawer>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="full-post">
                            <h1 className="post-title">{blog && (lang === 'chi' ? blog.chineseTitle : blog.title)}</h1>
                            <div className="author d-flex justify-content-between">
                                <div>
                                    <img src={ blog && blog.author.profileImage || '/static/img/profile.jpg'}/>
                                    <Link href={`/${blog && blog.author && blog.author.domain}`}>
                                        <a>{blog && blog.author && blog.author.name}</a>
                                    </Link> on <span>{moment(blog && blog.createdAt).format('MMMM Do YYYY, h:mm A')}</span>
                                </div>
                                {
                                    blog && blog.chineseTitle && (
                                        <Switch
                                            width={70}
                                            onChange={handleLangChange}
                                            checked={lang === 'chi'}
                                            checkedIcon={<div
                                                className="d-flex justify-content-center align-items-center">EN</div>}
                                            uncheckedIcon={<div
                                                className="d-flex justify-content-center align-items-center">中文</div>}
                                        />
                                    )
                                }
                            </div>
                            <img src={blog && blog.featuredImg || '/static/img/pic.jpg'} className="featured-img"
                                 alt="feature image"/>
                            <div className="small italic mb-4">
                                {blog && (lang === 'chi' ? blog.chineseDescription : blog.description)}
                            </div>
                            <div
                                dangerouslySetInnerHTML={createMarkup(blog && (lang === 'chi' ? blog.chineseBody : blog.body))}/>
                        </div>
                    </div>
                    <div className="offset-lg-1 col-lg-3">
                        <div className="full-post-sidebar">
                            <a href="#"
                               onClick={()=>setCommentVisible(true)}
                               className="comments d-flex  align-items-center ">
                                <FaComments style={{color: '#059770'}} size={25} className="mr-2" />{comments.length}{' '} Comments</a>
                            <div className="social-share">
                                <h6>Share the article:</h6>
                                <ul>
                                    <li>
                                        <a>
                                            <FacebookShareButton
                                                url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                                <img src="/static/img/fb.png"/> Facebook
                                            </FacebookShareButton>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <TwitterShareButton
                                                url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                                <img src="/static/img/twitter.png"/> Twitter
                                            </TwitterShareButton>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <LinkedinShareButton
                                                url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                                <img src="/static/img/in.png"/> LinkedIn
                                            </LinkedinShareButton>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <EmailShareButton url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                                <img src="/static/img/mail.png"/> Email
                                            </EmailShareButton>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="about-author">
                                <h6>About the author:</h6>
                                <p>
                                    <span>
                                        <Link href={`/${blog && blog.author && blog.author.domain}`}>
                                            <a>{blog && blog.author && blog.author.name}</a>
                                        </Link>
                                    </span>
                                    {' '}{blog && blog.author && blog.author.bio}
                                </p>
                            </div>
                            <div className="author-post">
                                <h6>More from the author</h6>
                                <ul>
                                    {
                                        authorData &&
                                        authorData.blogs.map((blog: any, index: any) => (
                                            <li key={index}>
                                                <Link href={`/blogs/${blog.id}`}>
                                                    <a>
                                                        {blog.title}
                                                    </a>
                                                </Link>
                                            </li>

                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="post-tag">
                                {
                                    blog && blog.tags &&
                                    blog.tags.map((tag: any, index: any) => (
                                        <a href="#" key={index} className="btn-tag">
                                            {tag}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary mt-4 px-5" onClick={() => {
                        setCommentVisible(!commentVisible)
                    }}>Comments
                    </button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title mt-5">
                            <h1>More from JinPost</h1>
                        </div>
                    </div>
                    {suggestions && suggestions.map((blog: { id: number; }) => <SuggestionBlogCard key={blog.id}
                                                                                                   blog={blog}/>)}
                </div>
            </div>

        </div>
    );
}

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/${context.query.id}`);
    const blog = await res.json();

    const suggestedRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs?limit=4`);
    const suggestions = await suggestedRes.json();

    const authorRes = await fetch(`${process.env.BACKEND_BASE_URL}/users/${blog.author.id}`);
    const authorData = await authorRes.json();

    return {
        props: {
            blog: blog,
            suggestions: suggestions.items,
            authorData: authorData,
        }, // will be passed to the page component as props
    }
}

SingleBlogPage.Layout = DefaultLayout;
export default SingleBlogPage;
