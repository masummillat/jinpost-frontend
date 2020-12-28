import React, {useEffect, useState} from 'react';
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";
import {useFormik} from "formik";
import httpClient from "../../utils/api";
import {CategoryEntry} from "../../types";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";

interface ICategoriesProps {
    categories: CategoryEntry[]
}
const Categories: React.FC<ICategoriesProps> = ({categories}) =>{
    const [show, setShow] = useState<boolean>(false);
    const [category, setCategory] = useState<CategoryEntry | null>(null);
    const [categoryState, setCategoryState] = useState<CategoryEntry[]>([]);
    const handleClose = () => setShow(false);

    useEffect(()=>{
        setCategoryState(categories)
    },[categories])
    console.log(categories)
    console.log(categoryState )
    const formik = useFormik({
        initialValues: {
            name:'',
        },
        onSubmit: (values: any) => {
            console.log(JSON.stringify(values, null, 2));
            httpClient.post('/categories',values).then((res)=>{
                console.log(res);
                toast.success(res.statusText, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                getCategories();
                formik.setFieldValue('name', '');
            }).catch(err=>{
                console.log(err)
                toast.error(err.response.statusText, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
                  toast.success(res.statusText, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });
                  getCategories();
              }).catch(err=>{
                  console.log(err)
                  toast.error(err.response.statusText, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });
              })
              handleClose();
          }
        },
    });

    const getCategories = ()=>{
        httpClient.get('/categories')
            .then(res=>{
                setCategoryState(res.data);
            })
            .catch(err=>{
                toast.error(err.response.statusText, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    return(
        <div>
            <Head/>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <h1>Categories</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
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
                                                            }} className="far fa-edit"/>
                                                            <a href="#"><i className="far fa-trash-alt"/></a>
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
export async function getStaticProps() {

    // fetch(`${process.env.BACKEND_BASE_URL}/categories`)
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    return {
        props: {
            categories: [],
        },
    }
}
export default Categories;
