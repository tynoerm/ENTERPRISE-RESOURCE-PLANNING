import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Payroll = () => {

   const [modalShow, setModalShow] = useState(false);
    const [payrollForm, setPayrollForm] = useState([]);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);

    const handleShow1 = (a) => { setShow1(true); setPayrollEdit(a); console.log(a) }

    const [payrollinsert, setPayrollinsert] = useState({});
    const [payrollEdit, setPayrollEdit] = useState({})

    const [employee_name, setEmployee_name] = useState("");
    const [employee_status, seteEmployee_status] = useState("");
    const [job_title, setJob_title] = useState("");
    const [base_salary, setBase_salary] = useState("");
    const [bonuses, setBonuses] = useState("");
    const [deductions_medicalcontribution, setDeductions_medicalcontribution] = useState("");
    const [banking_details, setBanking_details] = useState("");
    



    useEffect(() => {
        axios
            .get("https://enterprise-resource-planning.onrender.com/payroll/")
            .then((res) => {
                setPayrollForm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    const notify1 = (message) => toast(message);


    const handleSubmit = (e) => {
        e.preventDefault();
        const payrollinsert = {employee_name, employee_status, job_title,base_salary, bonuses, deductions_medicalcontribution }
        axios
            .post("https://enterprise-resource-planning.onrender.com/payroll/create-payroll", payrollinsert)
            .then((res) => {
                console.log({ status: res.status });
                setPayrollForm(prev => [...prev, payrollinsert])
            });
            setShow(false)
            notify1(" created successfully")
    }

    const notify2 = (message) => toast(message);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(
            `https://enterprise-resource-planning.onrender.com/payroll/update-payroll/${payrollEdit._id}`,
            payrollEdit
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
            `https://enterprise-resource-planning.onrender.com/payroll/delete-payroll/${id}`
          )
          .then(() => {
            console.log("Data successfully deleted!");
    
           setPayrollForm((prevpayrollForm) =>
              prevpayrollForm.filter((item) => item._id !== id)
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
            "https://enterprise-resource-planning.onrender.com/payroll/generate-csv",
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
                    <a class="navbar-brand"><b>PAYROLL</b></a>
                   
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
                    <Modal.Title>PAYROLL</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"> employee_name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_name"
                                    id="employee_name"
                                    value={payrollForm.employee_name}
                                    onChange={(event) => {setEmployee_name(event.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">employee_status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_status"
                                    id="employee_status"
                                    value={payrollForm.employee_status}
                                    onChange={(event) => { seteEmployee_status(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">job_title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="job_title"
                                    id="job_title"
                                    value={payrollForm.job_title}
                                    onChange={(event) => { setJob_title(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">base_salary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="base_salary"
                                    id="base_salary"
                                    value={payrollForm.payment_terms}
                                    onChange={(event) => { setBase_salary(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">bonuses</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bonuses"
                                    id="bonuses"
                                    value={payrollForm.bonuses}
                                    onChange={(event) => { setBonuses(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> deductions_medicalcontribution</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" deductions_medicalcontribution"
                                    id=" deductions_medicalcontribution"
                                    value={payrollForm. deductions_medicalcontribution}
                                    onChange={(event) => { setDeductions_medicalcontribution(event.target.value) }}
                                />
                            </div>
                           
                            <div className="mb-3">
                                <label className="form-label"> banking_details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" banking_details"
                                    id=" banking_details"
                                    value={payrollForm. banking_details}
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
                                <label className="form-label"> employee_name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_name"
                                    id="employee_name"
                                    value={payrollEdit.employee_name}
                                    onChange={(e) =>
                                        setPayrollEdit({
                                          ...payrollEdit,
                                         employee_name: e.target.value,
                                        })
                                      } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">employee_status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_status"
                                    id="employee_status"
                                    value={payrollEdit.employee_status}
                                    onChange={(e) =>
                                       setPayrollEdit({
                                          ...payrollEdit,
                                         employee_status: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">job_title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="job_title"
                                    id="job_title"
                                    value={payrollEdit.job_title}
                                    onChange={(e) =>
                                        setPayrollEdit({
                                          ...payrollEdit,
                                          job_title: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">base_salary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="base_salary"
                                    id="base_salary"
                                    value={payrollEdit.base_salary}
                                    onChange={(e) =>
                                       setPayrollEdit({
                                          ...payrollEdit,
                                         base_salary: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">bonuses</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bonuses"
                                    id="bonuses"
                                    value={payrollEdit.bonuses}
                                    onChange={(e) =>
                                        setPayrollEdit({
                                          ...payrollEdit,
                                          bonuses: e.target.value,
                                        })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> deductions_medicalcontribution</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" deductions_medicalcontribution"
                                    id=" deductions_medicalcontribution"
                                    value={payrollEdit. deductions_medicalcontribution}
                                    onChange={(e) =>
                                        setPayrollEdit({
                                          ...payrollEdit,
                                          deductions_medicalcontribution: e.target.value,
                                        })
                                      }
                                />
                            </div>
                           
                            <div className="mb-3">
                                <label className="form-label"> banking_details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name=" banking_details"
                                    id=" banking_details"
                                    value={payrollEdit. banking_details}
                                    onChange={(e) =>
                                        setPayrollEdit({
                                          ...payrollEdit,
                                         banking_details: e.target.value,
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

                        <th>employee_name</th>
                        <th> employee_status</th>
                        <th>job_title</th>
                        <th> base_salary</th>
                        <th>  bonuses</th>
                        <th> deductions_medicalcontribution</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>

                    {payrollForm.map((payroll, index) => {
                        return <tr key={index}>

                            <td>{payroll.employee_name}</td>
                            <td>{payroll.employee_status}</td>
                            <td>{payroll.job_title}</td>
                            <td>{payroll.base_salary}</td>
                            <td>{payroll.bonuses}</td>
                            <td>{payroll.deductions_medicalcontribution}</td>
                            

                            <td>


                                <Button variant="btn btn-primary" onClick={() => { handleShow1(payroll) }}>
                                    Edit
                                </Button>
                                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(payroll._id)}
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

export default Payroll