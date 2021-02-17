import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {useFormik} from 'formik';
import Datetime from 'react-datetime';
import {RiDraftLine} from 'react-icons/ri'
import Select from "react-select";
import Head from "../head";
import TinyEditor from "./TinyEditor";
import * as Yup from "yup";
import {ToasterError, ToasterSuccess} from "../../utils/statusMessage";
import httpClient from "../../utils/api";
import {unique} from '../../utils/uniqevalue';
import {Tabs, Tab} from 'react-bootstrap';
import ChineseTinyEditor from './ChinesTinyEditor';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

interface ITags {
    id: string;
    text: string;
}

interface ITagState {
    tags: ITags[];
    suggestions: ITags[];
}

interface Icategories {
    id: number;
    name: string;
}

interface INewStoryComponent {
    categories: Icategories[];
    blog?: any;
    isEdit?: boolean;
    suggestionTags?: string[];

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

export const createStringArray = (values: any[]) => {
    let result: string[] = [];
    values.forEach((value: { tags: string[]; }) => {
        value.tags.map((tag: string) => {
            result.push(tag)
        })
    })
    return result;
}

const createTags = (values: string[]): ITags[] => {
    return values.map((tag: string) => ({id: tag, text: tag}))
}
const NewStoryComponent: React.FC<INewStoryComponent> = ({isEdit = false, blog, categories = [], suggestionTags = []}) => {
    const [image, setImage] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [tags, setTags] = useState<ITags[]>([])
    const [tagSuggestions, setTagSuggestions] = useState<ITags[]>(createTags(unique(createStringArray(suggestionTags))));
    let imageFormData;

    const formik = useFormik({
        initialValues: {
            title: '',
            chineseTitle: '',
            description: '',
            chineseDescription: '',
            categories: [],
            featuredImg: '',
            body: '',
            chineseBody: '',
            // tags: [],
            publishedDate: isEdit? blog.publishedDate : new Date(),
        },
        validationSchema: storySchema,
        validateOnChange: true,
        onSubmit: async values => handleDraft(values),
    });

    useEffect(() => {
        setCategoryOptions([])
        setCategoryOptions(categories.map((cat: { id: number; name: string; }) => ({
            id: cat.id,
            label: cat.name,
            value: cat.id,
        })))
    }, [categories])

    useEffect(() => {
        setTags(isEdit ? blog && createTags(blog.tags) : []);
        setTagSuggestions(createTags(unique(createStringArray(suggestionTags))));
    }, [suggestionTags, isEdit]);


    useEffect(() => {
        if (blog) {
            formik.resetForm();
            formik.setFieldValue('title', blog.title)
            formik.setFieldValue('chineseTitle', blog.chineseTitle)
            formik.setFieldValue('description', blog.description)
            formik.setFieldValue('chineseDescription', blog.chineseDescription)
            formik.setFieldValue('body', blog.body)
            formik.setFieldValue('chineseBod', blog.chineseBod)
            formik.setFieldValue('categories', blog.categories.map((cat: { id: any; name: any; }) => {
                return {
                    id: cat.id,
                    label: cat.name,
                    value: cat.id
                }
            }))
            formik.setFieldValue('featuredImg', blog.featuredImg)

        }
    }, [isEdit, blog]);


    const updateBlog = useCallback((values: any) => {
        httpClient.put(`${process.env.BACKEND_BASE_URL}/blogs/${blog.id}`, {id: blog.id, ...values})
            .then(r => {
                ToasterSuccess('Successfully updated')
            })
            .catch(er => {
                ToasterError(er.response.data.message);
            })

    },[]);


    const handleDraft = useCallback(async (values: any) => {

        if (isEdit) {
            if (image) {
                imageFormData = new FormData();
                // @ts-ignore
                await imageFormData.append('file', image);
                httpClient.post(`${process.env.BACKEND_BASE_URL}/blogs/image/upload`, imageFormData)
                    .then((res) => {
                        console.log(res)
                        // @ts-ignore
                        formik.setFieldValue('featuredImg', res.data.url)
                        updateBlog({...values, featuredImg: res.data.url, isPublished: false});
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                updateBlog({...values, isPublished: false});
            }
        } else {
            handleSave({...values, isPublished: false});
        }
    },[]);

    const handlePublish = useCallback(async () => {
        console.log(formik.errors)
        // if (Object.keys(formik.errors).length === 0){
        if (isEdit) {
            console.log('updating ')
            // Update  Blog with publish
            // check if image  change. if image change then upload image and update data
            if (image) {
                imageFormData = new FormData();
                // @ts-ignore
                await imageFormData.append('file', image)
                httpClient.post(`${process.env.BACKEND_BASE_URL}/blogs/image/upload`, imageFormData)
                    .then((res) => {
                        // @ts-ignore
                        formik.setFieldValue('featuredImg', res.data.Location)
                        updateBlog({...formik.values, featuredImg: res.data.Location,});
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                updateBlog({...formik.values, isPublished: true});
            }

        } else {
            // SaveBlog with publish

            // upload image  then save data
            await handleSave({...formik.values, isPublished: true})

        }

        // }
    },[]);


    const saveBlog = useCallback(async (values: any) => {
        console.log(values)
        httpClient.post(`${process.env.BACKEND_BASE_URL}/blogs`, values)
            .then(r => {
                ToasterSuccess('successfully created');
                formik.resetForm();
            })
            .catch(err => {
                ToasterError(err.response.data.message);
            });
    },[]);

    const handleSave = useCallback(async (values: any) => {

            if (image) {
                //    saveblogg with image location
                imageFormData = new FormData();
                // @ts-ignore
                await imageFormData.append('file', image)
                await httpClient.post(`${process.env.BACKEND_BASE_URL}/blogs/image/upload`, imageFormData)
                    .then(async result => {
                        // @ts-ignore
                        await formik.setFieldValue('featuredImg', result.data.Location);

                        await saveBlog({...values, featuredImg: result.data.Location});
                    })
            } else {
                //save blog without image location
                saveBlog({...values, featuredImg: null});
            }
        },[]);

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = useCallback((i: number) => {
        setTags(tags.filter((tag, index) => index !== i));
    },[]);

    const handleAddition = useCallback((tag: { id: string; text: string; }) => {
        setTags([...tags, tag]);
    },[]);

    useEffect(() => {
        formik.setFieldValue('tags', tags.map(tag => tag.text));
    }, [tags]);

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const imageInputRef = useRef(null);


    const handleProfileImg = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // @ts-ignore
        let file = event.currentTarget.files[0];
        // @ts-ignore
        setImage(file);
        let reader = new FileReader();
        reader.onloadend = () => {
            // @ts-ignore
            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);

    },[]);

    return (
        <div>
            <Head title={blog && blog.title}/>
            <main className="page-content">
                <div className="container-fluid">
                    <form onSubmit={formik.handleSubmit} className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>{isEdit ? 'Update blog' : 'Add New Post'}</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">

                                    <Tabs defaultActiveKey="english" id="uncontrolled-tab-example">
                                        <Tab eventKey="english" title="English">
                                            <div className="new-post p-3">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="form-control post-title"
                                                    placeholder="Enter title here"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.title}
                                                />
                                                <p className="small text-danger">{formik.touched.title && formik.errors && formik.errors.title}</p>
                                                <div>
                                                <textarea
                                                    name="description"
                                                    className="form-control post-title"
                                                    placeholder="Enter summary here"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.description}
                                                />
                                                    <p className="small text-danger">{formik.touched.description && formik.errors && formik.errors.description}</p>
                                                </div>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <TinyEditor formik={formik}/>
                                                    <p className="small text-danger">{formik.touched.title && formik.errors.body}</p>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="chinese" title="Chinese">
                                            <div className="new-post p-3">
                                                <input
                                                    type="text"
                                                    name="chineseTitle"
                                                    className="form-control post-title"
                                                    placeholder="在这里输入标题"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.chineseTitle}
                                                />
                                                <p className="small text-danger">{formik.touched.chineseTitle && formik.errors && formik.errors.chineseTitle}</p>
                                                <div>
                                                <textarea
                                                    name="chineseDescription"
                                                    className="form-control post-title"
                                                    placeholder="在此处输入摘要"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.chineseDescription}
                                                />
                                                    <p className="small text-danger">{formik.touched.chineseDescription && formik.errors && formik.errors.chineseDescription}</p>
                                                </div>
                                                <div className="tab-" id="tabContent">
                                                    <ChineseTinyEditor formik={formik}/>
                                                    <p className="small text-danger">{formik.touched.chineseTitle && formik.errors.chineseBody}</p>
                                                </div>


