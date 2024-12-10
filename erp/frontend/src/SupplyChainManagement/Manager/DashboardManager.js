import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";
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


  return (
    <div>
 <nav className="navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded" style={navbarStyle}>
  <a className="navbar-brand" style={{ color: "white" }}>
    <b>
      <MdDashboard /> &nbsp;SUPPLY CHAIN MANAGEMENT{" "}
    </b>
  </a>
  <form className="d-flex" >
            <a className="btn btn-primary" href="/PurchaseOrderManager">
            PURCHASE ORDERS
            </a>
            <a className="btn btn-dark" href="/">
              {" "}
              Log Out
            </a>
          </form>
</nav>

  <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
    <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="card-body ">
          <h5 className="card-title">INVENTORY MANAGEMENT</h5>
          <p className="card-text">
            
          </p>
          <Link to="/InventoryManagement" type="button" className="btn btn-primary">
            Next
          </Link>
        </div>
      </div>
    </div>

    <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="card-body ">
          <h5 className="card-title">SUPPLIER MANAGEMENT</h5>
          <p className="card-text">
         
          </p>
          <Link to="/ProcurementManager" type="button" className="btn btn-primary">
            Next
          </Link>
        </div>
      </div>
    </div>

    <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h5 className="card-title">LOGISTICS AND SHIPPING</h5>
          <p className="card-text">
      
          </p>
          <Link to="/LogisticsandShipping" type="button" className="btn btn-primary">
            Next
          </Link>
        </div>
      </div>
    </div>

    <div style={footerStyle}>
        <p>&copy; Freight Marks Logistics. All rights reserved.</p>
      </div>
        </div>
      </div>
    
  );
};


export default SupplyChainManagementDashboard;