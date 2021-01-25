import React from 'react';
import Head from '../../components/head';
import DefaultLayout from '../../components/layouts/default';
import BlogItemCard from '../../components/category/BlogItemCard';
import Link from 'next/link';
import { createStringArray } from '../../components/editor/NewStoryComponent';
import { unique } from '../../utils/uniqevalue';

const BlogsPage = ({blogsData, tagsData}: {blogsData: any, tagsData: any[]}) =>{
    const blogs = blogsData.items;
    console.log(blogs);
    const tags = unique(createStringArray(tagsData));

    return (

        <div>
            <Head title="Jinpost" />
            <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <div className="category-post">
                        {
                            blogs.map((blog: { id: number, blog: any })=><BlogItemCard blog={blog} key={blog.id}/>)
                        }
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-4">
                    <div className="category-popular-post">
                        <h5>Popular in Tags</h5>
                        <ul className="d-flex flex-wrap">
                            {tags.map((tag,index)=>(
                                <Link key={index} href={`/blogs?tag=${tag}`}>
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
    const {page=1, limit=10, tag=''} = query;
    const blogsDatadRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs?page=${page}&tag=${tag}&limit=${limit}`);
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