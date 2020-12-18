import React from "react";
import DefaultLayout from "../../components/layouts/default";
import BlogItemCard from "../../components/category/BlogItemCard";

const Category = ({blogs}: any) => {

    return(
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
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
Category.Layout = DefaultLayout;
export async function getStaticProps(context: any) {
    //TODO WE WILL GET BLOGS DATA FOR ALL CATEGORY INSTEAD OF BLOGS ONLY
    const res = await fetch(`http://localhost:3000/blogs`)
    const data = await res.json()
    return {
        props: {
            blogs: data ,

        },
    }
}

export default Category
