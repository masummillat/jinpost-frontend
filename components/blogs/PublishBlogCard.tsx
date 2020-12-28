import React from 'react';
import moment from "moment";
import Link from "next/link";
const PublishBlogCard = ({blog}:{blog: any}) => {
    return(
        <div className="col-lg-4">
            <div className="published-item">
                <div className="card">
                    <img src={blog.featuredImg} className="card-img-top" alt="..." />
                    <small>{moment(blog.createdAt).format('LL')}</small>
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link href={`/blogs/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </p>
                        <p className="article-preview-desc">It is a long established
                            fact that a reader will be distracted by the readable
                            content.</p>
                        <hr />
                        <a href="#" className="card-link text-success">Edit</a>
                        <a href="#"
                           className="card-link float-right text-danger">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PublishBlogCard;
