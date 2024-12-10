import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import nav from "../../images/nav.jpeg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManufacturingProductionDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
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

  const [selectedItems, setSelectedItems] = useState([]);
  const [show, setShow] = useState(false);
  const [inventoryManagementForm, setInventoryManagementForm] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/inventorymanagement/")
      .then((res) => {
        setInventoryManagementForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCheckboxChange = (item, qualityType) => {
    setSelectedItems((prevSelectedItems) => {
      const itemIndex = prevSelectedItems.findIndex(
        (selectedItem) => selectedItem._id === item._id
      );
      if (itemIndex !== -1) {
        const updatedItems = [...prevSelectedItems];
        updatedItems[itemIndex][qualityType] = !updatedItems[itemIndex][qualityType];
        return updatedItems;
      } else {
        return [...prevSelectedItems, { ...item, [qualityType]: true }];
      }
    });
  };

  const notify1 = (message) => toast(message);
  const handleSubmit = async () => {
    try {
      const response = await axios.put("http://localhost:3001/inventorymanagement/updateSelectedItems", {
        selectedItems,
      });
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setShow(false);
    notify1("Quality Control Checked Successfully ");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/inventorymanagement/${id}`);
      setInventoryManagementForm((prev) =>
        prev.filter((item) => item._id !== id)
      );
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
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
            <MdDashboard /> &nbsp;WAREHOUSE
          </b>
        </a>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link
              className="nav-link btn btn-outline-primary"
              to="/Inventorymanagement"
              type="button"
            >
              Management Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link btn btn-outline-primary"
              onClick={handleShow}
              type="button"
            >
              Quality Control
            </Link>
          </li>
          &nbsp;
          <li className="nav-item">
            <Link
               to = "/"
              className="nav-link btn btn-outline-light"
              
              type="button"
            >
              Log Out
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">INVENTORY</h5>
                <p className="card-text">
                  
                </p>
                <Link to="/InventoryManagement" className="btn btn-primary">
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">DISPATCH FORM</h5>
                <p className="card-text"></p>
                <Link
                  to="/ProductionOrdersManager"
                  className="btn btn-primary"
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
          <div className="col mb-4 shadow-sm p-3 mb-5 bg-body rounded">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="card-body">
                <h5 className="card-title">QUALITY CONTROL</h5>
                <p className="card-text"></p>
                <Button className="btn btn-primary" onClick={handleShow}>
                  Next
                </Button>
              </div>
            </div>

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="xl"
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header
                closeButton
                style={{ backgroundColor: "blue", color: "white" }}
              >
                <Modal.Title>QUALITY CONTROL CHECK</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Last Updated</th>
                      <th>Cost Price</th>
                      <th>Selling Price</th>
                      <th>Supplier Name</th>
                      <th>Low Quality</th>
                      <th>Average Quality</th>
                      <th>High Quality</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryManagementForm.map((inventorymanagement) => (
                      <tr key={inventorymanagement._id}>
                        <td>{inventorymanagement.item_name}</td>
                        <td>{inventorymanagement.category}</td>
                        <td>{inventorymanagement.quantity}</td>
                        <td>{inventorymanagement.last_updated}</td>
                        <td>{inventorymanagement.cost_price}</td>
                        <td>{inventorymanagement.selling_price}</td>
                        <td>{inventorymanagement.supplier_name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              selectedItems.find(
                                (selectedItem) =>
                                  selectedItem._id === inventorymanagement._id
                              )?.lowquality || false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                inventorymanagement,
                                "lowquality"
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              selectedItems.find(
                                (selectedItem) =>
                                  selectedItem._id === inventorymanagement._id
                              )?.averagequality || false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                inventorymanagement,
                                "averagequality"
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              selectedItems.find(
                                (selectedItem) =>
                                  selectedItem._id === inventorymanagement._id
                              )?.highquality || false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                inventorymanagement,
                                "highquality"
                              )
                            }
                          />
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                              variant="btn btn-primary"
                              onClick={handleSubmit}
                            >
                              Submit
                            </Button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(inventorymanagement._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  );
};

export default ManufacturingProductionDashboard;
