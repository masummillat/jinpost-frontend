import React from "react";
import moment from "moment";
import Link from "next/link";
const SampleBlogCard = ({blog}:{blog: any}) => {
    console.log(blog)
    return(
        <div className="col-lg-4 col-md-4" style={{marginBottom: '16px'}}>
            <div className="article-item">
                <div className="card">
                    <a href="#" className="article-preview-author">
                        <img src={blog.author.profileImage || '/static/img/profile.jpg' }/>{blog.author.name}
                    </a>
                    <img src={blog.featuredImg || '/static/img/pic.jpg'} className="card-img-top" alt="..."/>
                    <small>{moment(blog.createdAt).format('LL')}</small>
                    <div className="card-body">
                        <p className="article-preview-title">
                            <Link  href={`/blogs/${blog.id}`}>
                                <a className="line-clamp-2">{blog.title}</a>
                            </Link>
                        </p>
                        <p className="article-preview-desc line-clamp-2">{blog.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SampleBlogCard;
