import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductionOrders = () => {
  const [modalShow, setModalShow] = useState(false);
  const [productionordersForm, setProductionordersForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);



  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setProductionordersEdit(a);
    console.log(a);
  };

  const [productionordersInsert, setProductionordersInsert] = useState({});
  const [productionordersEdit, setProductionordersEdit] = useState({});

  const [ date,setDateofdispatch] = useState("");
  const [ productname, setProductname] = useState("");
  const [  clientname, setClientname] = useState("");
  const [clientaddress, setClientaddress] = useState("");
  const [category,setCategory] = useState("");
  const [itemdescription, setItemdescription] = useState("");
  const [ quantity, setQuantity] = useState("");
  const [ createdby, setCreatedby] = useState("");

 const [selectedPurchaseorder, setSelectedPurchaseorder] = useState([]);
  
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
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return date.toISOString().split("T")[0]; // Display YYYY-MM-DD
    } catch (error) {
      console.error("Error formatting date:", error);
      return ""; // Handle error case gracefully
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/productionorders/")
      .then((res) => {
        setProductionordersForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleCheckboxChange = (productionordersId) => {
    setSelectedPurchaseorder((prevSelected) =>
      prevSelected.includes(productionordersId)
        ? prevSelected.filter((id) => id !== productionordersId)
        : [...prevSelected, productionordersId]
    );
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/productionorders/download-pdf",
        { selectedPurchaseorder },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "deliverynote.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the PDF", error);
    }
  };


  const notify1 = (message) => toast(message);
  const handleSubmit = (e) => {
    e.preventDefault();
    const productionordersInsert = {
     
     date,
      productname,
      clientname,
      clientaddress,
      category,
      itemdescription,
      quantity,
      createdby,
 
    };
    axios
      .post(
        "http://localhost:3001/productionorders/create-productionorders",
        productionordersInsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setProductionordersForm((prev) => [...prev, productionordersInsert]);
      });

      setShow(false)
      notify1(" created successfully")
  };


  const notify2 = (message) => toast(message);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/productionorders/update-productionorders/${productionordersEdit._id}`,
        productionordersEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        // update userform
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
      });
      setShow(false)
      notify2(" edited successfully")
  };


  const notify = (message) => toast(message);
  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/productionorders/delete-productionorders/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setProductionordersForm((prevproductionordersForm) =>
          prevproductionordersForm.filter((item) => item._id !== id)
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
      const response = await axios.get(
        "http://localhost:3001/productionorders/generate-csv",
        {
          responseType: "blob", // Important to handle binary data
        }
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
       <ToastContainer/>
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>DISPATCH MANAGEMENT</b>
          </a>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
      <button className="btn btn-primary" onClick={downloadPDF}>
          {" "}
          <FaFileCsv /> &nbsp;GENERATE DISPATCH FORM
        </button>
        <Button variant="btn btn-success" onClick={handleShow}>
          Create + 1
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
          <Modal.Title>CREATE DISPATCH </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Date of Dispatch</label>
                <input
                  type="date"
                  className="form-control"
                  name=" date"
                  id=" date"
                  value={productionordersForm. date}
                  onChange={(event) => {
                    setDateofdispatch(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="productname"
                  id="productname"
                  value={productionordersForm.productname}
                  onChange={(event) => {
                    setProductname(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="clientname"
                  id="clientname"
                  value={productionordersForm.clientname}
                  onChange={(event) => {
                    setClientname(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Client Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="clientaddress"
                  id="clientaddress"
                  value={productionordersForm.clientaddress}
                  onChange={(event) => {
                    setClientaddress(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  id="category"
                  value={productionordersForm.category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> Item Description</label>
                <input
                  type="text"
                  className="form-control"
                  name=" itemdescription"
                  id=" itemdescription"
                  value={productionordersForm.itemdescription}
                  onChange={(event) => {
                   setItemdescription(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> Quantity</label>
                <input
                  type="Number"
                  className="form-control"
                  name=" quantity"
                  id=" quantity"
                  value={productionordersForm.quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Created By</label>
                <input
                  type="text"
                  className="form-control"
                  name="createdby"
                  id=" createdby"
                  value={productionordersForm.createdby}
                  onChange={(event) => {
                  setCreatedby(event.target.value);
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
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label"> Date of Dispatch</label>
                <input
                  type="text"
                  className="form-control"
                  name=" date"
                  id=" date"
                  value={productionordersEdit.date}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                     date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
              <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="productname"
                  id="productname"
                  value={productionordersEdit. productname}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                     productname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="clientname"
                  id="clientname"
                  value={productionordersEdit.clientname}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      clientname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Client Address</label>
                <input
                  type="text"
                  className="form-control"
              name="clientaddress"
                  id="clientaddress"
                  value={productionordersEdit.clientaddress}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      clientaddress: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
              <label className="form-label"> Item Description</label>
                <input
                  type="text"
                  className="form-control"
                 name=" itemdescription"
                  id=" itemdescription"
                  value={productionordersEdit.itemdescription}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      itemdescription: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
              <label className="form-label"> Quantity</label>
                <input
                  type="text"
                  className="form-control"
                name=" quantity"
                  id=" quantity"
                  value={productionordersEdit.quantity}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                     quantity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
              <label className="form-label">Created By</label>
                <input
                  type="text"
                  className="form-control"
                name="createdby"
                  id=" createdby"
                  value={productionordersEdit.createdby}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      createdby: e.target.value,
                    })
                  }
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

      <table className="table table-striped">
        <thead>
          <tr>
          <th>Select</th>
            <th>Date of Dispatch</th>
            <th> Production Name</th>
            <th>Client Name</th>
            <th>Client Address</th>
            <th> Category</th>
            <th> Item Datescription</th>
            <th> Quantity</th>
            <th>Created By</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {productionordersForm.map((productionorders, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPurchaseorder.includes(
                      productionorders._id
                    )}
                    onChange={() =>
                      handleCheckboxChange(productionorders._id)
                    }
                  />
                </td>
                <td>{formatDate(productionorders. date)}</td>
                <td>{productionorders.  productname}</td>
                <td>{productionorders.clientname}</td>
                <td>{productionorders.clientaddress}</td>
                <td>{productionorders.category}</td>
                <td>{productionorders. itemdescription}</td>
                <td>{productionorders.quantity}</td>
                <td>{productionorders.createdby}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(productionorders);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(productionorders._id)}
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
export default ProductionOrders;
