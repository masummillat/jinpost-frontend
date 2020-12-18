import React from 'react';
import Link from "next/link";
import moment from 'moment';
// @ts-ignore
const SuggestionBlogCard = ({blog}) => {

    return(
        <div className="col-lg-3">
            <div className="article-item">
                <div className="card">
                    <a href="#" className="article-preview-author">
                        <img src="/static/img/profile.jpg" />{blog.author.name}
                    </a>
                    <img src={blog.featuredImg} className="card-img-top" alt="..." />
                        <small>{moment(blog.createdAt).format('LL')}</small>
                        <div className="card-body">
                            <p className="article-preview-title">
                                <Link href={`/blogs/${blog.id}`}>
                                    <a>{blog.title}</a>
                                </Link>
                            </p>
                            <p className="article-preview-desc">
                                {blog.description}
                            </p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionBlogCard;
