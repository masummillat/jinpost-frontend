import React from "react";
import DefaultLayout from "../../components/layouts/default";
import BlogItemCard from "../../components/category/BlogItemCard";
import Head from "../../components/head";

const Category = ({ blogs }: any) => {

    return (
        <div>
            <Head
                title="Jinpost" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="category-post">
                            {
                                blogs.map((blog: { id: number, blog: any }) => <BlogItemCard blog={blog} key={blog.id} />)
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
Category.Layout = DefaultLayout;
export async function getServerSideProps(context: any) {
    //TODO WE WILL GET BLOGS DATA FOR ALL CATEGORY INSTEAD OF BLOGS ONLY
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/blogs`)
    const data = await res.json()
    return {
        props: {
            blogs: data.items,

        },
    }
}

export default Category
