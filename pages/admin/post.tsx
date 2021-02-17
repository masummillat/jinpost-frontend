import React from "react";
import moment from "moment";
import AdminLayout from "../../components/layouts/admin";
import Head from "../../components/head";
import {Blog} from "../../types";
import Link from "next/link";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {useRouter} from "next/router";

interface IPost {
    blogs: Blog[]
}

const Post= ({blogs}: IPost) => {
    const router = useRouter();
    return (
        <div>
            <Head title="Jinpost admin | Post" />
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Posts</h1>
                            </div>
                            <div className="row">
                                <div className="col-12  ">
                                    <div className="d-flex float-right">
                                        <Link
                                            href={`/admin/post?page=${router.query.page && Number(router.query.page) - 1 || 1}&limit=${router.query.limit || 10}`}>
                                            <a className="mr-5 p-4"> <GrChapterPrevious size={25} /></a>
                                        </Link>
                                        <Link
                                            href={`/admin/post?page=${router.query.page && Number(router.query.page) + 1 || 1}&limit=${router.query.limit || 10}`}>
                                            <a className="p-4"> <GrChapterNext size={25}/></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="post-list">
                                        <table id="post-list" className="table table-striped table-bordered"
                                               style={{width: '100%'}}>
                                            <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Excerpt</th>
                                                <th>Author</th>
                                                <th>Date</th>
                                                <th>Note</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                blogs.map((blog)=>(
                                                    <tr key={blog.id}>
                                                        <td>{blog.title}</td>
                                                        <td>{blog.description}</td>
                                                        <td>{blog.author && blog.author.name}</td>
                                                        <td>{moment(blog.publishedDate).format('LLL')}</td>
                                                        <td></td>
                                                        <td>
                                                            <a href="#"><i className="far fa-edit"></i></a>
                                                            <a href="#"><i className="far fa-trash-alt"></i></a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


Post.Layout = AdminLayout;

export async function getServerSideProps(context: any) {
    const {query} = context;
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/blogs?page=${Number(query.page) || 1 }&limit=${Number(query.limit) || 10}`)
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            blogs: data.items
        }, // will be passed to the page component as props
    }
}
export default Post;
