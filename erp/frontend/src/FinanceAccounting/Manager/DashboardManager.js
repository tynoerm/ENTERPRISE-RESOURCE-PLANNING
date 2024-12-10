import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import nav from "../../images/nav.jpeg";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const FinanceAccountingDashboard = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [purchaseorderForm, setPurchaseorderform] = useState([]);
  const go = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3001/productionorders/")
      .then((res) => {
        setProductionOrders(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/matrials/")
      .then((res) => {
        setProductionOrders(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/purchaseorders/")
      .then((res) => {
        console.log("Response data:", res.data);
        setPurchaseorderform(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
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

  const onAuthorise = async (u) => {
    await axios
      .post('http://localhost:3001/purchaseorders/auth', { id: u })
      .then((res) => {})
      .catch(() => {});
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
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

  const handleCheckboxChange = async (purchaseOrderId, currentStatus) => {
    const newStatus = currentStatus === 'done' ? 'unauthorised' : 'authorised'; // Toggle status
  
    try {
      const response = await axios.post('http://localhost:3001/purchaseorders/auth', {
        id: purchaseOrderId,
        status: newStatus,
      });
  
      if (response.data.success) {
        setPurchaseorderform((prev) =>
          prev.map((order) =>
            order.purchaseordernumber === purchaseOrderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
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
            <Link
              className="nav-link active btn btn-outline-primary"
              aria-current="page"
              to="/AccountsPayablesManager"
              type="button"
            >
              ACCOUNTS PAYABLES
            </Link>
          </li>
          &nbsp;
          <li className="nav-item">
            <Link
              className="nav-link btn btn-outline-primary"
              to="/AccountsReceivablesManager"
              type="button"
            >
              ACCOUNTS RECEIVABLES
            </Link>
          </li>
          &nbsp;
          <li className="nav-item">
            <Link
              className="nav-link btn btn-outline-primary"
              to="/ExpenseAccountManager"
              type="button"
            >
              EXPENSE ACCOUNT
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-outline-primary"
              onClick={handleShow1}
              type="button"
            >
              AUTHORISE PURCHASE ORDERS
            </Link>
          </li>
          &nbsp;
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-light" to="/" type="button">
              LOG OUT
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">ACCOUNTS PAYABLES</h5>
                </div>
                <p className="card-text">
                 </p>
                <div className="text-center">
                  <Link
                    to="/AccountsPayablesManager"
                    type="button"
                    className="btn btn-primary"
                  >
                    {" "}
                    Next{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">ACCOUNTS RECEIVABLES</h5>
                </div>
                <p className="card-text">
                 </p>
                <div className="text-center">
                  <Link
                    to="/AccountsReceivablesManager"
                    type="button"
                    className="btn btn-primary"
                  >
                    {" "}
                    Next{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">EXPENSE ACCOUNT</h5>
                </div>
                <p className="card-text">
                </p>
                <div className="text-center">
                  <Link
                    to="/ExpenseAccountManager"
                    type="button"
                    className="btn btn-primary"
                  >
                    {" "}
                    Next{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">CHECK PRODUCTION MODULE</h5>
                <p className="card-text">
                 
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
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-success"
                            type="button"
                            onClick={handleShow1}
                          >
                            PURCHASE ORDERS
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
                        <div className="d-grid gap-2">
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
                              {productionOrders.map((productionOrder, index) => (
                                <tr key={index}>
                                  <td>{productionOrder.order_id}</td>
                                  <td>{productionOrder.quantity}</td>
                                  <td>{productionOrder.start_date}</td>
                                  <td>{productionOrder.status}</td>
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
                        <div className="d-grid gap-2">
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
          <div style={footerStyle}>
            <p>&copy; Freight Marks Logistics. All rights reserved.</p>
          </div>
        </div>

        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "blue", color: "white" }}
          >
            <Modal.Title>AUTHORISE PURCHASE ORDER</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Purchaseorder Number</th>
                  <th>Date</th>
                  <th>Buyer Name</th>
                  <th>Purchaseorder Details</th>
                  <th>Buyer Address</th>
                  <th>Created By</th>
                  <th>Payment Methods</th>
                  <th>Supplier Name</th>
                  <th>Supplier Address</th>
                  <th>Status</th>
                  <th>Vat</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {purchaseorderForm.map((purchaseorders, index) => (
                  <tr key={purchaseorders._id}>
                    <td>{purchaseorders.purchaseordernumber}</td>
                    <td>{formatDate(purchaseorders.date)}</td>
                    <td>{purchaseorders.buyername}</td>
                    <td>{purchaseorders.purchaseorderdetails}</td>
                    <td>{purchaseorders.buyeraddress}</td>
                    <td>{purchaseorders.createdby}</td>
                    <td>{purchaseorders.paymentmethods}</td>
                    <td>{purchaseorders.suppliername}</td>
                    <td>{purchaseorders.supplieraddress}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={purchaseorders.status === "done"}
                        onChange={() =>
                          handleCheckboxChange(
                            purchaseorders.purchaseordernumber,
                            purchaseorders.status
                          )
                        }
                      />
                      {purchaseorders.status === "done"
                        ? " authorised"
                        : " unauthorised"}
                    </td>
                    <td>{purchaseorders.vat}</td>
                    <td>{purchaseorders.totalprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FinanceAccountingDashboard;
