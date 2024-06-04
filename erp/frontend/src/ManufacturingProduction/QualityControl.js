import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const QualityControl = () => {

    const[ modalShow, setModalShow] = useState(false);
    const [qualitycontrolForm ,setQualitycontrolForm] = useState([]);

    const [show, setShow] = useState(false);
    const [show1, setShow1]  = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);

    const handleShow = () => setShow(true);
    const handleShow1 = (a) => { setShow1(true);setQualitycontrolEdit(a); console.log(a)}

    const [qualitycontrolInsert , setQualitycontrolInsert] = useState({});
    const [qualitycontrolEdit,setQualitycontrolEdit] = useState({});

    const [insepection_date, setOrderid] = useState("");
    const [insepection_type, setQuantity] = useState("");
    const [inspection_result, setStartdate] = useState("");
    const [defects_ofnonconformances, setEnddate] = useState("");
    const [inspection_notes, setStatus] = useState("");
    const [inspector, setAssignedemployee] = useState("");
    const [acceptance_criteria, setLastupdatedby] = useState("");
    const [approved_by, setLastupdateddate] = useState("");


    useEffect(() => {
        axios
          .get("https://enterprise-resource-planning.onrender.com/qualitycontrol/")
          .then((res) => {
           setQualitycontrolForm(res.data.data);
          })
          .catch((error) => {
            console.log(error)
          });
    }, [])

    const notify1 = (message) => toast(message);
     const handleSubmit = (e) => {
        e.preventDefault();
        const qualitycontrolInsert = {insepection_date,insepection_type,inspection_result,defects_ofnonconformances,inspection_notes,inspector,acceptance_criteria,approved_by}
        axios
            .post("https://enterprise-resource-planning.onrender.com/qualitycontrol/create-qualitycontrol", qualitycontrolInsert)
            .then((res) => {
                console.log( { status: res.status});
               setQualitycontrolForm(prev => [...prev, qualitycontrolInsert])
            });
            setShow(false)
            notify1(" created successfully")
     }

     const notify2 = (message) => toast(message);
     
     const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(
            `https://enterprise-resource-planning.onrender.com/qualitycontrol//${qualitycontrolEdit._id}`,
            qualitycontrolEdit
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
            `https://enterprise-resource-planning.onrender.com/qualitycontrol/delete-qualitycontrol/${id}`
          )
          .then(() => {
            console.log("Data successfully deleted!");
    
            setQualitycontrolForm((prevqualitycontrolForm) =>
              prevqualitycontrolForm.filter((item) => item._id !== id)
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
            "https://enterprise-resource-planning.onrender.com/qualitycontrol/generate-csv",
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
                    <a class="navbar-brand"><b>PRODUCTION ORDERS</b></a>
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
                    <Modal.Title>PRODUCTION </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"> insepection_date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="insepection_date"
                                    id="insepection_date"
                                    value={qualitycontrolForm.insepection_date}
                                    onChange={(event) => {setOrderid(event.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">insepection_type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="insepection_type"
                                    id="insepection_type"
                                    value={qualitycontrolForm.insepection_type}
                                    onChange={(event) => { setQuantity(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">inspection_result</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="inspection_result"
                                    id="inspection_result"
                                    value={qualitycontrolForm.inspection_result}
                                    onChange={(event) => { setStartdate(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">defects_ofnonconformances</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="defects_ofnonconformances"
                                    id="defects_ofnonconformances"
                                    value={qualitycontrolForm.defects_ofnonconformances}
                                    onChange={(event) => { setEnddate(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">insepection_notes</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="insepection_notes"
                                    id="insepection_notes"
                                    value={qualitycontrolForm.insepection_notes}
                                    onChange={(event) => { setStatus(event.target.value) }}
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label"> inspector</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" inspector"
                                    id=" inspector"
                                    value={qualitycontrolForm.inspector}
                                    onChange={(event) => { setAssignedemployee(event.target.value) }}
                                />
                            </div>
                         
                            <div className="mb-3">
                                <label className="form-label"> acceptance_criteria</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" acceptance_criteria"
                                    id=" acceptance_criteria"
                                    value={qualitycontrolForm. acceptance_criteria}
                                    onChange={(event) => { setLastupdatedby(event.target.value) }}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">approved_by</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" approved_by"
                                    id=" approved_by"
                                    value={qualitycontrolForm.approved_by}
                                    onChange={(event) => { setLastupdateddate(event.target.value) }}
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
                                <label className="form-label"> insepection_date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="insepection_date"
                                    id="insepection_date"
                                    value={qualitycontrolEdit.insepection_date}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                          insepection_date: e.target.value,
                                        })
                                      } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">insepection_type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="insepection_type"
                                    id="insepection_type"
                                    value={qualitycontrolEdit.insepection_type}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                         insepection_type: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">inspection_result</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="inspection_result"
                                    id="inspection_result"
                                    value={qualitycontrolEdit.inspection_result}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                         inspection_result: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">defects_ofnonconformances</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="defects_ofnonconformances"
                                    id="defects_ofnonconformances"
                                    value={qualitycontrolEdit.defects_ofnonconformances}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                         defects_ofnonconformances: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">insepection_notes</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="insepection_notes"
                                    id="insepection_notes"
                                    value={qualitycontrolEdit.insepection_notes}
                                    onChange={(e) =>
                                      setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                          inspection_notes: e.target.value,
                                        })
                                      }
                                />
                            </div>
                           
                           
                            <div className="mb-3">
                                <label className="form-label"> inspector</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" inspector"
                                    id=" inspector"
                                    value={qualitycontrolEdit. inspector}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                          inspector: e.target.value,
                                        })
                                      }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"> acceptance_criteria</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" acceptance_criteria"
                                    id=" acceptance_criteria"
                                    value={qualitycontrolEdit. acceptance_criteria}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                         acceptance_criteria: e.target.value,
                                        })
                                      }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">approved_by</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" approved_by"
                                    id=" approved_by"
                                    value={qualitycontrolEdit.approved_by}
                                    onChange={(e) =>
                                       setQualitycontrolEdit({
                                          ...qualitycontrolEdit,
                                         approved_by: e.target.value,
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

                        <th>insepection_date</th>
                        <th> insepection_type</th>
                        <th>inspection_result</th>
                        <th> defects_ofnonconformances</th>
                        <th>insepection_notes</th>
                        <th> inspector</th>
                        <th> acceptance_criteria</th>
                        <th> approved_by</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>

                    {qualitycontrolForm.map((qualitycontrol, index) => {
                        return <tr key={index}>

                            <td>{qualitycontrol.insepection_date}</td>
                            <td>{qualitycontrol.insepection_type}</td>
                            <td>{qualitycontrol.inspection_result}</td>
                            <td>{qualitycontrol.defects_ofnonconformances}</td>
                            <td>{qualitycontrol.inspection_notes}</td>
                            <td>{qualitycontrol.inspector}</td>
                            <td>{qualitycontrol.acceptance_criteria}</td>
                            <td>{qualitycontrol.approved_by}</td>
                            

                            <td>


                                <Button variant="btn btn-primary" onClick={() => { handleShow1(qualitycontrol) }}>
                                    Edit
                                </Button>
                                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(qualitycontrol._id)}
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
export default QualityControl