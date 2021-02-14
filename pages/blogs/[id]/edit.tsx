import React, {useState} from 'react';
import DefaultLayout from "../../../components/layouts/default";
import {INewPostPage} from "../../new-post";
import Head from '../../../components/head';
import dynamic from "next/dynamic";
import PageLoader from "../../../components/pageLoader";

const NewStoryComponent = dynamic(()=>import('../../../components/editor/NewStoryComponent'), {
    ssr: false,   loading: () => <PageLoader/>

});

const BlogEdit = ({categories, blog, suggestionTags}: any) => {

    return(
        <div>
            <Head title="Jinpost | edit story"/>
            <NewStoryComponent suggestionTags={suggestionTags} isEdit={true} blog={blog} categories={categories}/>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories`)
    const categories = await res.json();

    const blogRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/${context.query.id}`)
    const blogData = await blogRes.json();

    const tagsRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/tags`);
    const tags = await tagsRes.json()

    if (!categories) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            categories: categories.items,
            blog: blogData,
            suggestionTags: tags
        }, // will be passed to the page component as props
    }
}



BlogEdit.Layout = DefaultLayout;
export default BlogEdit;
