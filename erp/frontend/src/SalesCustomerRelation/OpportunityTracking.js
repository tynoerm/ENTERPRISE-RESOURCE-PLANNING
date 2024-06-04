import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const opportunityTracking = () => {
  const [modalShow, setModalShow] = useState(false);
  const [opportunityTrackingForm, setOpportunitytrackingForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setOpportunitytrackingEdit(a);
    console.log(a);
  };

  const [opportunityTrackinginsert, setOpportunityTrackinginsert] = useState(
    {}
  );
  const [opportunityTrackingEdit, setOpportunitytrackingEdit] = useState({});

  const [opportunity_name, setOpportunityname] = useState("");
  const [opportunity_owner, setOpportunityowner] = useState("");
  const [opportunity_stage, setOpportunitystage] = useState("");
  const [opportunity_value, setOpportunityvalue] = useState("");
  const [probability_ofsuccess, setProbabilityofsuccess] = useState("");
  const [expected_close_date, setExpectedclosedate] = useState("");
  const [customer_information, setCustomerinformation] = useState("");
  const [opportunity_source, setOpportunitysource] = useState("");

  useEffect(() => {
    axios
      .get("https://enterprise-resource-planning.onrender.com/opportunitytracking/")
      .then((res) => {
        setOpportunitytrackingForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const opportunityTrackinginsert = {
      opportunity_name,
      opportunity_owner,
      opportunity_stage,
      opportunity_value,
      probability_ofsuccess,
      expected_close_date,
      customer_information,
      opportunity_source,
    };
    axios
      .post(
        "https://enterprise-resource-planning.onrender.com/opportunitytracking/create-opportunitytracking",
        opportunityTrackinginsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setOpportunitytrackingForm((prev) => [
          ...prev,
          opportunityTrackinginsert,
        ]);
      });
      setShow(false)
            notify1(" created successfully")
  };

  const notify2 = (message) => toast(message);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://enterprise-resource-planning.onrender.com/opportunitytracking/update-opportunitytracking/${opportunityTrackingEdit._id}`,
        opportunityTrackingEdit
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
        `https://enterprise-resource-planning.onrender.com/opportunitytracking/delete-opportunitytracking/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setOpportunitytrackingForm((prevopportunityTrackingForm) =>
          prevopportunityTrackingForm.filter((item) => item._id !== id)
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
        "https://enterprise-resource-planning.onrender.com/opportunitytracking/generate-csv",
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
            <b>OPPORTUNITY TRACKING</b>
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
          <Modal.Title>CREATE OPPORTUNITY</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> opportunity_name</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_name"
                  id="opportunity_name"
                  value={opportunityTrackingForm.opportunity_name}
                  onChange={(event) => {
                    setOpportunityname(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opportunity_owner</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_owner"
                  id="opportunity_owner"
                  value={opportunityTrackingForm.opportunity_owner}
                  onChange={(event) => {
                    setOpportunityowner(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opportunity_stage</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_stage"
                  id="opportunity_stage"
                  value={opportunityTrackingForm.opportunity_stage}
                  onChange={(event) => {
                    setOpportunitystage(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opportunity_value</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_value"
                  id="opportunity_value"
                  value={opportunityTrackingForm.opportunity_value}
                  onChange={(event) => {
                    setOpportunityvalue(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">probability_ofsuccess</label>
                <input
                  type="text"
                  className="form-control"
                  name="probability_ofsuccess"
                  id="probability_ofsuccess"
                  value={opportunityTrackingForm.probability_ofsuccess}
                  onChange={(event) => {
                    setProbabilityofsuccess(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> expected_close_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="  expected_close_date"
                  id="  expected_close_date"
                  value={opportunityTrackingForm.expected_close_date}
                  onChange={(event) => {
                    setExpectedclosedate(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">customer_information</label>
                <input
                  type="text"
                  className="form-control"
                  name=" customer_information"
                  id=" customer_information"
                  value={opportunityTrackingForm.customer_information}
                  onChange={(event) => {
                    setCustomerinformation(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> opportunity_source</label>
                <input
                  type="text"
                  className="form-control"
                  name="  opportunity_source"
                  id="  opportunity_source"
                  value={opportunityTrackingForm.opportunity_source}
                  onChange={(event) => {
                    setOpportunitysource(event.target.value);
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
                <label className="form-label"> opportunity_name</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_name"
                  id="opportunity_name"
                  value={opportunityTrackingEdit.opportunity_name}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      opportunity_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opportunity_owner</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_owner"
                  id="opportunity_owner"
                  value={opportunityTrackingEdit.opportunity_owner}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      opportunity_owner: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opportunity_stage</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_stage"
                  id="opportunity_stage"
                  value={opportunityTrackingEdit.opportunity_stage}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      opportunity_stage: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opportunity_value</label>
                <input
                  type="text"
                  className="form-control"
                  name="opportunity_value"
                  id="opportunity_value"
                  value={opportunityTrackingEdit.opportunity_value}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      opportunity_value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">probability_ofsuccess</label>
                <input
                  type="text"
                  className="form-control"
                  name="probability_ofsuccess"
                  id="probability_ofsuccess"
                  value={opportunityTrackingEdit.probability_ofsuccess}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      probability_ofsuccess: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> expected_close_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="  expected_close_date"
                  id="  expected_close_date"
                  value={opportunityTrackingEdit.expected_close_date}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      expected_close_date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">customer_information</label>
                <input
                  type="text"
                  className="form-control"
                  name=" customer_information"
                  id=" customer_information"
                  value={opportunityTrackingEdit.customer_information}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      customer_information: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> opportunity_source</label>
                <input
                  type="text"
                  className="form-control"
                  name="  opportunity_source"
                  id="  opportunity_source"
                  value={opportunityTrackingEdit.opportunity_source}
                  onChange={(e) =>
                    setOpportunitytrackingEdit({
                      ...opportunityTrackingEdit,
                      opportunity_source: e.target.value,
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
            <th>opportunity_name0</th>
            <th> opportunity_owner</th>
            <th>opportunity_stage</th>
            <th> opportunity_value</th>
            <th> probability_ofsuccess</th>
            <th> expected_close_date</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {opportunityTrackingForm.map((opportunitytracking, index) => {
            return (
              <tr key={index}>
                <td>{opportunitytracking.opportunity_name0}</td>
                <td>{opportunitytracking.opportunity_owner}</td>
                <td>{opportunitytracking.opportunity_stage}</td>
                <td>{opportunitytracking.opportunity_value}</td>
                <td>{opportunitytracking.probability_ofsuccess}</td>
                <td>{opportunitytracking.expected_close_date}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(opportunitytracking);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(opportunitytracking._id)}
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
export default opportunityTracking;
