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
  const [last_updated, setLastupdated] = useState("");
  const [cost_price, setCostprice] = useState("");
  const [selling_price, setSellingprice] = useState("");
  const [supplier_name, setSuppliername] = useState("");

  const handleShow1 = (a) => {
    setShow1(true);
    setItemEdit(a);
    console.log(a);
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
    };
    axios
      .post(
        "http://localhost:3001/inventorymanagement/create-inventory",
        itemInsert
      )
      .then((res) => {
        console.log(res.data);
        setUserForm((prev) => [...prev, itemInsert]);
      });
      setShow(false)
      notify1(" created successfully")
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
        // update userform    
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
        toast.error("Error updating item");
      });
      setShow(false)
      notify2(" edited successfully")
  };

  const notify = (message) => toast(message);
  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/inventorymanagement/delete-inventory/${id}`
      )
      .then(() => {
  
        console.log("Data successfully deleted!");

        setUserForm((prevUserForm) =>
          prevUserForm.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
      setShow(false)
          notify("Deleted Successfully")
  };

  

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:3001/inventorymanagement/generate-csv', {
        responseType: 'blob', // Important to handle binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
}

  return (
    <div>
         <ToastContainer/>
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>INVENTORY MANAGEMENT</b>
          </a>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <div className="d-flex justify-content-end">



      <button  className="btn btn-primary"  onClick={handleDownload}> <FaFileCsv /> &nbsp;Reports</button>
        <Button variant="btn btn-success" onClick={handleShow}>
          <FiEdit /> Create + 1
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Item_Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="item_name"
                  id="item_name"
                  value={item_name}
                  onChange={(event) => {
                    setItemName(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  id="email"
                  value={userForm.category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  value={userForm.quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last_updated</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_updated"
                  id="last_updated"
                  value={userForm.last_updated}
                  onChange={(event) => {
                    setLastupdated(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cost_Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="cost_price"
                  id="cost_price"
                  value={userForm.cost_price}
                  onChange={(event) => {
                    setCostprice(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Selling_Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="selling-price"
                  id="selling_price"
                  value={userForm.selling_price}
                  onChange={(event) => {
                    setSellingprice(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Supplier_Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="supplier_name"
                  id="supplier_name"
                  value={userForm.supplier_name}
                  onChange={(event) => {
                    setSuppliername(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Submit
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
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={onUpdate}>
              <div className="mb-3">
                <label className="form-label">Item_Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="item_name"
                  id="item_name"
                  value={itemEdit.item_name}
                  onChange={(e) =>
                    setItemEdit({ ...itemEdit, item_name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  id="email"
                  value={itemEdit.category}
                  onChange={(e) => {
                    setItemEdit({...itemEdit, category: e.target.value});
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  value={itemEdit.quantity}
                  onChange={(e) => {
                    setItemEdit({...itemEdit, quantity: e.target.value});
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last_updated</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_updated"
                  id="last_updated"
                  value={itemEdit.last_updated}
                  onChange={(e) => {
                    setItemEdit({...itemEdit, last_updated: e.target.value});
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cost_Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="cost_price"
                  id="cost_price"
                  value={itemEdit.cost_price}
                  onChange={(e) => {
                    setItemEdit({...itemEdit, cost_price: e.target.value});
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Selling_Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="selling-price"
                  id="selling_price"
                  value={itemEdit.selling_price}
                  onChange={(e) => {
                    setItemEdit({...itemEdit, selling_price: e.target.value});
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Supplier_Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="supplier_name"
                  id="supplier_name"
                  value={itemEdit.supplier_name}
                  onChange={(e) => {
                    setItemEdit({...itemEdit, supplier_name: e.target.value});
                  }}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>item_name</th>
            <th>category</th>
            <th>quantity</th>
            <th>last_updated</th>
            <th>cost_price</th>
            <th>selling_price</th>
            <th>supplier_name</th>
            <th>action</th>
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
                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(inventorymanagement);
                    }}
                  >
                    Edit
                  </Button>
                  
                    
                    
                  
                    
        
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default InventoryManagement;
