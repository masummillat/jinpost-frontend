import React from "react";
import moment from "moment";
import Link from "next/link";
const SampleBlogCard = ({blog}:{blog: any}) => {

    return(
        <div className="col-lg-3 col-md-4" style={{marginBottom: '16px'}}>
            <div className="article-item">
                <div className="card">
                    <a href="#" className="article-preview-author">
                        <img src="/static/img/profile.jpg"/>{blog.author.name}
                    </a>
                    <img src={blog.featuredImg} className="card-img-top" alt="..."/>
                    <small>{moment(blog.createdAt).format('LL')}</small>
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link  href={`/blogs/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </p>
                        <p className="article-preview-desc">It is a long established fact that a reader will
                            be distracted by the readable content.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SampleBlogCard;
