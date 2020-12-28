import React from "react";
import AuthorCard from "../components/authors/AuthorCard";
import DefaultLayout from "../components/layouts/default";

const DiscoverPage = ({authors, notFound}:{authors: any[], notFound: boolean}) => {

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="discover-topics">
                        <h2>Browse by Popular Topics</h2>
                        <ul>
                            <li><a href="#">5G</a></li>
                            <li><a href="#">AI</a></li>
                            <li><a href="#">Automobile</a></li>
                            <li><a href="#">Autonomous Driving</a></li>
                            <li><a href="#">Big Data</a></li>
                            <li><a href="#">Biotech</a></li>
                            <li><a href="#">Blockchain</a></li>
                            <li><a href="#">Cloud Computing</a></li>
                            <li><a href="#">Ecommerce</a></li>
                            <li><a href="#">Finance</a></li>
                            <li><a href="#">FinTech</a></li>
                            <li><a href="#">Internet of Things</a></li>
                            <li><a href="#">Logistics</a></li>
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
export default DiscoverPage;
