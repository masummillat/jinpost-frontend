import React from 'react';
import moment from "moment";
import Link from "next/link";
import {Blog} from '../../types';
import httpClient from '../../utils/api';
import {ToasterSuccess, ToasterError} from '../../utils/statusMessage';

interface PublishBlogCardProps {
    blog: Blog;
    authorized: boolean;
}

const PublishBlogCard: React.FC<PublishBlogCardProps> = ({blog, authorized}) => {

    const handleDelete = (id: number) => {
        httpClient.delete(`/blogs/${id}`)
            .then(res => {
                console.log(res);
                ToasterSuccess('Successfully deleted');
            })
            .catch(err => {
                console.log(err);
                ToasterError("Couldn't delete ");
            })
    }
    return (
        <div className="col-lg-4">
            <div className="published-item">
                <div className="card">
                    <img src={blog.featuredImg || '/static/img/pic.jpg'} className="card-img-top" alt="..."/>
                    <small>{moment(blog.publishedDate).format('LL')}</small>
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link href={`/blogs/${blog.id}`}>
                                <a className="line-clamp-2">{blog.title}</a>
                            </Link>
                        </p>
                        <p className="article-preview-desc line-clamp-2">{blog.description}</p>
                        <hr/>
                        {authorized && (
                            <Link href={`/blogs/${blog.id}/edit`}>
                                <a className="card-link text-success">Edit</a>
                            </Link>
                        )}
                        {authorized && (<div onClick={() => handleDelete} className="card-link float-right text-danger">
                                Delete
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PublishBlogCard;
