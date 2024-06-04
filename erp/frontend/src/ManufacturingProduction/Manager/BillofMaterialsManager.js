import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BillofMaterials = () => {
  const [modalShow, setModalShow] = useState(false);
  const [billofmaterialsForm, setBillofmaterials] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setBillofmaterialsEdit(a);
    console.log(a);
  };

  const [billofmaterialsInsert, setBillofmaterialsInsert] = useState({});
  const [billofmaterialsEdit, setBillofmaterialsEdit] = useState({});

  const [component_id, setCustomersid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [scrap_factor, setScrapfactor] = useState("");
  const [unit_ofmeasure, setUnitofmeasure] = useState("");
  const [valid_from, setValidfrom] = useState("");
  const [valid_to, setValidto] = useState("");

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/materials/")
      .then((res) => {
        setBillofmaterials(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const notify1 = (message) => toast(message);
  const handleSubmit = (e) => {
    e.preventDefault();
    const billofmaterialsInsert = {
      component_id,
      quantity,
      scrap_factor,
      unit_ofmeasure,
      valid_from,
      valid_to,
    };
    axios
      .post(
        "https://enterprise-resource-planning.onrender.com/materials/create-materials",
        billofmaterialsInsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setBillofmaterials((prev) => [...prev, billofmaterialsInsert]);
      });
      setShow(false)
      notify1(" created successfully")
  };


  const notify2 = (message) => toast(message);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://enterprise-resource-planning.onrender.com/materials/update-billofmaterials/${billofmaterialsEdit._id}`,
        billofmaterialsEdit
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
      .delete(`https://enterprise-resource-planning.onrender.com/materials/delete-billofmaterials/${id}`)
      .then(() => {
        console.log("Data successfully deleted!");

        setBillofmaterials((prevbillofmaterialsForm) =>
          prevbillofmaterialsForm.filter((item) => item._id !== id)
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
        "https://enterprise-resource-planning.onrender.com/materials/generate-csv",
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
            <b>BILL OF MATERIALS</b>
          </a>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
      <button className="btn btn-primary" onClick={handleDownload}>
          {" "}
          <FaFileCsv /> &nbsp;Reports
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
          <Modal.Title>BILL OF MATERIALS</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> component_id</label>
                <input
                  type="text"
                  className="form-control"
                  name="component_id"
                  id="component_id"
                  value={billofmaterialsForm.component_id}
                  onChange={(event) => {
                    setCustomersid(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">quantity </label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity "
                  id="quantity "
                  value={billofmaterialsForm.quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">scrap_factor</label>
                <input
                  type="text"
                  className="form-control"
                  name="scrap_factor"
                  id="scrap_factor"
                  value={billofmaterialsForm.scrap_factor}
                  onChange={(event) => {
                    setScrapfactor(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">unit_ofmeasure</label>
                <input
                  type="text"
                  className="form-control"
                  name="unit_ofmeasure"
                  id="unit_ofmeasure"
                  value={billofmaterialsForm.unit_ofmeasure}
                  onChange={(event) => {
                    setUnitofmeasure(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">valid_from</label>
                <input
                  type="text"
                  className="form-control"
                  name="valid_from"
                  id="valid_from"
                  value={billofmaterialsForm.valid_from}
                  onChange={(event) => {
                    setValidfrom(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> valid_to</label>
                <input
                  type="text"
                  className="form-control"
                  name=" valid_to"
                  id=" valid_to"
                  value={billofmaterialsForm.valid_to}
                  onChange={(event) => {
                    setValidto(event.target.value);
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
                <label className="form-label"> component_id</label>
                <input
                  type="text"
                  className="form-control"
                  name="component_id"
                  id="component_id"
                  value={billofmaterialsEdit.component_id}
                  onChange={(e) =>
                    setBillofmaterialsEdit({
                      ...billofmaterialsEdit,
                      component_id: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">quantity </label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity "
                  id="quantity "
                  value={billofmaterialsEdit.quantity}
                  onChange={(e) =>
                    setBillofmaterialsEdit({
                      ...billofmaterialsEdit,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">scrap_factor</label>
                <input
                  type="text"
                  className="form-control"
                  name="scrap_factor"
                  id="scrap_factor"
                  value={billofmaterialsEdit.scrap_factor}
                  onChange={(e) =>
                    setBillofmaterialsEdit({
                      ...billofmaterialsEdit,
                      scrap_factor: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">unit_ofmeasure</label>
                <input
                  type="text"
                  className="form-control"
                  name="unit_ofmeasure"
                  id="unit_ofmeasure"
                  value={billofmaterialsEdit.unit_ofmeasure}
                  onChange={(e) =>
                    setBillofmaterialsEdit({
                      ...billofmaterialsEdit,
                      unit_ofmeasure: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">valid_from</label>
                <input
                  type="text"
                  className="form-control"
                  name="valid_from"
                  id="valid_from"
                  value={billofmaterialsEdit.valid_from}
                  onChange={(e) =>
                    setBillofmaterialsEdit({
                      ...billofmaterialsEdit,
                      valid_from: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> valid_to</label>
                <input
                  type="text"
                  className="form-control"
                  name=" valid_to"
                  id=" valid_to"
                  value={billofmaterialsEdit.valid_to}
                  onChange={(e) =>
                    setBillofmaterialsEdit({
                      ...billofmaterialsEdit,
                      valid_to: e.target.value,
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
            <th>component_id</th>
            <th> quantity </th>
            <th>scrap_factor</th>
            <th> unit_ofmeasure</th>
            <th> valid_from</th>
            <th> valid_to</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {billofmaterialsForm.map((materials, index) => {
            return (
              <tr key={index}>
                <td>{materials.component_id}</td>
                <td>{materials.quantity}</td>
                <td>{materials.scrap_factor}</td>
                <td>{materials.unit_ofmeasure}</td>
                <td>{materials.valid_from}</td>
                <td>{materials.valid_to}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(materials);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(materials._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default BillofMaterials;
