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
                            <Link href={`/blogs/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </h5>
                        <p className="card-text">This is a wider card with supporting text below as a
                            natural lead-in to additional content.</p>
                        <small className="text-muted">Writer name on {moment(blog.publishedDate).format('MMMM Do YYYY, h:mm A')}</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <img src={blog.featuredImg} className="card-img" alt="..." />
                </div>
            </div>
        </div>
    );
}

export default BlogItemCard;
