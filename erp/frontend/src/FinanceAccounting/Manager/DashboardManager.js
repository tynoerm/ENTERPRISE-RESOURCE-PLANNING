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
      </nav>

      <div>
        <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">ACCOUNTS PAYABLES</h5>
                <p class="card-text">
                  This account records the company's outstanding invoices and
                  bills for goods or services received from vendors or suppliers
                  but not yet paid. It may include sub-accounts for individual
                  vendors
                </p>

                <Link
                  to="/AccountsPayablesManager"
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
                  This account tracks the money owed to the company by its
                  customers for services provided but not yet paid for. It may
                  include sub-accounts for individual customers or clients.
                </p>
                <Link
                  to="/AccountsReceivablesManager"
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
                  {" "}
                  These accounts record the company's costs and expenses
                  incurred in its operations. They may include categories such
                  as "Salaries and Wages," "Rent," "Insurance,"
                  "Transportation," "Utilities," "Office Supplies," "
                </p>
                <Link
                  to="/ExpenseAccountManager"
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

export default FinanceAccountingDashboard;
