import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LeadManagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [leadManagementForm, setLeadmanagementForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

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

  const [lead_source, setLeadsource] = useState("");
  const [lead_status, setLeadstatus] = useState("");
  const [contact_information, setContactinformation] = useState("");
  const [lead_owner, setLeadowner] = useState("");
  const [lead_score, setLeadscore] = useState("");
  const [lead_notes, setLeadnotes] = useState("");
  const [conversion_information, setConversioninformation] = useState("");

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const leadManagementinsert = {
      lead_source,
      lead_status,
      contact_information,
      lead_owner,
      lead_score,
      lead_notes,
      conversion_information,
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
      setShow(false)
      notify1(" created successfully")
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
      setShow(false)
      notify2(" edited successfully")
  };

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
        <ToastContainer/>
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>LEAD MAANAGEMENT</b>
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
          <Modal.Title>CREATE A LEAD</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> lead_source</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_source"
                  id="lead_source"
                  value={setLeadmanagementForm.lead_source}
                  onChange={(event) => {
                    setLeadsource(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">lead_status</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_status"
                  id="lead_status"
                  value={setLeadmanagementForm.lead_status}
                  onChange={(event) => {
                    setLeadstatus(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> contact_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_information"
                  id="contact_information"
                  value={setLeadmanagementForm.contact_information}
                  onChange={(event) => {
                    setContactinformation(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> lead_owner</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_owner"
                  id="lead_owner"
                  value={setLeadmanagementForm.lead_owner}
                  onChange={(event) => {
                    setLeadowner(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> lead_score</label>
                <input
                  type="text"
                  className="form-control"
                  name=" lead_score"
                  id=" lead_score"
                  value={setLeadmanagementForm.lead_score}
                  onChange={(event) => {
                    setLeadscore(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">lead_notes</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_notes"
                  id="lead_notes"
                  value={setLeadmanagementForm.lead_notes}
                  onChange={(event) => {
                    setLeadnotes(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> conversion_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="conversion_information"
                  id="conversion_information"
                  value={setLeadmanagementForm.conversion_information}
                  onChange={(event) => {
                    setConversioninformation(event.target.value);
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
                <label className="form-label"> lead_source</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_source"
                  id="lead_source"
                  value={leadManagementEdit.lead_source}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      lead_source: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">lead_status</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_status"
                  id="lead_status"
                  value={leadManagementEdit.lead_status}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      lead_status: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">contact_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_information"
                  id="contact_information"
                  value={leadManagementEdit.contact_information}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      contact_information: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> lead_owner</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_owner"
                  id="lead_owner"
                  value={leadManagementEdit.lead_owner}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      lead_owner: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> lead_score</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_score"
                  id="lead_score"
                  value={leadManagementEdit.lead_score}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      lead_score: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">lead_notes</label>
                <input
                  type="text"
                  className="form-control"
                  name="lead_notes"
                  id="lead_notes"
                  value={leadManagementEdit.lead_notes}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      lead_notes: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">conversion_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="conversion_information"
                  id="conversion_information"
                  value={leadManagementEdit.conversion_information}
                  onChange={(e) =>
                    setLeadmanagementEdit({
                      ...leadManagementEdit,
                      conversion_information: e.target.value,
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
            <th>lead_source</th>
            <th>lead_status</th>
            <th>contact_information</th>
            <th> lead_owner</th>
            <th>lead_score</th>
            <th>lead_notes</th>
            <th>conversion_information</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {leadManagementForm.map((leadmanagement, index) => {
            return (
              <tr key={index}>
                <td>{leadmanagement.lead_source}</td>
                <td>{leadmanagement.lead_status}</td>
                <td>{leadmanagement.contact_information}</td>
                <td>{leadmanagement.lead_owner}</td>
                <td>{leadmanagement.lead_score}</td>
                <td>{leadmanagement.lead_notes}</td>
                <td>{leadmanagement.conversion_information}</td>

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
    </div>
  );
};
export default LeadManagement;
