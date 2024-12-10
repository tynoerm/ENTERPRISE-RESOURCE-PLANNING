import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";

const HumanResourceDashboard = () => {

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
            <MdDashboard /> &nbsp;HUMAN RESOURCES{" "}
          </b>
        </a>
        <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/PayrollClient" type="button" class="btn btn-outline-primary">
          PAYROLL
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/RecruitmentClient"type="button" class="btn btn-outline-primary">
          RECRUITMENT
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/ PerfomanceManagementClient"type="button" class="btn btn-outline-primary">
          PERFORMANCE MANAGEMENT
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
                                <h5 class="card-title">PAYROLL</h5>
                                <p class="card-text">employee information, salary or wages, time and attendance records, deductions, employee benefits, tax filings and reporting, payment distribution </p>

                                <Link to="/PayrollClient" type="button"     class="btn btn-primary"> Next </Link>

                            </div>
                        </div>
                    </div>
                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">RECRUITMENT</h5>
                                <p class="card-text">Its main contents include job requisition creation, applicant tracking, job posting and candidate sourcing, screening and shortlisting, .
                                    .</p>
                                    <Link to="/RecruitmentClient" type="button"     class="btn btn-primary"> Next </Link>
                            </div>
                        </div>
                    </div>
                 

                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        
                    </div>
                </div>
            </div>
            <div style={footerStyle}>
      <p>&copy; Freight Marks Logistics. All rights reserved.</p>
     
    </div>
        </div>

    )
}





export default HumanResourceDashboard;