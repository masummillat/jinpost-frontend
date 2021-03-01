import React from 'react';
import DefaultLayout from "../components/layouts/default";
import Head from "../components/head";
import BlogItemCard from "../components/category/BlogItemCard";
import Link from "next/link";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {useRouter} from "next/router";

const SearchPage: React.FC<any> = ({blogsData}) => {
    console.log(blogsData)
    const router = useRouter();
    const blogs = blogsData.items
    return(
        <div>
            <Head title="Jinpost"/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mx-auto">
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
                                        href={`/search?${router.query.q ? `q=${router.query.q}&`: ''}page=${router.query.page && Number(router.query.page) - 1 || 1}&limit=${router.query.limit || 10}`}>
                                        <a className="mr-5 p-4"> <GrChapterPrevious size={25} /></a>
                                    </Link>
                                    <Link
                                        href={`/search?${router.query.q ? `q=${router.query.q}&`: ''}page=${router.query.page && Number(router.query.page) + 1 || 1}&limit=${router.query.limit || 10}`}>
                                        <a className="p-4"> <GrChapterNext size={25}/></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

// @ts-ignore
SearchPage.Layout = DefaultLayout;

export async function getServerSideProps(context: any) {
    const {query} = context;
    const {page = 1, limit = 10, tag = '', q} = query;
    const blogsDatadRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs?isPublished=true&q=${q}&page=${page}&limit=${limit}`);
    const blogsData = await blogsDatadRes.json()

    return {
        props: {
            blogsData: blogsData,
        }, // will be passed to the page component as props
    }
}
export default SearchPage;
