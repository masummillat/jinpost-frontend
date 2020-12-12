import React from 'react';
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";


const NewPost = () => {

    return (
        <div>
            <Head/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Add New Post</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="new-post">
                                        <input type="text" name="post-title" className="form-control post-title"
                                               placeholder="Enter title here"/>
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="pills-content-tab"
                                                   data-bs-toggle="pill" href="#pills-content" role="tab"
                                                   aria-controls="pills-content" aria-selected="true">Content</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pills-original-tab"
                                                   data-bs-toggle="pill" href="#pills-original" role="tab"
                                                   aria-controls="pills-original" aria-selected="false">Original</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="pills-note-tab" data-bs-toggle="pill"
                                                   href="#pills-note" role="tab" aria-controls="pills-note"
                                                   aria-selected="false">Note</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane show active" id="pills-content" role="tabpanel"
                                                 aria-labelledby="pills-content-tab">
                                                <textarea id="new-post" className="form-control"></textarea>
                                            </div>
                                            <div className="tab-pane" id="pills-original" role="tabpanel"
                                                 aria-labelledby="pills-original-tab">
                                                    <textarea className="form-control note"
                                                              placeholder="Note"></textarea>
                                            </div>
                                            <div className="tab-pane" id="pills-note" role="tabpanel"
                                                 aria-labelledby="pills-note-tab">
                                                    <textarea className="form-control note"
                                                              placeholder="Note"></textarea>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="new-post-sidebar">
                                        <div className="category-list">
                                            <label>Category</label>
                                            <select className="category-select form-control" multiple>
                                                <option></option>
                                                <option value="international">International</option>
                                                <option value="local">Local</option>
                                                <option value="china-trade">China Trade</option>
                                            </select>
                                        </div>
                                        <div className="featured-img">
                                            <p>Featured Image</p>
                                        </div>
                                        <div className="date">
                                            <label>Date</label>
                                            <div className="input-group date" id="datetimepicker-demo"
                                                 data-target-input="nearest">
                                                <input type="text" className="form-control datetimepicker-input"
                                                       data-target="#datetimepicker-demo"/>
                                                <div className="input-group-append" data-target="#datetimepicker-demo"
                                                     data-toggle="datetimepicker">
                                                    <div className="input-group-text">
                                                        <i className="far fa-calendar-alt"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tags">
                                            <label>Tags</label>
                                            <select multiple data-role="tagsinput" className="term-input form-control">
                                                <option value="jQuery">jQuery</option>
                                                <option value="Angular">Angular</option>
                                                <option value="React">React</option>
                                                <option value="Vue">Vue</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-main">Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

NewPost.Layout = AdminLayout;
export default NewPost;
