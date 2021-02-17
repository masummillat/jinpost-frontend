import React from "react";
import DefaultLayout from "../../components/layouts/default";
import BlogItemCard from "../../components/category/BlogItemCard";
import Head from "../../components/head";

const SingleCategory = ({category}: any) => {
    const blogs = category.blogs;

    return(
        <div>
            <Head
            title="Jinpost"/>
            <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <div className="category-post">
                            {
                                blogs.map((blog: { id: number, blog: any })=><BlogItemCard blog={blog} key={blog.id}/>)
                            }

                    </div>
                </div>
                <div className="offset-lg-1 col-lg-4">
                    <div className="category-popular-post">
                        <h5>Popular in Category</h5>
                        <ul>
                            {
                                blogs.map((blog: any)=> (
                                    <li key={blog.id}>
                                        <a className="text-primary" href={`/blogs/${blog.id}`}>{blog.title}</a>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

SingleCategory.Layout = DefaultLayout;

export async function getServerSideProps(context: any) {
    const { query } = context;
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories/${query.slug}`)
    const category = await res.json()
    return {
        props: {
            category: category ,

        },
    }
}
export default SingleCategory;
