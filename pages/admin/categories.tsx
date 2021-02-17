import React, {useEffect, useState} from 'react';
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";
import {useFormik} from "formik";
import httpClient from "../../utils/api";
import {CategoryEntry} from "../../types";
import { Modal} from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {ToasterError, ToasterSuccess} from "../../utils/statusMessage";
import Link from "next/link";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {useRouter} from "next/router";

interface ICategoriesProps {
    categories: CategoryEntry[]
}
const Categories = ({categories}: ICategoriesProps) =>{
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [category, setCategory] = useState<CategoryEntry | null>(null);
    const [categoryState, setCategoryState] = useState<CategoryEntry[]>([]);
    const handleClose = () => setShow(false);

    const handleDelete = (id: number | undefined) =>{
       if(id){
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure deleting this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        httpClient.delete(`/categories/${id}`)
                        .then(res=>{
                           ToasterSuccess('Successfully deleted');
                            getCategories();
                        })
                        .catch(err=>{
                            ToasterError(err.response.statusText);
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

       }
    }
    useEffect(()=>{
        setCategoryState(categories)
    },[categories]);


    const formik = useFormik({
        initialValues: {
            name:'',
        },
        onSubmit: (values: any) => {
            console.log(JSON.stringify(values, null, 2));
            httpClient.post('/categories',values).then((res)=>{
                console.log(res);
                ToasterSuccess('Successfully created');
                getCategories();
                formik.setFieldValue('name', '');
            }).catch(err=>{
                console.log(err)
                ToasterError(err.response.statusText);
                formik.setFieldValue('name', '');
            })
        },
    });
    const categoryUpdateForm = useFormik({
        initialValues: {
            name:'',
        },
        onSubmit: (values: any) => {
            console.log(JSON.stringify(values, null, 2));
          if (category){
              httpClient.put(`/categories/${category.id}`,values).then((res)=>{
                  ToasterSuccess('Successfully updated');
                  getCategories();
              }).catch(err=>{
                  console.log(err)
                  ToasterError(err.response.statusText);
              })
              handleClose();
          }
        },
    });

    const getCategories = ()=>{
        httpClient.get('/categories')
            .then(res=>{
                setCategoryState(res.data.items);
            })
            .catch(err=>{
                ToasterError(err.response.statusText);
            })
    }

    return(
        <div>
            <Head title="Jinpost Admin | categories"/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Categories</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-12  ">
                                            <div className="d-flex float-right">
                                                <Link
                                                    href={`/admin/categories?page=${router.query.page && Number(router.query.page) - 1 || 1}&limit=${router.query.limit || 10}`}>
                                                    <a className="mr-5 p-4"> <GrChapterPrevious size={25} /></a>
                                                </Link>
                                                <Link
                                                    href={`/admin/categories?page=${router.query.page && Number(router.query.page) + 1 || 1}&limit=${router.query.limit || 10}`}>
                                                    <a className="p-4"> <GrChapterNext size={25}/></a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="category-list">
                                        <table id="category-list" className="table table-striped table-bordered"
                                               style={{width:'100%'}}>
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                categoryState.map((category: CategoryEntry)=>(
                                                    <tr key={category.id}>
                                                        <td>{category.name}</td>
                                                        <td className="d-flex justify-content-around">
                                                            <i onClick={()=>{
                                                                setCategory(category);
                                                                setShow(true)
                                                                categoryUpdateForm.setFieldValue('name',category.name)
                                                            }} style={{cursor: 'pointer'}} className="far fa-edit"/>
                                                            <i onClick={()=>{
                                                                handleDelete(category.id)
                                                            }}
                                                               className="far fa-trash-alt"
                                                               style={{cursor: 'pointer'}}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="new-category">
                                        <h6>Create New Category</h6>
                                        <form onSubmit={formik.handleSubmit}>
                                            <label className="mt-2">Name</label>
                                            <input
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Category"
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                            />
                                                <button type="submit" className="btn btn-main mt-3 float-right">save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={categoryUpdateForm.handleSubmit}>
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Category"
                            onChange={categoryUpdateForm.handleChange}
                            value={categoryUpdateForm.values.name}
                        />
                            <button type="submit" className="btn btn-main mt-2 float-right">Save</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

// @ts-ignore
Categories.Layout = AdminLayout;
export async function getServerSideProps(context: { query: any; }) {
    const {query} = context;
    console.log(query)
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/categories?page=${query.page || 1}&limit=${query.limit || 10}`)
    const data = await res.json()
    console.log(data)
    return {
        props: {
            categories: data.items,
        },
    }
}
export default Categories;
