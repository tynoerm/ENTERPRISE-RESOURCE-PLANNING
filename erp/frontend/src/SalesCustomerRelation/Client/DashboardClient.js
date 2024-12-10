import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";
import fmclog from "../../images/fmclog.PNG";

const SalesCustomerRelation = () => {

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
          SALES & CUSTOMER RELATION{" "}
          </b>
        </a>

        <form className="d-flex" >
            <a className="btn btn-danger" href="/QuotationManagementClient">
            QUOTATION MANAGEMENT
            </a>
            <a className="btn btn-dark" href="/">
              {" "}
              Log Out
            </a>
          </form>
      </nav>

      
      <div>
        <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">DELIVERY NOTE</h5>
                <p class="card-text">
                </p>

                <Link
                  to="/LeadManagementClient"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
          <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">QUOTATION MANAGEMENT</h5>
                <p class="card-text">
               </p>
                <Link
                  to="/QuotationManagementManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>




          <div style={footerStyle}>
      <p>&copy; Freight Marks Logistics. All rights reserved.</p>
     
    </div>
        </div>
      </div>
    </div>
  );
};
export default SalesCustomerRelation;
