import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../images/nav.jpeg";

const AdminUserManagement = () => {
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
            <MdDashboard /> &nbsp;ADMIN USER MANAGEMENT{" "}
          </b>
        </a>
      </nav>


       <div>
        hello
       </div>


    </div>
  )
}
 
export default AdminUserManagement;