import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";

const FinanceAccountingDashboard = () => {
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
          <b>
            {" "}
            <MdDashboard /> &nbsp;FINANCE ACCOUNTING{" "}
          </b>
        </a>
        <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/AccountsPayablesClient" type="button" class="btn btn-outline-primary">
          ACCOUNTS PAYABLES
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/AccountsReceivablesClient"type="button" class="btn btn-outline-primary">
          ACCOUNTS RECEIVABLES
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/ExpenseAccountClient"type="button" class="btn btn-outline-primary">
          EXPENSE ACCOUNT
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
        <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">ACCOUNTS PAYABLES</h5>
                <p class="card-text">
              
                </p>

                <Link
                  to="/AccountsPayablesClient"
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
                <h5 class="card-title">ACCOUNTS RECEIVABLES</h5>
                <p class="card-text">
                </p>
                <Link
                  to="/AccountsReceivablesClient"
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
                <h5 class="card-title">EXPENSE ACCOUNT</h5>
                <p class="card-text">
              
                </p>
                <Link
                  to="/ExpenseAccountClient"
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

export default FinanceAccountingDashboard;
