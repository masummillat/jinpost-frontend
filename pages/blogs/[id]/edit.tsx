import React, {useState} from 'react';
import DefaultLayout from "../../../components/layouts/default";
import NewStoryComponent from "../../../components/editor/NewStoryComponent";
import {INewPostPage} from "../../new-post";

const BlogEdit = ({categories, blog}: any) => {
    console.log(blog)
    console.log(categories)
    return(
        <div>
            <NewStoryComponent isEdit={true} blog={blog} categories={categories}/>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: '*' } }],
        fallback: true,
    };
}
export async function getStaticProps(context: any) {
    console.log(context)
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories`)
    const categories = await res.json();

    const blogRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/${context.params.id}`)
    const blogData = await blogRes.json();
    console.log(categories)
    if (!categories) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            categories: categories.items,
            blog: blogData
        }, // will be passed to the page component as props
    }
}



BlogEdit.Layout = DefaultLayout;
export default BlogEdit;
