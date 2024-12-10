import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InventoryManagement = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);

  const [userForm, setUserForm] = useState([]);
  const [itemEdit, setItemEdit] = useState({});

  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [last_updated, setLastUpdated] = useState("");
  const [cost_price, setCostPrice] = useState("");
  const [selling_price, setSellingPrice] = useState("");
  const [supplier_name, setSupplierName] = useState("");
  const [lowquality, setLowQuality] = useState(false);
  const [averagequality, setAverageQuality] = useState(false);
  const [highquality, setHighQuality] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const handleShow1 = (a) => {
    setShow1(true);
    setItemEdit(a);
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/inventorymanagement/")
      .then((res) => {
        setUserForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const onSubmit = (e) => {
    e.preventDefault();
    const itemInsert = {
      item_name,
      category,
      quantity,
      last_updated,
      cost_price,
      selling_price,
      supplier_name,
      lowquality,
      averagequality,
      highquality
    };
    axios
      .post(
        "http://localhost:3001/inventorymanagement/create-inventory",
        itemInsert
      )
      .then((res) => {
        console.log(res.data);
        setUserForm((prev) => [...prev, itemInsert]);
        setShow(false);
        notify1("Created successfully");
      });
  };

  const notify2 = (message) => toast(message);

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/inventorymanagement/update-inventory/${itemEdit._id}`,
        itemEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        setUserForm((prev) =>
          prev.map((item) => (item._id === itemEdit._id ? itemEdit : item))
        );
        handleClose1();
        notify2("Edited successfully");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        toast.error("Error updating item");
      });
  };

  const notify = (message) => toast(message);

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:3001/inventorymanagement/delete-inventory/${id}`)
      .then(() => {
        console.log("Data successfully deleted!");
        setUserForm((prevUserForm) => prevUserForm.filter((item) => item._id !== id));
        notify("Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/inventorymanagement/generate-csv",
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav className="navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div className="container-fluid">
          <a className="navbar-brand">
            <b>INVENTORY MANAGEMENT</b>
          </a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link active btn btn-outline-primary" to="/InventoryManagementManager">
                Inventory Management
              </Link>
            </li>
            &nbsp;
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-primary" to="/ProcurementManager">
                Supplier's Information
              </Link>
            </li>
            &nbsp;
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-primary" to="/LogisticsandShippingManager">
                Logistics and Shipping
              </Link>
            </li>
            &nbsp;
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success" to="/">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleDownload}>
          <FaFileCsv /> &nbsp;Reports
        </button>
        <Button variant="btn btn-success" onClick={handleShow}>
          <FiEdit /> Create + 1
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>RECEIVE INVENTORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="item_name"
                  value={item_name}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Updated</label>
                <input
                  type="date"
                  className="form-control"
                  name="last_updated"
                  value={last_updated}
                  onChange={(e) => setLastUpdated(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cost Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="cost_price"
                  value={cost_price}
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Selling Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="selling_price"
                  value={selling_price}
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="supplier_name"
                  value={supplier_name}
                  onChange={(e) => setSupplierName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Low Quality</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="lowquality"
                  checked={lowquality}
                  onChange={(e) => setLowQuality(e.target.checked)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Average Quality</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="averagequality"
                  checked={averagequality}
                  onChange={(e) => setAverageQuality(e.target.checked)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">High Quality</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="highquality"
                  checked={highquality}
                  onChange={(e) => setHighQuality(e.target.checked)}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={onUpdate}>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="item_name"
                  value={itemEdit.item_name}
                  onChange={(e) => setItemEdit({ ...itemEdit, item_name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={itemEdit.category}
                  onChange={(e) => setItemEdit({ ...itemEdit, category: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={itemEdit.quantity}
                  onChange={(e) => setItemEdit({ ...itemEdit, quantity: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Updated</label>
                <input
                  type="date"
                  className="form-control"
                  name="last_updated"
                  value={itemEdit.last_updated}
                  onChange={(e) => setItemEdit({ ...itemEdit, last_updated: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cost Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="cost_price"
                  value={itemEdit.cost_price}
                  onChange={(e) => setItemEdit({ ...itemEdit, cost_price: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Selling Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="selling_price"
                  value={itemEdit.selling_price}
                  onChange={(e) => setItemEdit({ ...itemEdit, selling_price: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="supplier_name"
                  value={itemEdit.supplier_name}
                  onChange={(e) => setItemEdit({ ...itemEdit, supplier_name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Low Quality</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="lowquality"
                  checked={itemEdit.lowquality}
                  onChange={(e) => setItemEdit({ ...itemEdit, lowquality: e.target.checked })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Average Quality</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="averagequality"
                  checked={itemEdit.averagequality}
                  onChange={(e) => setItemEdit({ ...itemEdit, averagequality: e.target.checked })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">High Quality</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="highquality"
                  checked={itemEdit.highquality}
                  onChange={(e) => setItemEdit({ ...itemEdit, highquality: e.target.checked })}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

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
          {userForm.map((inventorymanagement, index) => {
            return (
              <tr key={index}>
                <td>{inventorymanagement.item_name}</td>
                <td>{inventorymanagement.category}</td>
                <td>{inventorymanagement.quantity}</td>
                <td>{inventorymanagement.last_updated}</td>
                <td>{inventorymanagement.cost_price}</td>
                <td>{inventorymanagement.selling_price}</td>
                <td>{inventorymanagement.supplier_name}</td>
                <td>{inventorymanagement.lowquality ? "Yes" : "No"}</td>
                <td>{inventorymanagement.averagequality ? "Yes" : "No"}</td>
                <td>{inventorymanagement.highquality ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(inventorymanagement);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(inventorymanagement._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={footerStyle}>
        <p>&copy; Freight Marks Logistics. All rights reserved.</p>
      </div>
    </div>
  );
};

export default InventoryManagement;
