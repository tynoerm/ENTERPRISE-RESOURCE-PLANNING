import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import nav from "../../images/nav.jpeg";

const ManufacturingProductionDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [Inventorymanagement, setInventorymanagement] = useState([]);
  const [Expenseaccount, setExpenseaccount] = useState([]);

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/inventorymanagement/")
      .then((res) => {
        setInventorymanagement(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/expenseaccount/")
      .then((res) => {
        setExpenseaccount(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            <MdDashboard /> &nbsp;MANUFACTURING PRODUCTION
          </b>
        </a>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body ">
                <h5 className="card-title">Bill of Materials (BOM)</h5>
                <p className="card-text">
                  Comprehensive list of components, raw materials, and
                  sub-assemblies required to manufacture a product. It specifies
                  the quantity, unit of measure, and relationships between
                  different parts. The ERP system stores and manages the BOM
                  information, allowing for accurate planning and tracking of
                  material requirements.
                </p>

                <Link to="/BillofMaterialsManager" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body ">
                <h5 className="card-title">Production Orders</h5>
                <p className="card-text">
                  Represent work orders or jobs that are created to initiate the
                  manufacturing process for a specific quantity of a product.
                  They contain details such as the product to be manufactured,
                  quantity, start and end dates, and any specific instructions
                  or notes. The ERP system manages the creation, tracking, and
                  execution of production orders, providing visibility into the
                  progress of each order.
                </p>
                <Link to="/ProductionOrdersManager" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">Quality Control</h5>
                <p className="card-text">
                  Incorporate functionalities related to quality control and
                  assurance. This may include defining quality standards and
                  specifications for products, conducting inspections and tests
                  during the manufacturing process, capturing quality data, and
                  managing non-conformances or deviations. These features help
                  ensure that products meet the required quality standards.
                </p>
                <Link to="/QualityControlManager" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>

          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">
                  CHECK SUPPLY CHAIN & ACCOUNTING MODULE
                </h5>
                <p className="card-text">
                  You now have access to available stock as well as the expense
                  account to be aware of the budget assigned to your department.
                </p>
                <Button variant="primary" onClick={handleShow}>
                  SELECT OPTION
                </Button>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>SELECT AN OPTION</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div className="form-wrapper">
                      <div className="d-grid gap-2">
                        <Button
                          variant="success"
                          type="button"
                          onClick={handleShow1}
                        >
                          SUPPLY CHAIN MODULE
                        </Button>
                        <Button
                          variant="success"
                          type="button"
                          onClick={handleShow2}
                        >
                          FINANCE & ACCOUNTING
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer></Modal.Footer>
                </Modal>

                <Modal
                  show={show1}
                  onHide={handleClose1}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      SUPPLY CHAIN MANAGEMENT (Inventory Management)
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-wrapper">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Last Updated</th>
                            <th>Cost Price</th>
                            <th>Selling Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Inventorymanagement.map(
                            (inventorymanagement, index) => (
                              <tr key={index}>
                                <td>{inventorymanagement.item_name}</td>
                                <td>{inventorymanagement.category}</td>
                                <td>{inventorymanagement.quantity}</td>
                                <td>{inventorymanagement.last_updated}</td>
                                <td>{inventorymanagement.cost_price}</td>
                                <td>{inventorymanagement.selling_price}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>

                <Modal
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>FINIANCE & ACCOUNTING (expense account)</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div className="form-wrapper">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Debits and Credits</th>
                            <th>Description</th>
                            <th>Opening Balance</th>
                            <th>Transactions</th>
                            <th>Sub Accounts Categories</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Expenseaccount.map((expenseaccount, index) => (
                            <tr key={index}>
                              <td>{expenseaccount.account_name}</td>
                              <td>{expenseaccount.account_number}</td>
                              <td>{expenseaccount.debits_andcredits}</td>
                              <td>{expenseaccount.description}</td>
                              <td>{expenseaccount.opening_balance}</td>
                              <td>{expenseaccount.transactions}</td>
                              <td>{expenseaccount.sub_accountsCategories}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingProductionDashboard;
