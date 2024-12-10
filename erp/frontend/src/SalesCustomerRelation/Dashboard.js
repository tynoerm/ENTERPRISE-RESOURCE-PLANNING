import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../images/nav.jpeg";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const SalesCustomerRelation = () => {
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
  const [Productionorders, setProductionorders] = useState([]);

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/productionorders/")
      .then((res) => {
        setProductionorders(res.data.data);
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
            <MdDashboard /> &nbsp;SALES & CUSTOMER RELATION
          </b>
        </a>
        <form className="d-flex" >
            <a className="btn btn-danger" href="/QuotationManagement">
            QUOTATION MANAGEMENT
            </a>
            <a className="btn btn-dark" href="/">
              {" "}
              Log Out
            </a>
          </form>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">LEAD MANAGEMENT</h5>
                <p className="card-text">
                 
                </p>
                <Link
                  to="/LeadManagementManager"
                  type="button"
                  className="btn btn-primary"
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">OPPORTUNITY TRACKING</h5>
                <p className="card-text">
                  
                </p>
                <Link
                  to="/OpportunityTracking/Manager"
                  type="button"
                  className="btn btn-primary"
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">SALES FORECASTING</h5>
                <p className="card-text">
                  
                </p>
                <Link
                  to="/SalesForecastingManager"
                  type="button"
                  className="btn btn-primary"
                >
                  Next
                </Link>
              </div>
            </div>
          </div>

          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  CHECK MANUFACTURING PRODUCTION & ACCOUNTING MODULE
                </h5>
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
                    <Modal.Title>SELECT AN OPTION</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div className="form-wrapper">
                      <div className="d-grid gap-2">
                        <Button
                          variant="success"
                          type="button"
                          onClick={handleShow1}
                        >
                          MANUFACTURING & PRODUCTION
                        </Button>
                        <Button
                          variant="success"
                          type="button"
                          onClick={handleShow2}
                        >
                          FINANCE & ACCOUNTING
                        </Button>
                      </div>
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
                    <Modal.Title>
                      MANUFACTURING PRODUCTION (production orders)
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-wrapper">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Quantity</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Assigned Employee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Productionorders.map((order, index) => (
                            <tr key={index}>
                              <td>{order.order_id}</td>
                              <td>{order.quantity}</td>
                              <td>{order.start_date}</td>
                              <td>{order.end_date}</td>
                              <td>{order.status}</td>
                              <td>{order.assigned_employee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>

                <Modal
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>FINANCE & ACCOUNTING (expense account)</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-wrapper">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Debits and Credits</th>
                            <th>Description</th>
                            <th>Opening Balance</th>
                            <th>Transactions</th>
                            <th>Sub Accounts Categories</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Expenseaccount.map((account, index) => (
                            <tr key={index}>
                              <td>{account.account_name}</td>
                              <td>{account.account_number}</td>
                              <td>{account.debits_andcredits}</td>
                              <td>{account.description}</td>
                              <td>{account.opening_balance}</td>
                              <td>{account.transactions}</td>
                              <td>{account.sub_accountsCategories}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCustomerRelation;
