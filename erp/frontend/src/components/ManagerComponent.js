import React, {useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillSchedule } from "react-icons/ai";
import { BsAwardFill } from "react-icons/bs";
import { AiFillRedEnvelope } from "react-icons/ai";
import { FcFactory } from "react-icons/fc";
import { AiFillControl } from "react-icons/ai";
import { AiFillLayout } from "react-icons/ai";
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

import nav from "../images/nav.jpeg";
import fmclog from "../images/fmclog.PNG";


const MainDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
  };
  const go=useLocation();
  const [dep,setDep]=useState(go.state.dep);

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
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
        <img
            src={fmclog}
            alt="Logo"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <b>
            {" "}
            MANAGER DASHBOARD{" "}
          </b>
        </a>
        <form className="d-flex" role="search">
            <a className="btn btn-primary me-2" >
              
            </a>
            <a className="btn btn-success" href="/" >
              Log Out
            </a>

            </form>
      </nav>
       


      <div>
        <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          {dep==="supplychainmanagement" && <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">
                  <AiFillSchedule /> &nbsp; SUPPLY CHAIN MANAGEMENT
                </h5>
                <p class="card-text">
                  
                </p>
                <Link
                  to="/SupplyChainManagementDashboardManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div> 
          </div>
            }

          { dep === "finianceandaccounting" &&
          <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">
                  {" "}
                  <BsAwardFill /> &nbsp; FINANCE & ACCOUNTING
                </h5>
                <p class="card-text">
                  {" "}
                
                </p>
                <Link
                  to="/FinanceAccountingDashboardManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
}




         { dep ==="salesandcustomerrelation" &&
          <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                <h5 class="card-title">
                  <AiFillRedEnvelope /> &nbsp; SALES & CUSTOMER RELATION
                </h5>
                <p class="card-text">
                  {" "}
           
                </p>
                <Link
                  to="/SalesCustomerRelationManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
}

        { dep ==="manufacturingproduction" &&
          <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                <h5 class="card-title">
                  {" "}
                  <AiFillControl /> &nbsp; WAREHOUSE
                </h5>
                <p class="card-text">
                  
                </p>
                <Link
                  to="/ManufacturingProductionDashboardManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
}


          { dep ==="humanresources" &&
          <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                <h5 class="card-title">
                  {" "}
                  <AiFillLayout /> &nbsp; HUMAN RESOURCES
                </h5>
                <p class="card-text">
                  {" "}
                  payroll processing, benefits administration, recruitment and
                  onboarding, performance management, training and development,
                  time and attendance tracking.
                </p>
                <Link
                  to="/HumanResourcesDashboardManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
}
   

          <div style={footerStyle}>
      <p>&copy; Freight Marks Logistics. All rights reserved.</p>
     
    </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
