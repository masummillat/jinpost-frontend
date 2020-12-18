import React from 'react';
import moment from "moment";
import DefaultLayout from "../../components/layouts/default";
import {createMarkup} from "../index";
import SuggestionBlogCard from "../../components/blogs/SuggestionBlogCard";

// @ts-ignore
const SingleBlogPage = ({blog, suggestions})=>{
    console.log(blog)
    console.log(suggestions)
    // @ts-ignore
    // @ts-ignore
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="full-post">
                        <h1 className="post-title">{blog.title}</h1>
                        <div className="author">
                            <img src="/static/img/profile.jpg" />
                                <a href="#">{blog.author.name}</a> on <span>{moment(blog.createdAt).format('MMMM Do YYYY, h:mm A')}</span>
                        </div>
                        <img src={blog.featuredImg} className="featured-img" />
                        <div dangerouslySetInnerHTML={createMarkup(blog.body)} />
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-3">
                    <div className="full-post-sidebar">
                        <a href="#" className="comments"><span className="material-icons">comment</span>3 Comments</a>
                        <div className="social-share">
                            <h6>Share the article:</h6>
                            <ul>
                                <li>
                                    <a href="#"><img src="/static/img/fb.png" /> Facebook</a>
                                </li>
                                <li>
                                    <a href="#"><img src="/static/img/twitter.png" /> Twitter</a>
                                </li>
                                <li>
                                    <a href="#"><img src="/static/img/in.png" /> LinkedIn</a>
                                </li>
                                <li>
                                    <a href="#"><img src="/static/img/mail.png" /> Email</a>
                                </li>
                            </ul>
                        </div>
                        <div className="about-author">
                            <h6>About the author:</h6>
                            <p>
                                <span>Long Sicong</span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                                voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            </p>
                        </div>
                        <div className="author-post">
                            <h6>More from the author</h6>
                            <ul>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                                <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            </ul>
                        </div>
                        <div className="post-tag">
                            <a href="#" className="btn-tag">Lorem Ipsum</a>
                            <a href="#" className="btn-tag">Ipsum</a>
                            <a href="#" className="btn-tag">Lorem</a>
                            <a href="#" className="btn-tag">Lorem Ipsum</a>
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
                { suggestions && suggestions.map((blog: { id: string | number | null | undefined; })=><SuggestionBlogCard key={blog.id} blog={blog}/>)}
            </div>
        </div>
    );
}


export async function getServerSideProps(context: any) {
    console.log(context.params)
    const res = await fetch(`http://localhost:3000/blogs/${context.params.id}`)
    const data = await res.json()

    const suggestedRes = await  fetch('http://localhost:3000/blogs');
    const suggestions: any[] = await suggestedRes.json()

    return {
        props: {
            blog: data || null,
            suggestions:  suggestions || null
        }, // will be passed to the page component as props
    }
}
SingleBlogPage.Layout = DefaultLayout;
export default SingleBlogPage;
