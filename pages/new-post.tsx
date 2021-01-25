import React from 'react';
import 'react-calendar/dist/Calendar.css';
import DefaultLayout from "../components/layouts/default";
import Head from "../components/head";

import NewStoryComponent from "../components/editor/NewStoryComponent";

export interface Icategories {
    id: number;
    name: string;
}
export interface INewPostPage {
    categories: Icategories[]
    suggestionTags: string[]
}
const NewPostPage = ({categories, suggestionTags}: INewPostPage) => {
    
    return (
        <div>
            <Head title="Jinpost | write your store here"/>
           <NewStoryComponent suggestionTags={suggestionTags} categories={categories}/>
        </div>
    );
}

NewPostPage.Layout = DefaultLayout;

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories?page=1&limit=100`);
    const data = await res.json();

    const tagsRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/tags`);
    const tags = await tagsRes.json();

    console.log(data)
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            categories: data.items,
            suggestionTags: tags
        }, // will be passed to the page component as props
    }
}

export default NewPostPage;
