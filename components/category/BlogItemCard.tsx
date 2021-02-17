import React from "react";
import Link from "next/link";
import moment from "moment";
const BlogItemCard = ({blog}:{blog: any}) => {
    return(
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link href={`/blogs/${blog && blog.id}`}>
                                <a>{blog && blog.title}</a>
                            </Link>
                        </h5>
                             <p className="card-text">{blog && blog.description}</p>
                        <small className="text-muted">Published on {moment(blog.publishedDate).format('MMMM Do YYYY, h:mm A')}</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <img src={blog && blog.featuredImg || '/static/img/pic.jpg'} className="card-img" alt="..." />
                </div>
            </div>
        </div>
    );
}

export default BlogItemCard;
