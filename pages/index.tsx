import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import DefaultLayout from "../components/layouts/default";
import result from "postcss/lib/result";
import BlogCard from "../components/blogs/BlogCard";
import SampleBlogCard from "../components/blogs/SampleBlogCard";

export function createMarkup(blogString: any) {
    return {__html: blogString};
}

const Home = ({blogs}: any) => {
    console.log(blogs)
    return (
        <div>
            <Head title="Home"/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h1 className="pt-2">Popular</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="article-preview-left">
                            {
                                blogs.length > 0 && (
                                    <div className="card">
                                        <img src={blogs && blogs[0].featuredImg} className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <Link href={`/blogs/${blogs && blogs[0].id}`}>
                                                <a className="article-preview-title">{blogs && blogs[0].title}</a>
                                            </Link>
                                            <div className="article-preview-desc">
                                                <p className="text-muted text-nowrap ">{blogs && blogs[0].description}</p>
                                            </div>
                                            <Link href={`/${blogs && blogs[0].author.domain}`} >
                                            <a  className="article-preview-author">
                                                <img src="/static/img/profile.jpg"/>{blogs[0].author.name}
                                            </a>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            {blogs && blogs.map((blog: { id: string | number | null | undefined; }) => <BlogCard
                                blog={blog} key={blog.id}/>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="join-us">
                            <div>
                                <h1>Join us</h1>
                                <p>Stay tuned with the latest developments of companies and industries in China.</p>
                                <button className="btn btn-white">Get Started</button>
                            </div>
                            <div className="join-us-bg">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h1>Articles</h1>
                            <a href="#" className="all">All</a>
                        </div>
                    </div>
                    {blogs.map((blog: any, i: any)=><SampleBlogCard key={i} blog={blog}/>)}
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title mt-5">
                            <h1>Popular Topics</h1>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="popular-topics">
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="discover-tag">
                            <div className="left">
                                <p>China Business intelligence</p>
                                <h1>Discover the popular companies or individuals on our platform</h1>
                                <a href="#" className="btn btn-white">Discover now</a>
                            </div>
                            <div className="tag-list">
                                <a href="#" className="btn-tag">Lorem Ipsum</a>
                                <a href="#" className="btn-tag">Ipsum</a>
                                <a href="#" className="btn-tag">Lorem Ipsum</a>
                                <a href="#" className="btn-tag">Lorem Ipsum</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export async function getStaticProps(context: any) {

    const res = await fetch(`${process.env.BACKEND_BASE_URL}/blogs`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
            blogs: [],
        }
    }

    return {
        props: {
            blogs: data
        }, // will be passed to the page component as props
    }
}

Home.Layout = DefaultLayout;
export default Home;


