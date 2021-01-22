import React from "react";
import DefaultLayout from "../../components/layouts/default";
import AuthorCard from "../../components/authors/AuthorCard";
import { UserDto } from "../../types";

interface AuthorsProps {
    authorsData: any;
    Layout: any;
}
const Index = ({authorsData}: AuthorsProps) => {
    const authors: UserDto[] = authorsData.items;
    console.log(authors)
    return(
        <div className="container">
            <div className="row">
                {/* TODO SHOW AUTHORS HERE*/}
                
                    {
                        authors.map((author)=>  (
                            <div key={author.id} className="col-lg-4 col-md-4 col-sm-6">
                                <AuthorCard  author={author}/>
                            </div>
                            ))
                    }
            
            </div>
        </div>
    );
}

Index.Layout = DefaultLayout;
export async function getStaticProps(context: any) {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users`)
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
