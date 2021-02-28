import React from 'react';
import Link from "next/link";

// @ts-ignore
const BlogCard = ({blog}) => {

    return(
        <div className="col-lg-6 mb-3">
            <div className="article-preview-right">
                <div className="card">
                    <img  style={{height: '100%', maxHeight: 150}} src={blog.featuredImg || '/static/img/pic.jpg'} className="card-img-top" alt={blog.title}/>
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link href={`/blogs/${blog.id}`}>
                                <a className="line-clamp-2">{blog.title}</a>
                            </Link>
                        </p>
                        <Link  href={`/${blog.author.domain}`}>
                        <a className="article-preview-author">
                            <img src={blog.author.profileImage || '/static/img/profile.jpg'}/>{blog.author.name}
                        </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;
