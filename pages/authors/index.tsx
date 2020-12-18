import React from "react";
import DefaultLayout from "../../components/layouts/default";
import AuthorCard from "../../components/authors/AuthorCard";

const Index = ({authors, notFound}:{authors: any[], notFound: boolean}) => {
    console.log(authors)
    return(
        <div className="container">
            <div className="row">
                {/* TODO SHOW AUTHORS HERE*/}
                <div className="col-lg-4">
                    {
                        authors.map((author)=><AuthorCard key={author.id} author={author}/>)
                    }
                </div>
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
            authors: data
        }, // will be passed to the page component as props
    }
}
export default Index
