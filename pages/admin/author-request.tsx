import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Head from "../../components/head";
import AdminLayout from "../../components/layouts/admin";
import httpClient from "../../utils/api";
import { UserDto } from "../../types";

export interface IAuthorRequest {
    id?: number;
    message?: string;
    read?: boolean;
    isAccept?: boolean;
    author?: UserDto;
  }

const AuthorRequest = ({authorRequests}:{authorRequests: any}) => {
    console.log(authorRequests)
    const [show, setShow] = useState(false);
    const [selectedReq, setSelectedReq] = useState<IAuthorRequest>();

    const handleClose = (data: {isAccept: boolean}) => {
        console.log(data);
       if(selectedReq){
        httpClient.put(`users/author-requests/${selectedReq.id}`, data)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err)
        })
       }
        setShow(false);
    };
    const handleShow = (req: any) => {
        setSelectedReq(req);
        setShow(true);
    };

    return (
        <div>
            <Head title="Jinpost Admin | author requests"/>
            <main className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    	<div className="page-title">
                    		<h1>Notifications</h1>
                    	</div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="notification-list">
                                    <ul>
                                        {
                                            authorRequests.map((req: any)=>(
                                                <li key={req.id}>{req.author.name} wants to be an author 
                                                    <span onClick={()=>handleShow(req)} 
                                                     style={{cursor: 'pointer'}}
                                                     className="ml-2 text-primary">
                                                         More
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
       {selectedReq && (
            <Modal centered show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Author Request</Modal.Title>
            </Modal.Header>
                <Modal.Body>{selectedReq.message && selectedReq.message || ''}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={()=>handleClose({isAccept: false})}>
                Reject
              </Button>
              <Button variant="primary" onClick={()=>handleClose({isAccept: true})}>
                Accept
              </Button>
            </Modal.Footer>
          </Modal>
       )}
        </div>
    );
}

AuthorRequest.Layout = AdminLayout; 

export async function getServerSideProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/author-requests`)
    const authorRequests = await res.json()
  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        authorRequests: authorRequests,
      },
    }
  }
export default AuthorRequest;
