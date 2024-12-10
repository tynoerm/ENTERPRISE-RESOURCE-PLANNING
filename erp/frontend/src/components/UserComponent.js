import React, { useState } from "react";
import { Link , useLocation} from "react-router-dom";
import { AiFillSchedule } from "react-icons/ai";
import { BsAwardFill } from "react-icons/bs";
import { AiFillRedEnvelope } from "react-icons/ai";
import { FcFactory } from "react-icons/fc";
import { AiFillControl } from "react-icons/ai";
import { AiFillLayout } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import nav from "../images/nav.jpeg";

const MainDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
  };

  
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

  const go = useLocation();
  const [dep , setDep] = useState(go.state.dep)

  const [loggedIn, setLoggedIn] = useState("");

  return (
    <div>
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            <MdDashboard /> &nbsp;CLIENT DASHBOARD
          </b>
        </a>
        <form className="d-flex" role="search">
          <a className="btn btn-primary me-2"></a>
          <a className="btn btn-success">Log Out</a>
        </form>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
         
        { dep === "supplychainmanagement" &&
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  <AiFillSchedule /> &nbsp; SUPPLY CHAIN MANAGEMENT
                </h5>
                <p class="card-text">
                    {" "}
                  </p>
                <Link to="/SupplyChainManagementDashboardUser" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
}

{ dep === "finianceandaccounting" &&
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  <BsAwardFill /> &nbsp; FINANCE & ACCOUNTING
                </h5>
                <p class="card-text">
                {" "}
                  </p>
                <Link to="/FinanceAccountingDashboardClient" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
}

{ dep ==="salesandcustomerrelation" &&
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  <AiFillRedEnvelope /> &nbsp; SALES & CUSTOMER RELATION
                </h5>
                <p class="card-text">
                    {" "}
                  
                  </p>
                <Link to="/SalesCustomerRelationClient" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
}

{ dep ==="manufacturingproduction" &&
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  <AiFillControl /> &nbsp; WAREHOUSE
                </h5>
                <p class="card-text">
               
                </p>
                <Link to="/ManufacturingProductionDashboardClient" type="button" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
}

{ dep ==="humanresources" &&
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  <AiFillLayout /> &nbsp; HUMAN RESOURCES
                </h5>
                <p class="card-text">
                    {" "}
                    benefits administration, recruitment and
                    
                    development, time and attendance tracking.
                  </p>
                <Link to="/HumanResourcesDashboardClient" type="button" className="btn btn-primary">
                  Next
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
