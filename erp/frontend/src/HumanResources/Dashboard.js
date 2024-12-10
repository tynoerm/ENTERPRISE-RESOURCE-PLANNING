import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nav from "../images/nav.jpeg";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const HumanResourceDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);

  const [Expenseaccount, setExpenseaccount] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/expenseaccount/")
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
            <MdDashboard /> &nbsp;HUMAN RESOURCES
          </b>
        </a>

        <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/Payroll" type="button" class="btn btn-outline-primary">
          PAYROLL
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/Recruitment"type="button" class="btn btn-outline-primary">
          RECRUITMENT
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/ PerfomanceManagement"type="button" class="btn btn-outline-primary">
          PERFORMANCE MANAGEMENT
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/"type="button" class="btn btn-outline-light">
          LOG OUT
        </Link>
      </li>
    </ul>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">PAYROLL</h5>
                <p className="card-text">
                 
                </p>
                <Link to="/Payroll" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">RECRUITMENT</h5>
                <p className="card-text">
                 
                </p>
                <Link to="/Recruitment" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">PERFORMANCE MANAGEMENT & BENEFITS</h5>
                <p className="card-text">
                 
                </p>
                <Link to="/PerformanceManagement" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>

          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">CHECK FINANCE AND ACCOUNT MODULE</h5>
                <p className="card-text">
                 
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
                                <th>Account Name</th>
                                <th>Account Number</th>
                                <th>Description</th>
                                <th>Opening Balance</th>
                                <th>Transactions</th>
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
