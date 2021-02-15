import React, {useContext} from 'react';
import DefaultLayout from "../components/layouts/default";
import Head from "../components/head";
import dynamic from "next/dist/next-server/lib/dynamic";
import PageLoader from "../components/pageLoader";
import UnAuthorized from "../components/unauthorized/UnAuthorized";
import {ProfileContext} from "../context/ProfileContext";
import {UserRole} from "../types";

const NewStoryComponent = dynamic(() => import('../components/editor/NewStoryComponent'), {
    ssr: false, loading: () => <PageLoader/>

});


export interface Icategories {
    id: number;
    name: string;
}

export interface INewPostPage {
    categories: Icategories[]
    suggestionTags: string[]
}

const NewPostPage = ({categories, suggestionTags}: INewPostPage) => {
    const profileCtx = useContext(ProfileContext);
    const user = profileCtx.user;
    console.log(user)
    if (user) {
        if (user.role === UserRole.ADMIN || user.role === UserRole.AUTHOR) {
            return (<div>
                <Head title="Jinpost | write your store here"/>
                <NewStoryComponent suggestionTags={suggestionTags} categories={categories}/>
            </div>)
        }
    }
    return (
        <UnAuthorized/>
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
