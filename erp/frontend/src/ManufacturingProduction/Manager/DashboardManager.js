import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";

const ManufacturingProductionDashboard = () => {
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
            <MdDashboard /> &nbsp;MANUFACTURING PRODUCTION{" "}
          </b>
        </a>
      </nav>
            


            <div>
                <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
                    <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">Bill of Materials (BOM)</h5>
                                <p class="card-text">comprehensive list of components, raw materials, and sub-assemblies required to manufacture a product. It specifies the quantity, unit of measure, and relationships between different parts. The ERP system stores and manages the BOM information, allowing for accurate planning and tracking of material requirements.s </p>

                                <Link to="/BillofMaterialsManager" type="button"     class="btn btn-primary"> Next </Link>

                            </div>
                        </div>
                    </div>
                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body ">
                                <h5 class="card-title">Production Orders</h5>
                                <p class="card-text"> represent work orders or jobs that are created to initiate the manufacturing process for a specific quantity of a product. They contain details such as the product to be manufactured, quantity, start and end dates, and any specific instructions or notes. The ERP system manages the creation, tracking, and execution of production orders, providing visibility into the progress of each order </p>
                                <Link to="/ProductionOrdersManager" type="button"     class="btn btn-primary"> Next </Link>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="card shadow p-3 mb-5 bg-body rounded">

                            <div class="card-body">
                                <h5 class="card-title"> Quality Control</h5>
                                <p class="card-text"> incorporate functionalities related to quality control and assurance. This may include defining quality standards and specifications for products, conducting inspections and tests during the manufacturing process, capturing quality data, and managing non-conformances or deviations. These features help ensure that products meet the required quality standards</p>
                                <Link to="/QualityControlManager" type="button"     class="btn btn-primary">  Next </Link>
                            </div>
                        </div>
                    </div>
                  


                    </div>
                </div>
        </div>
    )
}

export default ManufacturingProductionDashboard

