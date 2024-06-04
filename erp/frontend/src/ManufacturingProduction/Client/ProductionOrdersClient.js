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

  const [order_id, setOrderid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [start_date, setStartdate] = useState("");
  const [end_date, setEnddate] = useState("");
  const [status, setStatus] = useState("");
  const [assigned_employee, setAssignedemployee] = useState("");
  const [last_updated_by, setLastupdatedby] = useState("");
  const [last_updated_date, setLastupdateddate] = useState("");

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/productionorders/")
      .then((res) => {
        setProductionordersForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productionordersInsert = {
      order_id,
      quantity,
      start_date,
      end_date,
      status,
      assigned_employee,
    };
    axios
      .post(
        "https://enterprise-resource-planning.onrender.com/productionorders/create-productionorders",
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
        `https://enterprise-resource-planning.onrender.com/productionorders/update-productionorders/${productionordersEdit._id}`,
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

  const handleDelete = async (id) => {
    axios
      .delete(
        `https://enterprise-resource-planning.onrender.com/productionorders/delete-productionorders/${id}`
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
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "https://enterprise-resource-planning.onrender.com/productionorders/generate-csv",
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
            <b>PRODUCTION ORDERS</b>
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
          <Modal.Title>PRODUCTION </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> order_id</label>
                <input
                  type="text"
                  className="form-control"
                  name="order_id"
                  id="order_id"
                  value={productionordersForm.order_id}
                  onChange={(event) => {
                    setOrderid(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  value={productionordersForm.quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">start_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="start_date"
                  id="start_date"
                  value={productionordersForm.start_date}
                  onChange={(event) => {
                    setStartdate(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">end_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="end_date"
                  id="end_date"
                  value={productionordersForm.end_date}
                  onChange={(event) => {
                    setEnddate(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">status</label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  id="status"
                  value={productionordersForm.status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> assigned_employee</label>
                <input
                  type="text"
                  className="form-control"
                  name=" assigned_employee"
                  id=" assigned_employee"
                  value={productionordersForm.assigned_employee}
                  onChange={(event) => {
                    setAssignedemployee(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> last_updated_by</label>
                <input
                  type="text"
                  className="form-control"
                  name=" last_updated_by"
                  id=" last_updated_by"
                  value={productionordersForm.last_updated_by}
                  onChange={(event) => {
                    setLastupdatedby(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">last_updated_date</label>
                <input
                  type="text"
                  className="form-control"
                  name=" last_updated_date"
                  id=" last_updated_date"
                  value={productionordersForm.last_updated_date}
                  onChange={(event) => {
                    setLastupdateddate(event.target.value);
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
                <label className="form-label"> order_id</label>
                <input
                  type="text"
                  className="form-control"
                  name="order_id"
                  id="order_id"
                  value={productionordersEdit.order_id}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      order_id: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">quantity</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  id="quantity"
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
                <label className="form-label">start_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="start_date"
                  id="start_date"
                  value={productionordersEdit.start_date}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      start_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">end_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="end_date"
                  id="end_date"
                  value={productionordersEdit.end_date}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      end_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">status</label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  id="status"
                  value={productionordersEdit.status}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      status: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> assigned_employee</label>
                <input
                  type="text"
                  className="form-control"
                  name=" assigned_employee"
                  id=" assigned_employee"
                  value={productionordersEdit.assigned_employee}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      assigned_employee: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> last_updated_by</label>
                <input
                  type="text"
                  className="form-control"
                  name=" last_updated_by"
                  id=" last_updated_by"
                  value={productionordersEdit.last_updated_by}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      last_updated_by: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">last_updated_date</label>
                <input
                  type="text"
                  className="form-control"
                  name=" last_updated_date"
                  id=" last_updated_date"
                  value={productionordersEdit.last_updated_date}
                  onChange={(e) =>
                    setProductionordersEdit({
                      ...productionordersEdit,
                      last_updated_date: e.target.value,
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
            <th>order_id</th>
            <th> quantity</th>
            <th>start_date</th>
            <th> end_date</th>
            <th> status</th>
            <th> assigned_employee</th>
            <th> last_updated_by</th>
            <th> last_updated_date</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {productionordersForm.map((productionorders, index) => {
            return (
              <tr key={index}>
                <td>{productionorders.order_id}</td>
                <td>{productionorders.quantity}</td>
                <td>{productionorders.start_date}</td>
                <td>{productionorders.end_date}</td>
                <td>{productionorders.status}</td>
                <td>{productionorders.assigned_employee}</td>
                <td>{productionorders.last_updated_by}</td>
                <td>{productionorders.last_updated_date}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(productionorders);
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
export default ProductionOrders;
