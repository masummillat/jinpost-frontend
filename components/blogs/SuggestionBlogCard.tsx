import React from 'react';
import Link from "next/link";
import moment from 'moment';
// @ts-ignore
const SuggestionBlogCard = ({blog}) => {

    return(
        <div className="col-lg-3 mb-4">
            <div className="article-item">
                <div className="card">
                    <a href="#" className="article-preview-author">
                        <img src={blog.author.profileImage || "/static/img/profile.jpg"} />{blog.author.name}
                    </a>
                    <img src={blog.featuredImg || '/static/img/pic.jpg' } className="card-img-top" alt="..." />
                        <small>{moment(blog.publishedDate).format('LL')}</small>
                        <div className="card-body">
                            <p className="article-preview-title">
                                <Link href={`/blogs/${blog.id}`}>
                                    <a className="line-clamp-2">{blog.title}</a>
                                </Link>
                            </p>
                            <p className="article-preview-desc line-clamp-2">
                                {blog.description}
                            </p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionBlogCard;
