import React from "react"
import { Link } from "react-router-dom"
import nav from "../images/nav.jpeg";
import { MdDashboard } from "react-icons/md";


const SupplyChainManagementDashboard = () => {

    const navbarStyle = {
        backgroundImage: `url(${nav})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire navbar
        backgroundPosition: "center", // Center the background image
        color: "black", // Set text color
      };

    return (
        <div>
             <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body "
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            {" "}
            <MdDashboard /> &nbsp;SUPPLY CHAIN MANAGEMENT{" "}
          </b>
        </a>
      </nav>

            <div>
                <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
                    <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">INVENTORY MANAGEMENT</h5>
                                <p class="card-text">Tracks inventory levels, manages stock movements, and optimizes reorder points</p>

                                <Link to="/InventoryManagement" type="button"     class="btn btn-primary"> Next </Link>

                            </div>
                        </div>
                    </div>
                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">PROCUREMENT</h5>
                                <p class="card-text">Handles supplier management, purchase order creation,..........................</p>
                                <Link to="/Procurement" type="button"     class="btn btn-primary"> Next </Link>
                            </div>
                        </div>
                    </div>
                    

                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body">
                                <h5 class="card-title">LOGISTICS AND SHIPPING</h5>
                                <p class="card-text">Manages shipping, transportation, and logistics activities, including tracking shipments.
                                </p>
                                <Link to="/LogisticsandShipping" type="button"     class="btn btn-primary">  Next </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default SupplyChainManagementDashboard;