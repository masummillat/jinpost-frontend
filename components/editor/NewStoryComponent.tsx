import React, {useEffect, useState} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {useFormik} from 'formik';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from "react-select";
import Head from "../head";
import TinyEditor from "./TinyEditor";

interface Icategories {
    id: number;
    name: string;
}
interface INewStoryComponent {
    categories: Icategories[]

}
// @ts-ignore
const NewStoryComponent: React.FC<INewStoryComponent> = ({categories=[]}) => {
    const [image, setImage] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    console.log(categories)
    useEffect(() => {
        setCategoryOptions([])
        setCategoryOptions(categories.map((cat: { id: number; name: string; }) => ({
            id: cat.id,
            label: cat.name,
            value: cat.id,
        })))
    }, [categories])
    const formik = useFormik({
        initialValues: {
            title: '',
            categories: [],
            featuredImg: null,
            body: '',
            tags: [],
            publishedDate: new Date()
        },
        onSubmit: async values => {
            console.log(values)
            var imageFormData = new FormData();
            // @ts-ignore
            await imageFormData.append('file', image)
            console.log(imageFormData.get('file'))
            await fetch('http://localhost:3000/blogs/image/upload', {
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: imageFormData,
                method: 'post',
            }).then(res=>res.json())
                .then( result=>{
                    formik.setFieldValue('featuredImg', result.url)
                    fetch('http://localhost:3000/blogs', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        method: 'post',
                        body: JSON.stringify({...values, featuredImg: result.url}),
                    }).then(res=>res.json())
                        .then(r=>{
                            console.log(r)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                })
                .catch(err=>{
                    console.log(err)
                })


        },
    });
    const [tagsState, setTagState] = useState({
        tags: [
            {id: "Thailand", text: "Thailand"},
            {id: "India", text: "India"}
        ],
        suggestions: [
            {id: 'USA', text: 'USA'},
            {id: 'Germany', text: 'Germany'},
            {id: 'Austria', text: 'Austria'},
            {id: 'Costa Rica', text: 'Costa Rica'},
            {id: 'Sri Lanka', text: 'Sri Lanka'},
            {id: 'Thailand', text: 'Thailand'}
        ]
    });
    const KeyCodes = {
        comma: 188,
        enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i: number) => {
        setTagState(prevState => {
            return {
                ...prevState,
                tags: prevState.tags.filter((tag, index) => index !== i)
            }
        })
    }

    const handleAddition = (tag: { id: string; text: string; }) => {
        setTagState(prevState => {
            return {
                ...prevState,
                tags: [...prevState.tags, tag],
            }
        })
    }
    useEffect(() => {
        formik.setFieldValue('tags', tagsState.tags.map(tag => tag.text));
    }, [tagsState.tags])

    const handleDrag = (tag: any, currPos: number, newPos: number) => {
        const tags = [...tagsState.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTagState(prevState => {
            return {
                ...prevState,
                tags: newTags,
            }
        });
    }

    const {tags, suggestions} = tagsState;
    return (
        <div>
            <main className="page-content">
                <div className="container-fluid">
                    <form onSubmit={formik.handleSubmit} className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Add New Post</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="new-post">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control post-title"
                                            placeholder="Enter title here"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                        />
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
                                            <TinyEditor formik={formik}/>
                                            <div className="tab-pane" id="pills-original" role="tabpanel"
                                                 aria-labelledby="pills-original-tab">
                                                    <textarea className="form-control note"
                                                              placeholder="Note"/>
                                            </div>
                                            <div className="tab-pane" id="pills-note" role="tabpanel"
                                                 aria-labelledby="pills-note-tab">
                                                    <textarea className="form-control note"
                                                              placeholder="Note"/>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="new-post-sidebar">
                                        <div className="category-list">
                                            <label>Category</label>
                                            <Select
                                                id="categorySelect"
                                                isMulti
                                                options={categoryOptions}
                                                onChange={(categories) => {
                                                    formik.setFieldValue('categories', categories && categories.map((cat: { id: number; label: string; }) => {
                                                        return {
                                                            id: cat.id,
                                                            // name: cat.label,
                                                        }
                                                    }))
                                                }}
                                            />
                                        </div>
                                        <div className="featured-img">
                                            <p>Featured Image</p>
                                            <input
                                                name="featuredImg"
                                                type="file"
                                                accept="image/*"
                                                onChange={event => {
                                                    // @ts-ignore
                                                    setImage(event.currentTarget.files[0]);
                                                    // imageFormData.append('file', event.currentTarget.files[0]);

                                                }}
                                            />
                                        </div>
                                        <div className="date">
                                            <label>Date</label>
                                            <Calendar
                                                onChange={date => {
                                                    formik.setFieldValue('date', date)
                                                }}
                                                value={formik.values.publishedDate}
                                            />
                                        </div>
                                        <div className="tags">
                                            <label>Tags</label>

                                            <ReactTags
                                                tags={tags}
                                                suggestions={suggestions}
                                                handleDelete={handleDelete}
                                                handleAddition={handleAddition}
                                                handleDrag={handleDrag}
                                                delimiters={delimiters}
                                                allowUnique
                                                classNames={{
                                                    tags: 'ReactTags__tags',
                                                    tagInput: 'ReactTags__tagInput',
                                                    tagInputField: 'ReactTags__tagInputField',
                                                    selected: 'ReactTags__selected',
                                                    tag: 'ReactTags__tag',
                                                    remove: 'ReactTags__remove',
                                                    suggestions: 'ReactTags__suggestions',
                                                    activeSuggestion: 'ReactTags__activeSuggestion'
                                                }}
                                            />
                                        </div>
                                        <button className="btn btn-main">Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default NewStoryComponent;
