import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";

const SalesCustomerRelation = () => {

    const navbarStyle = {
        backgroundImage: `url(${nav})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire navbar
        backgroundPosition: "center", // Center the background image
        color: "black", // Set text color
      };

  return (
    <div>
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            {" "}
            <MdDashboard /> &nbsp; SALES & CUSTOMER RELATION{" "}
          </b>
        </a>
      </nav>

      <div>
        <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">LEAD MANAGEMENT</h5>
                <p class="card-text">
                  This module allows the company to track and manage potential
                  leads or prospects. It provides tools to capture leads from
                  various sources, such as website forms or trade shows, and
                  centralizes the lead information for easy access and
                  follow-up. The system can assign leads to sales
                  representatives{" "}
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
                <h5 class="card-title">OPPORTUNITY TRACKING</h5>
                <p class="card-text">
                  This feature enables the tracking of potential sales
                  opportunities. It allows sales representatives to create and
                  manage opportunities associated with specific leads or
                  customers. The system can store information about the
                  opportunity's stage, value, expected close date, and
                  associated activities.{" "}
                </p>
                <Link
                  to="/OpportunityTrackingClient"
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
              <div class="card-body">
                <h5 class="card-title">SALES FORECASTING</h5>
                <p class="card-text">
                  {" "}
                  The sales forecasting module allows the company to forecast
                  future sales based on historical data, current opportunities,
                  and market trends. It provides tools to analyze and predict
                  sales performance, helping the company make informed decisions
                  regarding resource allocation, production planning, and
                  revenue projections.
                </p>
                <Link
                  to="/SalesFocustingClient"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SalesCustomerRelation;
