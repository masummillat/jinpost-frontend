import React from 'react';
import 'react-calendar/dist/Calendar.css';
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";
import NewStoryComponent from "../../components/editor/NewStoryComponent";

interface Icategories {
    id: number;
    name: string;
}
interface INewPost {
    categories: Icategories[];
    suggestionTags: string[];

}
const NewPost = ({categories, suggestionTags}: INewPost) => {
    return (
        <div>
            <Head title="Jinpost admin | new post"/>
            <NewStoryComponent suggestionTags={suggestionTags} categories={categories}/>
        </div>
    );
}

NewPost.Layout = AdminLayout;

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories`)
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

export default NewPost;
