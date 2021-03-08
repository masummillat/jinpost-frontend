import React from 'react';
import {useRouter} from 'next/router'
import Head from '../../components/head';
import DefaultLayout from '../../components/layouts/default';
import BlogItemCard from '../../components/category/BlogItemCard';
import Link from 'next/link';
import {createStringArray} from '../../components/editor/NewStoryComponent';
import {unique} from '../../utils/uniqevalue';
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import jwt_decode from "jwt-decode";

const BlogsPage = ({blogsData, tagsData}: { blogsData: any, tagsData: any[] }) => {
    const blogs = blogsData.items;
    const router = useRouter();
    const tags = unique(createStringArray(tagsData));

    return (

        <div>
            <Head title="Jinpost"/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-12">
                                <div className="category-post">
                                    {
                                        blogs.map((blog: { id: number, blog: any }) => (<BlogItemCard blog={blog}
                                                                                                     key={blog.id}/>))
                                    }
                                    {
                                        blogs.length === 0 &&(
                                           <div className="d-flex justify-content-center align-items-center">
                                               <h2>No Blog Found !</h2>
                                           </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12  ">
                                <div className="d-flex float-right">
                                    <Link
                                        href={`/blogs?${router.query.tag ? `tag=${router.query.tag}&`: ''}page=${router.query.page && Number(router.query.page) - 1 || 1}&limit=${router.query.limit || 10}`}>
                                        <a className="mr-5 p-4"> <GrChapterPrevious size={25} /></a>
                                    </Link>
                                    <Link
                                        href={`/blogs?${router.query.tag ? `tag=${router.query.tag}&`: ''}page=${router.query.page && Number(router.query.page) + 1 || 1}&limit=${router.query.limit || 10}`}>
                                        <a className="p-4"> <GrChapterNext size={25}/></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offset-lg-1 col-lg-4">
                        <div className="category-popular-post">
                            <h5>Popular in Tags</h5>
                            <ul className="d-flex flex-wrap">
                                {tags.map((tag, index) => (
                                    <Link key={index} href={`/blogs?tag=${tag}&page=1&limit=10`}>
                                        <a className="badge badge-primary px-3 py-2 m-1">{tag}</a>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

BlogsPage.Layout = DefaultLayout;

export async function getServerSideProps(context: any) {
    const {query} = context;
    let subscription: boolean  = false;
   if(context.req.cookies.access_token){
       const decodedToken = jwt_decode(context.req.cookies.access_token);
       // @ts-ignore
       if (decodedToken && decodedToken.subscriptions){
           // @ts-ignore
           subscription = new Date(decodedToken.subscriptions.subscriptionEnd) > new Date()
       }
   }
    const {page = 1, limit = 10, tag = ''} = query;
    const blogsDatadRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs?subscription=${subscription}&isPublished=${true}&page=${page}&tag=${tag}&limit=${limit}`);
    const blogsData = await blogsDatadRes.json()

    const tagsRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/tags`)
    const tags = await tagsRes.json()
    return {
        props: {
            blogsData: blogsData,
            tagsData: tags
        }, // will be passed to the page component as props
    }
}

export default BlogsPage;
