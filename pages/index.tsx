import Link from 'next/link';
import Head from '../components/head';
import DefaultLayout from "../components/layouts/default";
import BlogCard from "../components/blogs/BlogCard";
import SampleBlogCard from "../components/blogs/SampleBlogCard";
import { createStringArray } from '../components/editor/NewStoryComponent';
import { unique } from '../utils/uniqevalue';

export function createMarkup(blogString: any) {
    return {__html: blogString};
}

interface HomeProps{
    blogsData: any;
    tagsData: any[];
}
const Home = ({blogsData, tagsData}: HomeProps) => {
    const tags = unique(createStringArray(tagsData));
    const blogs = blogsData.items;
    return (
        <div>
            <Head 
            title="Jinpost | A story telling website"/>
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
                                        <img src={blogs && blogs[0].featuredImg || '/static/img/pic.jpg'} className="card-img-top" alt="..."/>
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
                                <Link href="/registration">
                                    <a className="btn btn-white">Get Started</a>
                                </Link>
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
                            <Link href="/blogs">
                                <a className="all">All</a>
                            </Link>
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
                                {
                                    tags.map((tag, index)=>(
                                        <Link href={`${process.env.BASE_URL}/blogs?tags=${tag}`} key={index}>
                                            <a className="badge badge-pill badge-primary px-4 py-2 m-2">
                                                {tag}
                                            </a>
                                        </Link>
                                    ))
                                }
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
                                <Link href={`${process.env.BASE_URL}/blogs`}>
                                    <a className="btn btn-white">Discover now</a>
                                </Link>
                            </div>
                            <div className="tag-list">
                            <ul>
                                {
                                    tags.map((tag, index)=>(
                                        <Link href={`${process.env.BASE_URL}/blogs?tags=${tag}`} key={index}>
                                            <a className="badge badge-pill badge-primary px-4 py-2 m-2">
                                                {tag}
                                            </a>
                                        </Link>
                                    ))
                                }
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps(context: any) {
    console.log(context)
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/blogs?isPublished=true`)
    const data = await res.json()

    const tagsRes = await fetch(`${process.env.BACKEND_BASE_URL}/blogs/tags`)
    const tags = await tagsRes.json()

    if (!data) {
        return {
            notFound: true,
            blogs: [],
        }
    }

    return {
        props: {
            blogsData: data,
            tagsData: tags,
        }, // will be passed to the page component as props
    }
}

Home.Layout = DefaultLayout;
export default Home;


