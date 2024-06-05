import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const FinanceAccountingDashboard = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/productionorders/")
      .then((res) => {
        setProductionOrders(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/matrials/")
      .then((res) => {
        setProductionOrders(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

          <div class="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                <h5 class="card-title">CHECK PRODUCTION MODULE</h5>
                <p class="card-text">
                  {" "}
                  You can also have access to : production orders & bill of
                  materials(materials required for production)
                </p>
                <Button variant="btn btn-primary" onClick={handleShow}>
                  SELECT OPTION
                </Button>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="auto"
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>SELECT AN OPTION</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div className="form-wrapper">
                      <form>
                        <div class="d-grid gap-2">
                          <button
                            class="btn btn-success"
                            type="button"
                            onClick={handleShow1}
                          >
                            PRODUCTION ORDERS
                          </button>
                          <button
                            class="btn btn-success"
                            type="button"
                            onClick={handleShow2}
                          >
                            MATERIALS REQUIRED FOR PRODUCTION
                          </button>
                        </div>
                      </form>
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
                    <Modal.Title>PRODUCTION ORDERS</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-wrapper">
                      <form>
                        <div class="d-grid gap-2">
                          <table className="table table-stripped">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Quantity</th>
                                <th>Start Date</th>
                                <th>status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productionOrders.map(
                                (productionOrder, index) => (
                                  <tr key={index}>
                                    <td>{productionOrder.order_id}</td>
                                    <td>{productionOrder.quantity}</td>
                                    <td>{productionOrder.start_date}</td>
                                    <td>{productionOrder.status}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </form>
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
                    <Modal.Title>BILL OF MATERIALS</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div className="form-wrapper">
                      <form>
                        <div class="d-grid gap-2">
                          <table className="table table-stripped">
                            <thead>
                              <tr>
                                <th>component_id</th>
                                <th>quantity</th>
                                <th>scrap_factor</th>
                                <th>unit_ofmeasure</th>
                              </tr>
                            </thead>
                            <tbody>
                              {materials.map((material, index) => (
                                <tr key={index}>
                                  <td>{material.component_id}</td>
                                  <td>{material.quantity}</td>
                                  <td>{material.scrap_factor}</td>
                                  <td>{material.unit_ofmeasure}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </form>
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

export default FinanceAccountingDashboard;
