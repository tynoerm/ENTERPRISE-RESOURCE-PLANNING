import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadManagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [leadManagementForm, setLeadmanagementForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [selectedLeadmanagement, setSelectedLeadmanagement] = useState([]);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setLeadmanagementEdit(a);
    console.log(a);
  };

  const [leadManagementinsert, setLeadmanagementinsert] = useState({});
  const [leadManagementEdit, setLeadmanagementEdit] = useState({});

  const [date, setDate] = useState("");
  const [sendername, setSendername] = useState("");
  const [recipient, setRecipient] = useState("");
  const [listofitems, setListofitems] = useState("");
  const [quantityofpackages, setQuantityofpackages] = useState("");
  const [referencename, setReferencename] = useState("");
  const [referencenumber, setReferencenumber] = useState("");

  const [paymentmethods, setPaymentmethods] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/leadmanagement/")
      .then((res) => {
        setLeadmanagementForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleCheckboxChange = (leadmanagementId) => {
    setSelectedLeadmanagement((prevSelected) =>
      prevSelected.includes(leadmanagementId)
        ? prevSelected.filter((id) => id !== leadmanagementId)
        : [...prevSelected, leadmanagementId]
    );
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/leadmanagement/download-pdf",
        { selectedLeadmanagement },
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const leadManagementinsert = {
      date,
      sendername,
      recipient,
      listofitems,
      quantityofpackages,
      referencename,
      referencenumber,
      paymentmethods,
    };
    axios
      .post(
        "http://localhost:3001/leadmanagement/create-lead",
        leadManagementinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setLeadmanagementForm((prev) => [...prev, leadManagementinsert]);
      });
    setShow(false);
    notify1(" created successfully");
  };

  const notify2 = (message) => toast(message);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/leadmanagement/update-leadmanagement/${leadManagementEdit._id}`,
        leadManagementEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        // update userform
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
      });
    setShow(false);
    notify2(" edited successfully");
  };

  const notify = (message) => toast(message);
  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/leadmanagement/delete-leadmanagement/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setLeadmanagementForm((prevleadManagementForm) =>
          prevleadManagementForm.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(false);
    notify("Deleted Successfully");
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
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/leadmanagement/generate-csv",
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
      <ToastContainer />
      <nav
        className="navbar"
        style={{
          backgroundColor: "#004085",
          borderBottom: "1px solid #dee2e6",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "1rem",
          marginBottom: "1.5rem",
          borderRadius: "0.25rem",
        }}
      >
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>DELIVERY NOTES MANAGEMENT</b>
          </a>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={downloadPDF}>
          {" "}
          <FaFileCsv /> &nbsp;GENERATE DELIVERY NOTE
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
          <Modal.Title>CREATE A DELIVERY NOTE</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  value={setLeadmanagementForm.date}
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sender Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="sendername"
                  id="sendername"
                  value={setLeadmanagementForm.sendername}
                  onChange={(event) => {
                    setSendername(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Recipient/Consignee</label>
                <input
                  type="text"
                  className="form-control"
                  name="recipient"
                  id="recipient"
                  value={setLeadmanagementForm.recipient}
                  onChange={(event) => {
                    setRecipient(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">List of Items</label>
                <input
                  type="text"
                  className="form-control"
                  name="listofitems"
                  id="listofitems"
                  value={setLeadmanagementForm.listofitems}
                  onChange={(event) => {
                    setListofitems(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity of Packages</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantityofpackages"
                  id="quantityofpackages"
                  value={setLeadmanagementForm.quantityofpackages}
                  onChange={(event) => {
                    setQuantityofpackages(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Reference Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="referencename"
                  id="referencename"
                  value={setLeadmanagementForm.referencename}
                  onChange={(event) => {
                    setReferencename(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Reference Contact Number</label>
                <input
                  type="Number"
                  className="form-control"
                  name="referencenumber"
                  id="referencenumber"
                  value={setLeadmanagementForm.referencenumber}
                  onChange={(event) => {
                    setReferencenumber(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                    <label className="form-label">Payment Methods</label>
                    <select
                      className="form-control"
                      value={paymentmethods}
                      onChange={(event) =>
                        setPaymentmethods(event.target.value)
                      }
                      required
                    >
                      <option value="">select payment method</option>
                      <option value="debitcards">Debit Cards</option>
                      <option value="creditcards">Credit Cards</option>
                      <option value="cash">Cash Payment</option>
                      <option value="ecocashpayment">Ecocash Payment</option>
                    </select>
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
                <label className="form-label"> Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  value={leadManagementEdit.date}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sender Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="sendername"
                  id="sendername"
                  value={leadManagementEdit.sendername}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      sendername: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Recipient</label>
                <input
                  type="text"
                  className="form-control"
                  name="recipient"
                  id="recipient"
                  value={leadManagementEdit.recipient}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      recipient: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> List of Items</label>
                <input
                  type="text"
                  className="form-control"
                  name="listofitems"
                  id="listofitems"
                  value={leadManagementEdit.listofitems}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      listofitems: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> Quantity of Packages</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantityofpackages"
                  id="quantityofpackages"
                  value={leadManagementEdit.quantityofpackages}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      quantityofpackages: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> Reference Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="referencename"
                  id="referencename"
                  value={leadManagementEdit.referencename}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      referencename: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> Reference Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="referencenumber"
                  id="referencenumber"
                  value={leadManagementEdit.referencenumber}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      referencenumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                    <label className="form-label">Payment Methods</label>
                    <select
                      className="form-control"
                      value={paymentmethods}
                      onChange={(event) =>
                        setPaymentmethods(event.target.value)
                      }
                      required
                    >
                      <option value="">select payment method</option>
                      <option value="debitcards">Debit Cards</option>
                      <option value="creditcards">Credit Cards</option>
                      <option value="cash">Cash Payment</option>
                      <option value="ecocashpayment">Ecocash Payment</option>
                    </select>
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
            <th>Date</th>
            <th>Sender/shipper Name</th>
            <th>Recipient/Consignee Name</th>
            <th>List of Items</th>
            <th>Quantity of Packages</th>
            <th>Receiver Name</th>
            <th>Reference Number</th>
            <th>Payment Methods</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {leadManagementForm.map((leadmanagement, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedLeadmanagement.includes(
                      leadmanagement._id
                    )}
                    onChange={() =>
                      handleCheckboxChange(leadmanagement._id)
                    }
                  />
                </td>
                <td>{formatDate(leadmanagement.date)}</td>
                <td>{leadmanagement.sendername}</td>
                <td>{leadmanagement.recipient}</td>
                <td>{leadmanagement.listofitems}</td>
                <td>{leadmanagement.quantityofpackages}</td>
                <td>{leadmanagement.referencename}</td>
                <td>{leadmanagement.referencenumber}</td>
                <td>{leadmanagement.paymentmethods}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(leadmanagement);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(leadmanagement._id)}
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
export default LeadManagement;
