import React from "react"
import { Link } from "react-router-dom"
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


    return (
      <div>
        <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b> <MdDashboard />  &nbsp;CLIENT DASHBOARD </b>
        </a>
      </nav>


        <div>
          <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
            <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
              <div class="card shadow p-3 mb-5 bg-body rounded">
                <div class="card-body ">
                  <h5 class="card-title">
                    <AiFillSchedule /> &nbsp; SUPPLY CHAIN MANAGEMENT
                  </h5>
                  <p class="card-text">
                    supply chain, encompassing procurement, inventory
                    management, order fulfillment, demand planning, logistics,
                    and supplier relationship management.{" "}
                  </p>
                  <Link
                    to="/SupplyChainManagementDashboardUser"
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
                  <h5 class="card-title">
                    {" "}
                    <BsAwardFill /> &nbsp; FINANCE & ACCOUNTING
                  </h5>
                  <p class="card-text">
                    {" "}
                    general ledger, accounts payable, accounts receivable,
                    expense account, fixed asset
                    management..................................................
                    .
                  </p>
                  <Link
                    to="/FinanceAccountingDashboardClient"
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
                  <h5 class="card-title">
                    <AiFillRedEnvelope /> &nbsp; SALES & CUSTOMER RELATION
                  </h5>
                  <p class="card-text">
                    {" "}
                    lead management, opportunity tracking, sales forecasting,
                    contact management, customer service, marketing campaign
                    management.
                  </p>
                  <Link
                    to="/SalesCustomerRelationClient"
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
                  <h5 class="card-title">
                    {" "}
                    <AiFillControl /> &nbsp; MANUFACTURING PRODUCTION
                  </h5>
                  <p class="card-text">
                    production planning, bill of materials (BOM), work order
                    management, shop floor control, quality control, and product
                    lifecycle management
                  </p>
                  <Link
                    to="/ManufacturingProductionDashboardClient"
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
                  <h5 class="card-title">
                    {" "}
                    <AiFillLayout /> &nbsp; HUMAN RESOURCES
                  </h5>
                  <p class="card-text">
                    {" "}
                    payroll processing, benefits administration, recruitment and
                    onboarding, performance management, training and
                    development, time and attendance tracking.
                  </p>
                  <Link
                    to="/HumanResourcesDashboardClient"
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
}

export default MainDashboard;