                                            </div>
                                        </Tab>

                                    </Tabs>

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
                                        <div className="tags">
                                            <label>Tags</label>

                                            <ReactTags
                                                tags={tags}
                                                suggestions={tagSuggestions}
                                                handleDelete={handleDelete}
                                                handleAddition={handleAddition}
                                                // handleDrag={handleDrag}
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
                                        <div className="featured-img">
                                            <p>Featured Image</p>
                                            <div style={{width: '100%', minHeight: 250, border: '1px solid black'}}
                                                 onClick={
                                                     () => {
                                                         // @ts-ignore
                                                         imageInputRef.current.click()
                                                     }
                                                 }>
                                                {
                                                    imagePreviewUrl ? <img src={imagePreviewUrl} className="img-fluid"
                                                                           alt=""/> : isEdit ?
                                                        <img className="img-fluid" src={formik.values.featuredImg}
                                                             alt=""/> :
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
                                        </div>
                                        <div className="date">
                                            <label>Date</label>
                                            <Datetime onChange={date => {
                                                console.log(date)
                                                formik.setFieldValue('publishedDate', new Date(moment(date).format('YYYY-MM-DDTHH:mm:ss')))
                                                }}
                                                      // value={new Date(formik.values.publishedDate)}
                                                initialValue={new Date(formik.values.publishedDate)}
                                                  />
                                            <p className="small text-danger">{formik.errors.publishedDate}</p>
                                        </div>

                                        <div className="d-flex flex-column">
                                            <button onClick={handlePublish} className="btn btn-primary"
                                                    type="button">Publish
                                            </button>
                                            <br/>
                                            <button
                                                type="submit"
                                                className="btn  btn-outline-info">
                                                <RiDraftLine className="mr-2"/>
                                                {isEdit ? 'Edit Draft' : 'Save Draft'}
                                            </button>
                                        </div>
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

export default React.memo(NewStoryComponent);
