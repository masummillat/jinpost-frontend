import React from 'react';
import moment from "moment";
import Link from "next/link";
import { Blog } from '../../types';

interface PublishBlogCardProps{
    blog: Blog;
    authorized: boolean;
}
const PublishBlogCard: React.FC<PublishBlogCardProps> = ({blog, authorized}) => {
    return(
        <div className="col-lg-4">
            <div className="published-item">
                <div className="card">
                    <img src={blog.featuredImg || '/static/img/pic.jpg'} className="card-img-top" alt="..." />
                    <small>{moment(blog.createdAt).format('LL')}</small>
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link href={`/blogs/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </p>
                        <p className="article-preview-desc">{blog.description}</p>
                        <hr />
                       {authorized && ( <a  className="card-link text-success">Edit</a>)}
                        {authorized && (<a href="#"
                           className="card-link float-right text-danger">Delete</a>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PublishBlogCard;
