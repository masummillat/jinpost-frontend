import React from "react";
import AuthorCard from "../components/authors/AuthorCard";
import DefaultLayout from "../components/layouts/default";
import { UserDto, CategoryEntry } from "../types";
import Link from "next/link";

interface DiscoverPageProps {
    authorsData: any;
    categoriesData: any;
}
const DiscoverPage = ({authorsData, categoriesData}: DiscoverPageProps) => {
    const authors: UserDto[] = authorsData.items
    const categories: CategoryEntry[] = categoriesData.items;
    console.log(categories)
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="discover-topics">
                        <h2>Browse by Popular Topics</h2>
                        <ul>
                            {categories.map((category,i)=>(
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
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                        <a href="#" className="btn-tag">Lorem Ipsum</a>
                    </div>
                </div>
                <div className="offset-lg-1 col-lg-4" style={{padding: 0}}>
                    <div className="popular-authors">
                        <h2>Popular authors</h2>
                            {
                                authors.map((author)=><AuthorCard key={author.id} author={author}/>)
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

DiscoverPage.Layout = DefaultLayout;

export async function getStaticProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users`)
    const data = await res.json();

    const categoriesRes = await fetch(`${process.env.BACKEND_BASE_URL}/categories`)
    const categoriesData = await categoriesRes.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            authorsData: data,
            categoriesData
        }, // will be passed to the page component as props
    }
}
export default DiscoverPage;
