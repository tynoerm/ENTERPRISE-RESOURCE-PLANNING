import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const HumanResourceDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [Expenseaccount, setExpenseaccount] = useState([]);

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/expenseaccount/")
      .then((res) => {
        setExpenseaccount(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            {" "}
            <MdDashboard /> &nbsp;HUMAN RESOURCES{" "}
          </b>
        </a>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">PAYROLL</h5>
                <p className="card-text">
                  Employee information, salary or wages, time and attendance
                  records, deductions, employee benefits, tax filings and
                  reporting, payment distribution.
                </p>

                <Link to="/PayrollManager" type="button" className="btn btn-primary">
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">RECRUITMENT</h5>
                <p className="card-text">
                  Its main contents include job requisition creation, applicant
                  tracking, job posting and candidate sourcing, screening and
                  shortlisting, etc.
                </p>
                <Link to="/RecruitmentManager" type="button" className="btn btn-primary">
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">PERFORMANCE MANAGEMENT & BENEFITS</h5>
                <p className="card-text">
                  Competency assessment, development planning, and performance
                  analytics. It helps align employee goals with organizational
                  objectives, track performance, etc.
                </p>
                <Link to="/PerformanceManagementManager" type="button" className="btn btn-primary">
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>

          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">CHECK FINIANCE AND ACCOUNT MODULE</h5>
                <p className="card-text">
                 you are now going to have access to company expense account.
                </p>
                <Button variant="primary" onClick={handleShow}>
                  SELECT OPTION
                </Button>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>ACCOUNTING OPTIONS</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-wrapper">
                      <form>
                        <div className="d-grid gap-2">
                          <Button variant="success" onClick={handleShow1}>
                            EXPENSE ACCOUNT
                          </Button>
                          
                        </div>
                      </form>
                    </div>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
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
                    <Modal.Title>EXPENSE ACCOUNT</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-wrapper">
                      <form>
                        <div className="d-grid gap-2">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>account_name</th>
                                <th>account_number</th>
                                <th>description</th>
                                <th>opening_balance</th>
                                <th>transactions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Expenseaccount.map((expenseaccount, index) => (
                                <tr key={index}>
                                  <td>{expenseaccount.account_name}</td>
                                  <td>{expenseaccount.account_number}</td>
                                  <td>{expenseaccount.description}</td>
                                  <td>{expenseaccount.opening_balance}</td>
                                  <td>{expenseaccount.transactions}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </form>
                    </div>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>

                
              </div>
            </div>
          </div>

          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HumanResourceDashboard;
