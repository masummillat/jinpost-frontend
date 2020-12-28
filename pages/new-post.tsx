import React, {useEffect, useState} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {useFormik} from 'formik';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from "react-select";
import DefaultLayout from "../components/layouts/default";
import Head from "../components/head";
import TinyEditor from "../components/editor/TinyEditor";
import NewStoryComponent from "../components/editor/NewStoryComponent";

interface Icategories {
    id: number;
    name: string;
}
interface INewPostPage {
    categories: Icategories[]
}
const NewPostPage: React.FC<INewPostPage> = ({categories}) => {
    return (
        <div>
            <Head/>
           <NewStoryComponent categories={categories}/>
        </div>
    );
}

// @ts-ignore
NewPostPage.Layout = DefaultLayout;

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
            categories: data
        }, // will be passed to the page component as props
    }
}

export default NewPostPage;
