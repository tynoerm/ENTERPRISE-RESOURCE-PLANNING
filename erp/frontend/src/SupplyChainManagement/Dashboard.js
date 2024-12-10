import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import nav from "../images/nav.jpeg";
import { MdDashboard } from "react-icons/md";

import axios from "axios";
import { Button, Modal } from "react-bootstrap";


const SupplyChainManagementDashboard = () => {

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
    
      const [Productionorders, setProductionorders] = useState([]);
      const [Leadmanagement, setLeadmanagement] = useState([]);
    
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
    
      useEffect(() => {
        axios
          .get("http://localhost:3001/leadmanagement/")
          .then((res) => {
            setLeadmanagement(res.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    

    return (
        <div>
             <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body "
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            {" "}
            <MdDashboard /> &nbsp;SUPPLY CHAIN MANAGEMENT{" "}
          </b>
          <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/InventoryManagement"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Inventory Management
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/Procurement"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Supplier's Information
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/LogisticsandShipping"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Logistics and Shipping 
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  type="button"
                  class="btn btn-outline-success"
                >
                  Log Out
                </Link>
              </li>
           
           
            </ul>
        </a>
      </nav>

            <div>
                <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
                    <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">INVENTORY MANAGEMENT</h5>
                                <p class="card-text"></p>

                                <Link to="/InventoryManagement" type="button"     class="btn btn-primary"> Next </Link>

                            </div>
                        </div>
                    </div>
                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">PROCUREMENT</h5>
                                <p class="card-text"></p>
                                <Link to="/Procurement" type="button"     class="btn btn-primary"> Next </Link>
                            </div>
                        </div>
                    </div>
                    

                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body">
                                <h5 class="card-title">LOGISTICS AND SHIPPING</h5>
                                <p class="card-text">
                                </p>
                                <Link to="/LogisticsandShipping" type="button"     class="btn btn-primary">  Next </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h5 className="card-title">
            CHECK MANUFACTURING PRODUCTION & SALES MODULE
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
                  <Button variant="success" type="button" onClick={handleShow1}>
                    MANUFACTURING & PRODUCTION
                  </Button>
                  <Button variant="success" type="button" onClick={handleShow2}>
                    SALES MODULE
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
              <Modal.Title>MANUFACTURING PRODUCTION (production orders)</Modal.Title>
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
              <Modal.Title>SALES MODULE(lead management)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-wrapper">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>lead_source</th>
                      <th>lead_status</th>
                      <th>contact_information</th>
                      <th> lead_owner</th>
                      <th>lead_score</th>
                      <th>lead_notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Leadmanagement.map((leadmanagement, index) => (
                      <tr key={index}>
                        <td>{leadmanagement.lead_source}</td>
                        <td>{leadmanagement.lead_status}</td>
                        <td>{leadmanagement.contact_information}</td>
                        <td>{leadmanagement.lead_owner}</td>
                        <td>{leadmanagement.lead_score}</td>
                        <td>{leadmanagement.lead_notes}</td>
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


export default SupplyChainManagementDashboard;