import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaFileCsv } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const recuitment = () => {

   const [modalShow, setModalShow] = useState(false);
    const [recuitmentForm, setRecruitmentForm] = useState([]);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);

    const handleShow1 = (a) => { setShow1(true);setRecruitmentEdit(a); console.log(a) }

    const [recruitmentinsert, setRecruitmentinsert] = useState({});
    const [recruitmentEdit,setRecruitmentEdit] = useState({})

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhonenumber] = useState("");
    const [address,setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [offer_details, setOfferdetails] = useState("");
    const [applied_position, setBanking_details] = useState("");
    



    useEffect(() => {
        axios
            .get("http://localhost:3001/recruitment/")
            .then((res) => {
                setRecruitmentForm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])


    const notify1 = (message) => toast(message);


    const handleSubmit = (e) => {
        e.preventDefault();
        const recruitmentinsert = {name, email, phone_number,address, status, offer_details }
        axios
            .post("http://localhost:3001/recruitment/create-newrecuitment", recruitmentinsert)
            .then((res) => {
                console.log({ status: res.status });
                setRecruitmentForm(prev => [...prev, recruitmentinsert])
            });
            setShow(false)
            notify1(" created successfully")
    }

    const notify2 = (message) => toast(message);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(
            `http://localhost:3001/recruitment/update-recruitment/${recruitmentEdit._id}`,
            recruitmentEdit
          )
          .then((res) => {
            console.log({ status: res.status });
            // update userform
            handleClose();
          })
          .catch((error) => {
            console.error(" Error updating item:", error);
          });
          setShow(false)
          notify2(" edited successfully")
      };

      const notify = (message) => toast(message);
      const handleDelete = async (id) => {
        axios
          .delete(
            `http://localhost:3001/recruitment/delete-recruitment/${id}`
          )
          .then(() => {
            console.log("Data successfully deleted!");
    
            setRecruitmentForm((prevrecruitmentForm) =>
              prevrecruitmentForm.filter((item) => item._id !== id)
            );
          })
          .catch((error) => {
            console.log(error);
          });
          setShow(false)
          notify("Deleted Successfully")
      };
    
      const handleDownload = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/recruitment/generate-csv",
            {
              responseType: "blob", // Important to handle binary data
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "data.csv");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error("Error downloading CSV:", error);
        }
      };
    


    return (
        <div>
            <ToastContainer/>
            <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded" >
                <div class="container-fluid">
                    <a class="navbar-brand"><b>RECRUITMENT</b></a>
                   
                </div>
            </nav>
               
            <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleDownload}>
          {" "}
          <FaFileCsv /> &nbsp;Reports
        </button>
                <Button variant="btn btn-success" onClick={handleShow}>
                    Create + 1
                </Button>

            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>RECRUITMENT</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"> name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    value={recuitmentForm.name}
                                    onChange={(event) => {setName(event.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={recuitmentForm.email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">phone_number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone_number"
                                    id="phone_number"
                                    value={recuitmentForm.phone_number}
                                    onChange={(event) => { setPhonenumber(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    id="address"
                                    value={recuitmentForm.payment_terms}
                                    onChange={(event) => {setAddress(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    id="status"
                                    value={recuitmentForm.status}
                                    onChange={(event) => { setStatus(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> offer_details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" offer_details"
                                    id=" offer_details"
                                    value={recuitmentForm. offer_details}
                                    onChange={(event) => { setOfferdetails(event.target.value) }}
                                />
                            </div>
                           
                            <div className="mb-3">
                                <label className="form-label"> applied_position</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" applied_position"
                                    id=" applied_position"
                                    value={recuitmentForm. applied_position}
                                    onChange={(event) => { setBanking_details(event.target.value) }}
                                />
                            </div>
                         
                           
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

                <Modal.Footer>

                </Modal.Footer>
            </Modal>


            <Modal
                show={show1}
                onHide={handleClose1}
                backdrop="static"
                keyboard={false}

                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>EDIT</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                    <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label"> name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    value={recruitmentEdit.name}
                                    onChange={(e) =>
                                        setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          name: e.target.value,
                                        })
                                      } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={recruitmentEdit.email}
                                    onChange={(e) =>
                                        setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          email: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">phone_number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone_number"
                                    id="phone_number"
                                    value={recruitmentEdit.phone_number}
                                    onChange={(e) =>
                                       setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          phone_number: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    id="address"
                                    value={recruitmentEdit.address}
                                    onChange={(e) =>
                                        setRecruitmentEdit  ({
                                          ...recruitmentEdit,
                                          address: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    id="status"
                                    value={recruitmentEdit.status}
                                    onChange={(e) =>
                                       setRecruitmentEdit({
                                          ...recruitmentEdit,
                                         status: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> offer_details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" offer_details"
                                    id=" offer_details"
                                    value={recruitmentEdit. offer_details}
                                    onChange={(e) =>
                                        setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          offer_details: e.target.value,
                                        })
                                      }
                                />
                            </div>
                           
                            <div className="mb-3">
                                <label className="form-label"> applied_position</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" applied_position"
                                    id=" applied_position"
                                    value={recruitmentEdit. applied_position}
                                    onChange={(e) =>
                                        setRecruitmentEdit({
                                          ...recruitmentEdit,
                                         applied_position: e.target.value,
                                        })
                                      }
                                />
                            </div>
                         
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

                <Modal.Footer>

                </Modal.Footer>
            </Modal>







            <table className="table table-striped">
                <thead>
                    <tr>

                        <th>name</th>
                        <th> email</th>
                        <th>phone_number</th>
                        <th> address</th>
                        <th>  status</th>
                        <th> offer_details</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>

                    {recuitmentForm.map((recruitment, index) => {
                        return <tr key={index}>

                            <td>{recruitment.name}</td>
                            <td>{recruitment.email}</td>
                            <td>{recruitment.phone_number}</td>
                            <td>{recruitment.address}</td>
                            <td>{recruitment.status}</td>
                            <td>{recruitment.offer_details}</td>
                            

                            <td>


                                <Button variant="btn btn-primary" onClick={() => { handleShow1(recruitment) }}>
                                    Edit
                                </Button>
                                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(recruitment._id)}
                  >
                    Delete
                  </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>








             
        </div>
    )
}

export default recuitment