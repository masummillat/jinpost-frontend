import React from 'react';
import moment from "moment";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
   
  } from "react-share";
import Link from 'next/link';
import DefaultLayout from "../../components/layouts/default";
import {createMarkup} from "../index";
import SuggestionBlogCard from "../../components/blogs/SuggestionBlogCard";

import Head from '../../components/head';

// @ts-ignore
const SingleBlogPage = ({blog, suggestions, authorData})=>{

    return(
        <div>
            <Head
                title= {blog && blog.title}
                description={blog && blog.description}
                ogImage = {blog && blog.featuredImg || `/static/img/pic.jpg`}
                url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}


            />
<div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="full-post">
                        <h1 className="post-title">{ blog && blog.title}</h1>
                        <div className="author">
                            <img src="/static/img/profile.jpg" />
                                <Link href={`/${blog && blog.author && blog.author.domain}`}>
                                    <a>{blog && blog.author &&  blog.author.name}</a>
                                </Link> on <span>{moment(blog && blog.createdAt).format('MMMM Do YYYY, h:mm A')}</span>
                        </div>
                        <img src={blog && blog.featuredImg || '/static/img/pic.jpg'} className="featured-img" />
                        <div dangerouslySetInnerHTML={createMarkup(blog &&  blog.body)} />
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-3">
                    <div className="full-post-sidebar">
                        <a href="#" className="comments"><span className="material-icons">comment</span>3 Comments</a>
                        <div className="social-share">
                            <h6>Share the article:</h6>
                            <ul>
                                <li>
                                     <a>
                                         <FacebookShareButton url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                            <img src="/static/img/fb.png" /> Facebook
                                         </FacebookShareButton>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <TwitterShareButton url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                            <img src="/static/img/twitter.png" /> Twitter
                                         </TwitterShareButton>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <LinkedinShareButton url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                            <img src="/static/img/in.png" /> LinkedIn
                                         </LinkedinShareButton>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <EmailShareButton url={`${process.env.BASE_URL}/blogs/${blog && blog.id}`}>
                                            <img src="/static/img/mail.png" /> Email
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
                                        authorData.blogs.map((blog: any,index: any)=>(
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
                                blog &&
                                 blog.tags.map((tag: any, index: any)=>(
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
                <div className="col-12">
                    <div className="section-title mt-5">
                        <h1>More from China SDG</h1>
                    </div>
                </div>
                { suggestions && suggestions.map((blog: { id:  number ; })=><SuggestionBlogCard key={blog.id} blog={blog}/>)}
            </div>
        </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    console.log(context.params)
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/${context.query.id}`)
    const blog = await res.json()

    const suggestedRes = await  fetch(`${process.env.BACKEND_BASE_URL}/blogs`);
    const suggestions  = await suggestedRes.json()

    const authorRes = await  fetch(`${process.env.BACKEND_BASE_URL}/users/${blog.author.id}`);
    const authorData  = await authorRes.json()
    return {
        props: {
            blog: blog,
            suggestions:  suggestions.items,
            authorData:  authorData
        }, // will be passed to the page component as props
    }
}
SingleBlogPage.Layout = DefaultLayout;
export default SingleBlogPage;
