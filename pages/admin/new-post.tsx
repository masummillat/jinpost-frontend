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

}
const NewPost = ({categories}: INewPost) => {
    return (
        <div>
            <Head title="Jinpost admin | new post"/>
            <NewStoryComponent categories={categories}/>
        </div>
    );
}

NewPost.Layout = AdminLayout;

export async function getStaticProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories`)
    const data = await res.json()
    console.log(data)
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            categories: data.items
        }, // will be passed to the page component as props
    }
}

export default NewPost;
