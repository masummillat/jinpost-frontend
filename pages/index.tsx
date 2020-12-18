import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import DefaultLayout from "../components/layouts/default";
import result from "postcss/lib/result";
import BlogCard from "../components/blogs/BlogCard";

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
                                                <div dangerouslySetInnerHTML={createMarkup(blogs && blogs[0].body)}/>
                                            </div>
                                            <a href="#" className="article-preview-author">
                                                <img src="/static/img/profile.jpg"/>Sicong Long
                                            </a>
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
                    <div className="col-lg-3 col-md-4" style={{marginBottom: '16px'}}>
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4">
                        <div className="article-item">
                            <div className="card">
                                <a href="#" className="article-preview-author">
                                    <img src="/static/img/profile.jpg"/>Sicong Long
                                </a>
                                <img src="/static/img/pic.jpg" className="card-img-top" alt="..."/>
                                <small>11 Nov, 2020</small>
                                <div className="card-body">
                                    <p className="article-preview-title"><a href="#">The standard chunk of Lorem Ipsum
                                        used since interested</a></p>
                                    <p className="article-preview-desc">It is a long established fact that a reader will
                                        be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
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


