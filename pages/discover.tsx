import React from "react";
import AuthorCard from "../components/authors/AuthorCard";
import DefaultLayout from "../components/layouts/default";
import { UserDto, CategoryEntry } from "../types";
import Link from "next/link";
import Head from "../components/head";
import {unique} from "../utils/uniqevalue";
import {createStringArray} from "../components/editor/NewStoryComponent";

interface DiscoverPageProps {
    authorsData: any;
    categoriesData: any;
    tagsData: any[];
}
const DiscoverPage = ({ authorsData, categoriesData, tagsData }: DiscoverPageProps) => {
    const authors: UserDto[] = authorsData.items
    const categories: CategoryEntry[] = categoriesData.items;
    const tags = unique(createStringArray(tagsData));
    return (
        <div>
            <Head
            title="Jinpost | discover new stories"/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="discover-topics">
                            <h2>Browse by Popular Topics</h2>
                            <ul>
                                {categories.map((category, i) => (
                                    <li key={category.id}>
                                        <Link href={`/categories/${category.id}`}>
                                            <a>{category.name}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="discover-tags">
                            <h2>Discover the popular companies</h2>
                            {
                                tags.map((tag, index)=>(
                                    <Link href={`${process.env.BASE_URL}/blogs?tag=${tag}&page=1&limit=10`} key={index}>
                                        <a className="btn-tag">{tag}</a>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="offset-lg-1 col-lg-4" style={{ padding: 0 }}>
                        <div className="popular-authors">
                            <h2>Popular authors</h2>
                            {
                                (authors.length === 0) && (
                                    <h3> No Author Found</h3>
                                )
                            }
                            {
                                authors.map((author) => <AuthorCard key={author.id} author={author} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

DiscoverPage.Layout = DefaultLayout;

export async function getServerSideProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users?role=author`)
    const data = await res.json();

    const categoriesRes = await fetch(`${process.env.BACKEND_BASE_URL}/categories`)
    const categoriesData = await categoriesRes.json()

    const tagsRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/tags`)
    const tags = await tagsRes.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            authorsData: data,
            categoriesData,
            tagsData: tags,
        }, // will be passed to the page component as props
    }
}
export default DiscoverPage;
