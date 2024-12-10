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
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber,setPhonenumber ]= useState("");
    const [address,setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [maritalstatus, setMaritalstatus] = useState("");
    
    const footerStyle = {
        backgroundColor: "navy",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
      };
    


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
        const recruitmentinsert = {
            name,
             position, 
             email,
             phonenumber, 
             address, 
           gender,
            maritalstatus
        }
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
                    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/PayrollManager" type="button" class="btn btn-outline-primary">
          PAYROLL
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/RecruitmentManager"type="button" class="btn btn-outline-primary">
          RECRUITMENT
        </Link>
      </li>
      &nbsp;
      
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/"type="button" class="btn btn-outline-warning">
          LOG OUT
        </Link>
      </li>
    </ul>
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
                                <label className="form-label">Position</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="position"
                                    id="position"
                                    value={recuitmentForm.position}
                                    onChange={(event) => { setPosition(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={recuitmentForm.email}
                                    onChange={(event) => {setEmail(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phonenumber"
                                    id="phonenumber"
                                    value={recuitmentForm.phonenumber}
                                    onChange={(event) => {setPhonenumber(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    id="address"
                                    value={recuitmentForm.address}
                                    onChange={(event) => { setAddress(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" gender"
                                    id="gender"
                                    value={recuitmentForm.gender}
                                    onChange={(event) => { setGender(event.target.value) }}
                                />
                            </div>
                           
                            <div className="mb-3">
                                <label className="form-label"> Marital Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" maritalstatus"
                                    id=" maritalstatus"
                                    value={recuitmentForm. maritalstatus}
                                    onChange={(event) => {setMaritalstatus(event.target.value) }}
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
                                <label className="form-label">Position</label>
                                <input
                                    type="text"
                                    className="form-control"
                                name="position"
                                    id="position"
                                    value={recruitmentEdit.position}
                                    onChange={(e) =>
                                        setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          position: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phonenumber"
                                    id="phonenumber"
                                    value={recruitmentEdit.phonenumber}
                                    onChange={(e) =>
                                       setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          phonenumber: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
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
                                <label className="form-label">Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                 name=" gender"
                                    id="gender"
                                    value={recruitmentEdit.gender}
                                    onChange={(e) =>
                                       setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          gender: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">  Marital Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                   name=" maritalstatus"
                                    id=" maritalstatus"
                                    value={recruitmentEdit. maritalstatus}
                                    onChange={(e) =>
                                        setRecruitmentEdit({
                                          ...recruitmentEdit,
                                          maritalstatus: e.target.value,
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
                        <th>position</th>
                        <th>email</th>
                        <th>phone number</th>
                        <th> address</th>
                        <th>gender</th>
                        <th>marital status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>

                    {recuitmentForm.map((recruitment, index) => {
                        return <tr key={index}>

                            <td>{recruitment.name}</td>
                            <td>{recruitment.position}</td>
                            <td>{recruitment.email}</td>
                            <td>{recruitment.phonenumber}</td>
                            <td>{recruitment.address}</td>
                            <td>{recruitment.gender}</td>
                            <td>{recruitment.maritalstatus}</td>
                            

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




            <div style={footerStyle}>
      <p>&copy; Freight Marks Logistics. All rights reserved.</p>
     
    </div>



             
        </div>
    )
}

export default recuitment