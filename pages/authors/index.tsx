import React from "react";
import DefaultLayout from "../../components/layouts/default";
import AuthorCard from "../../components/authors/AuthorCard";
import { UserDto } from "../../types";
import Head from "../../components/head";

interface AuthorsProps {
    authorsData: any;
    Layout: any;
}
const Index = ({authorsData}: AuthorsProps) => {
    const authors: UserDto[] = authorsData.items;
    console.log(authors)
    return(
        <div>
            <Head title="Jinpost | authors"/>
            <div className="container">
            <div className="row">
                {authors.length === 0 && (
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <h1>No Author Found</h1>
                            </div>
                        </div>                        
                    </div>      
                )}
                
                    {
                        authors.map((author)=>  (
                            <div key={author.id} className="col-lg-4 col-md-4 col-sm-6">
                                <AuthorCard  author={author}/>
                            </div>
                            ))
                    }
            
            </div>
        </div>
        </div>
    );
}

Index.Layout = DefaultLayout;
export async function getStaticProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users?role=author`)
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            authorsData: data
        }, // will be passed to the page component as props
    }
}
export default Index
