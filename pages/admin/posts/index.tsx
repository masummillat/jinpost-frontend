import React, {useContext, useEffect, useState} from "react";
import moment from "moment";
import Link from "next/link";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {useRouter} from "next/router";
import {Blog} from "../../../types";
import Head from "../../../components/head";
import AdminLayout from "../../../components/layouts/admin";
import {ProfileContext} from "../../../context/ProfileContext";
import {BsTrash} from "react-icons/bs";
import {BiEditAlt} from "react-icons/bi";
import httpClient from "../../../utils/api";
import {ToasterError, ToasterSuccess} from "../../../utils/statusMessage";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

interface IPost {
    blogs: Blog[]
}

const Posts= ({blogsData}: any) => {
    const [blogs, setBlogs] = useState<any>( []);
    const profileCtx = useContext(ProfileContext);
    const user = profileCtx.user;
    const router = useRouter();

    useEffect(()=>{
        setBlogs(blogsData.items)
    },[blogsData])

    const handleDelete = (id: number | undefined) => {
           confirmAlert({
               title: 'Confirm to delete',
               message: 'Are you sure to do this ?',
               buttons: [
                   {
                       label: 'Yes',
                       onClick: () => {
                           httpClient.delete(`/blogs/${id}`)
                               .then(res => {
                                   console.log(res);
                                   ToasterSuccess('Successfully deleted');
                                   setBlogs((prevState: any[]) => {
                                       return prevState.filter(blog=>blog.id !== id);
                                   })
                               })
                               .catch(err => {

                                   ToasterError(err.response.data.message);
                               })
                       }
                   },
                   {
                       label: 'No',
                       onClick: () => {}
                   }
               ]
           });

    }
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
                                            href={`/admin/posts?page=${router.query.page && Number(router.query.page) - 1 || 1}&limit=${router.query.limit || 10}`}>
                                            <a className="mr-5 p-4"> <GrChapterPrevious size={25} /></a>
                                        </Link>
                                        <Link
                                            href={`/admin/posts?page=${router.query.page && Number(router.query.page) + 1 || 1}&limit=${router.query.limit || 10}`}>
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
                                                blogs.map((blog:any)=>(
                                                    <tr key={blog.id}>
                                                        <td>{blog.title}</td>
                                                        <td>{blog.description}</td>
                                                        <td>{blog.author && blog.author.name}</td>
                                                        <td>{moment(blog.publishedDate).format('LLL')}</td>
                                                        <td>{blog.note}</td>
                                                        <td className="d-flex justify-content-between">
                                                            {
                                                                blog.author && user && blog.author.id === user.id && (
                                                                    <Link href={`/admin/posts/${blog.id}/edit`}>
                                                                        <a><BiEditAlt style={{cursor: 'pointer'}} size={25}/></a>
                                                                    </Link>
                                                                )
                                                            }
                                                            {
                                                                blog && <BsTrash onClick={()=>handleDelete(blog.id)} style={{cursor: 'pointer'}} size={25}  />
                                                            }
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


Posts.Layout = AdminLayout;

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
            blogsData: data
        }, // will be passed to the page component as props
    }
}
export default Posts;
