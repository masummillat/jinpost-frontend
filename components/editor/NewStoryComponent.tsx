import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {useFormik} from 'formik';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from "react-select";
import Head from "../head";
import TinyEditor from "./TinyEditor";
import * as Yup from "yup";
import {ToasterError, ToasterSuccess} from "../../utils/statusMessage";
import httpClient from "../../utils/api";
import {UserDto} from "../../types";

interface Icategories {
    id: number;
    name: string;
}
interface INewStoryComponent {
    categories: Icategories[];
    blog?: any;
    isEdit?: boolean;

}
const storySchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Title should be more than 2 characters')
        .max(200, 'Title should be less than 200 characters')
        .required('Title is required'),
    categories: Yup.array().required('Category is required'),
    description: Yup.string()
    .min(2, 'Title should be more than 2 characters')
    .max(300, 'Title should be less than 300 characters')
    ,
    // featuredImg: Yup.string().required('Feature image is required'),
    body: Yup.string().required('Blog content is required'),
    publishedDate: Yup.date().required('required'),
});
// @ts-ignore
const NewStoryComponent: React.FC<INewStoryComponent> = ({isEdit, blog, categories=[]}) => {
    const [image, setImage] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    useEffect(() => {
        setCategoryOptions([])
        setCategoryOptions(categories.map((cat: { id: number; name: string; }) => ({
            id: cat.id,
            label: cat.name,
            value: cat.id,
        })))
    }, [categories])


    const updateBlog = (values: any) => {
        httpClient.put(`${process.env.BACKEND_BASE_URL}/blogs/${blog.id}`, {id: blog.id, ...values})
            .then(r=>{
                console.log(r)
                ToasterSuccess('Successfully updated')
            })
            .catch(er=>{
                ToasterError(er.response.data.message);
                console.log(er)
            })

    }
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            categories: [],
            featuredImg: '',
            body: '',
            // tags: [],
            publishedDate: new Date()
        },
        validationSchema: storySchema,
        onSubmit: async values => {
            let imageFormData;
            console.log(values)
            if (isEdit){
                //TODO CHECK IF IT HAS NEW IMAGE TO UPLOAD
                if (image){
                    imageFormData = new FormData();
                    // @ts-ignore
                    await imageFormData.append('file', image)
                    httpClient.post(`${process.env.BACKEND_BASE_URL}/blogs/image/upload`, imageFormData)
                        .then((res)=>{
                            console.log(res)
                            // @ts-ignore
                            formik.setFieldValue('featuredImg', res.data.url)
                            updateBlog({...values, featuredImg: res.data.url});
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                }else{
                    updateBlog(values);
                }
            }else {
                imageFormData = new FormData();
                // @ts-ignore
                await imageFormData.append('file', image)
                // await fetch(`${process.env.BACKEND_BASE_URL}/image/upload`, {
                //     headers: {
                //         mode: 'no-cors',
                //         'Accept': 'application/json',
                //         // 'Content-Type': 'multipart/form-data',
                //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                //     },
                //     body: imageFormData,
                //     method: 'post',
                // }).then(res=>res.json())
                //     .then( result=>{
                        formik.setFieldValue('featuredImg', null)
                        fetch(`${process.env.BACKEND_BASE_URL}/blogs`, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                            },
                            method: 'post',
                            body: JSON.stringify({...values, featuredImg: null}),
                        }).then(res=>res.json())
                            .then(r=>{
                                console.log(r)
                                ToasterSuccess('successfully created');
                                formik.resetForm();
                            })
                            .catch(err=>{
                                console.log(err)
                                ToasterError(err.response.data.message);
                            })
                    // })
                    // .catch(err=>{
                    //     console.log(err)
                    // })
            }



        },
    });

    useEffect(()=>{
        if(blog){
            console.log()
            formik.setFieldValue('title', blog.title)
            formik.setFieldValue('description', blog.description)
            formik.setFieldValue('body', blog.body)
            formik.setFieldValue('categories', blog.categories.map((cat: { id: any; name: any; })=>{
                return{
                    id: cat.id,
                    label: cat.name,
                    value: cat.id
                }
            }))
            formik.setFieldValue('featuredImg', blog.featuredImg)

        }
    },[isEdit, blog])
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

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const imageInputRef = useRef(null);
    const handleProfileImg = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // @ts-ignore
        let file = event.currentTarget.files[0];
        // @ts-ignore
        setImage(file);
        let reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result)
            // @ts-ignore
            setImagePreviewUrl(reader.result)
            // @ts-ignore

        }

        reader.readAsDataURL(file)

    }
    const {tags, suggestions} = tagsState;
    // @ts-ignore
    return (
        <div>
            <Head title={blog && blog.title} />
            <main className="page-content">
                <div className="container-fluid">
                    <form onSubmit={formik.handleSubmit} className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>{isEdit ? 'Update blog': 'Add New Post'}</h1>
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
                                        <p className="small text-danger">{formik.touched.title && formik.errors && formik.errors.title}</p>
                                        {/* <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
                                        </ul> */}
                                        <div>
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control post-title"
                                            placeholder="Enter description here"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        />
                                        <p className="small text-danger">{formik.touched.description && formik.errors && formik.errors.description}</p>
                                        </div>
                                        <div className="tab-content" id="pills-tabContent">
                                            <TinyEditor formik={formik}/>
                                            <p className="small text-danger">{formik.touched.title && formik.errors.body}</p>
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
                                                value={formik.values.categories}
                                                options={categoryOptions}
                                                onChange={(categories) => {
                                                    formik.setFieldValue('categories', categories && categories.map((cat: { id: number; label: string; }) => {
                                                        return {
                                                            id: cat.id,
                                                            name: cat.label,
                                                            value: cat.id,
                                                            label: cat.label
                                                        }
                                                    }))
                                                }}
                                            />
                                            <p className="small text-danger">{formik.errors.categories}</p>
                                        </div>
                                        <div className="featured-img">
                                            <p>Featured Image</p>
                                            <div style={{width: '100%', minHeight: 250, border: '1px solid black'}} onClick={
                                                ()=>{
                                                    // @ts-ignore
                                                    imageInputRef.current.click()}
                                            }>
                                                {
                                                    imagePreviewUrl ? <img src={imagePreviewUrl} className="img-fluid" alt=""/> : isEdit ? <img className="img-fluid" src={formik.values.featuredImg} alt=""/> :
                                                         'Upload Image'
                                                }
                                            </div>
                                            <input
                                                style={{visibility: 'hidden'}}
                                                ref={imageInputRef}
                                                name="featuredImg"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProfileImg}
                                            />
                                            <p className="small text-danger">{image === null ? 'Featured image is required': ''}</p>
                                        </div>
                                        <div className="date">
                                            <label>Date</label>
                                            <Calendar
                                                onChange={date => {
                                                    formik.setFieldValue('date', date)
                                                }}
                                                value={formik.values.publishedDate}
                                            />
                                            <p className="small text-danger">{formik.errors.publishedDate}</p>
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
