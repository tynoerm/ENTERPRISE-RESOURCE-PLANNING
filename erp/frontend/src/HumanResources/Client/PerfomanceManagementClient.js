import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PerfomanceManagement = () => {

    const [modalShow, setModalShow] = useState(false);
    const [perfomanceManagementForm, setPerfomanceManagementForm] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [perfomanceManagementEdit, setPerfomanceManagementEdit] = useState({});

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);

    const handleShow1 = (item) => { 
        setShow1(true); 
        setPerfomanceManagementEdit(item); 
        setEmployeeName(item.employee_name);
        setAssesmentDate(item.assesment_date);
        setRating(item.rating);
        setPlanDate(item.plan_date);
        setPlanDescription(item.plan_description);
        setGoals(item.goals);
        setActionItems(item.action_items);
        setDeadline(item.deadline);
    }

    const [employee_name, setEmployeeName] = useState("");
    const [assesment_date, setAssesmentDate] = useState("");
    const [rating, setRating] = useState("");
    const [plan_date, setPlanDate] = useState("");
    const [plan_description, setPlanDescription] = useState("");
    const [goals, setGoals] = useState("");
    const [action_items, setActionItems] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/perfomancemanagement/")
            .then((res) => {
                setPerfomanceManagementForm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const notify1 = (message) => toast(message);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { employee_name, assesment_date, rating, plan_date, plan_description, goals, action_items, deadline };
        axios
            .post("http://localhost:3001/perfomancemanagement/create-assesment", newEntry)
            .then((res) => {
                console.log({ status: res.status });
                setPerfomanceManagementForm(prev => [...prev, newEntry]);
                setShow(false);
            });

            setShow(false)
            notify1("created successfully")
    }



    const notify2 = (message) => toast(message);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(
            `http://localhost:3001/perfomancemanagement/update-perfomancemanagement/${perfomanceManagementEdit._id}`,
            perfomanceManagementEdit
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
          notify2("edited successfully")
      };
    

      const handleDelete = async (id) => {
        axios
          .delete(
            `http://localhost:3001/perfomancemanagement/delete-perfomancemanagement/${id}`
          )
          .then(() => {
            console.log("Data successfully deleted!");
    
           setPerfomanceManagementForm((prevperfomanceManagementForm) =>
              prevperfomanceManagementForm.filter((item) => item._id !== id)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      };
    


      const handleDownload = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/perfomancemanagement/generate-csv",
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
            <nav className="navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
                <div className="container-fluid">
                    <a className="navbar-brand"><b>PERFOMANCE MANAGEMENT</b></a>
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
                    <Modal.Title>PERFOMANCE MANAGEMENT</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Employee Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_name"
                                    id="employee_name"
                                    value={employee_name}
                                    onChange={(event) => setEmployeeName(event.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Assessment Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="assesment_date"
                                    id="assesment_date"
                                    value={assesment_date}
                                    onChange={(event) => setAssesmentDate(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rating</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rating"
                                    id="rating"
                                    value={rating}
                                    onChange={(event) => setRating(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Plan Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="plan_date"
                                    id="plan_date"
                                    value={plan_date}
                                    onChange={(event) => setPlanDate(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Plan Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="plan_description"
                                    id="plan_description"
                                    value={plan_description}
                                    onChange={(event) => setPlanDescription(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Goals</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="goals"
                                    id="goals"
                                    value={goals}
                                    onChange={(event) => setGoals(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Action Items</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="action_items"
                                    id="action_items"
                                    value={action_items}
                                    onChange={(event) => setActionItems(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Deadline</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="deadline"
                                    id="deadline"
                                    value={deadline}
                                    onChange={(event) => setDeadline(event.target.value)}
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
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Employee Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_name"
                                    id="employee_name"
                                    value={employee_name}
                                    onChange={(e) =>
                                        setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                         employee_name: e.target.value,
                                        })
                                      } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Assessment Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="assesment_date"
                                    id="assesment_date"
                                    value={assesment_date}
                                    onChange={(e) =>
                                        setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                         assesment_date: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rating</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rating"
                                    id="rating"
                                    value={rating}
                                    onChange={(e) =>
                                      setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                          rating: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Plan Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="plan_date"
                                    id="plan_date"
                                    value={plan_date}
                                    onChange={(e) =>
                                        setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                         plan_date: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Plan Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="plan_description"
                                    id="plan_description"
                                    value={plan_description}
                                    onChange={(e) =>
                                       setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                          plan_description: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Goals</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="goals"
                                    id="goals"
                                    value={goals}
                                    onChange={(e) =>
                                        setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                         goals: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Action Items</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="action_items"
                                    id="action_items"
                                    value={action_items}
                                    onChange={(e) =>
                                        setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                          action_items: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Deadline</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="deadline"
                                    id="deadline"
                                    value={deadline}
                                    onChange={(e) =>
                                        setPerfomanceManagementEdit({
                                          ...perfomanceManagementEdit,
                                          deadline: e.target.value,
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
            </Modal>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Assessment Date</th>
                        <th>Rating</th>
                        <th>Plan Date</th>
                        <th>Plan Description</th>
                        <th>Goals</th>
                        <th>Deadline</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {perfomanceManagementForm.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employee_name}</td>
                            <td>{item.assesment_date}</td>
                            <td>{item.rating}</td>
                            <td>{item.plan_date}</td>
                            <td>{item.plan_description}</td>
                            <td>{item.goals}</td>
                            <td>{item.deadline}</td>
                            <td>
                                <Button variant="btn btn-primary" onClick={() => handleShow1(item)}>
                                    Edit
                                </Button>
             
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PerfomanceManagement;
