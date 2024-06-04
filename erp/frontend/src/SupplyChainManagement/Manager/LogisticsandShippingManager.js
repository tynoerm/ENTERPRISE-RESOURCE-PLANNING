import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LogisticsandShipping = () => {
  const [modalShow, setModalShow] = useState(false);
  const [logisticsandShippingForm, setlogisticsandShippingForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);

  const handleShow1 = (a) => {
    setShow1(true);
    setLogisticsandShippingEdit(a);
    console.log(a);
  };

  const [logisticsandShippinginsert, setLogisticsandShippinginsert] = useState(
    {}
  );
  const [logisticsandShippingEdit, setLogisticsandShippingEdit] = useState({});

  const [sender_details, setSenderdetails] = useState("");
  const [receiver_details, setReceiverdetails] = useState("");
  const [package_dimensions, setPackagedimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [insurance_coverages, setInsurancecoverages] = useState("");
  const [trackingand_notications, setTrackingandnotifications] = useState("");
  const [customsdocumentation, setCustomsdocumentation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/logisticsandShipping/")
      .then((res) => {
        setlogisticsandShippingForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const logisticsandShippinginsert = {
      sender_details,
      receiver_details,
      package_dimensions,
      weight,
      insurance_coverages,
      trackingand_notications,
      customsdocumentation,
    };
    axios
      .post(
        "http://localhost:3001/logisticsandShipping/create-logisticsactivity",
        logisticsandShippinginsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setlogisticsandShippingForm((prev) => [
          ...prev,
          logisticsandShippinginsert,
        ]);
      });
      setShow(false)
            notify1(" created successfully")
  };



  const notify = (message) => toast(message);
  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/logisticsandShipping/delete-logistics/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setlogisticsandShippingForm((prevlogisticsandShippingForm) =>
          prevlogisticsandShippingForm.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
      setShow(false)
          notify("Deleted Successfully")
  };

  const notify2 = (message) => toast(message);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/logisticsandShipping/update-logistics/${logisticsandShippingEdit._id}`,
        logisticsandShippingEdit
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

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/logisticsandShipping/generate-csv",
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
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>LOGISTICS AND SHIPPING</b>
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
          <Modal.Title>LOGISTICS ACTIVITY</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> sender_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="sender_details"
                  id="sender_details"
                  value={logisticsandShippingForm.sender_details}
                  onChange={(event) => {
                    setSenderdetails(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">receiver_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="receiver_details"
                  id="receiver_details"
                  value={logisticsandShippingForm.receiver_details}
                  onChange={(event) => {
                    setReceiverdetails(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">package_dimensions</label>
                <input
                  type="text"
                  className="form-control"
                  name="package_dimensions"
                  id="package_dimensions"
                  value={logisticsandShippingForm.package_dimensions}
                  onChange={(event) => {
                    setPackagedimensions(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">weight</label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                  id="weightd"
                  value={logisticsandShippingForm.weight}
                  onChange={(event) => {
                    setWeight(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">insurance_coverages</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurance_coverages"
                  id="insurance_coverages"
                  value={logisticsandShippingForm.insurance_coverages}
                  onChange={(event) => {
                    setInsurancecoverages(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">trackingand_notications</label>
                <input
                  type="text"
                  className="form-control"
                  name="trackingand_notications"
                  id="trackingand_notications"
                  value={logisticsandShippingForm.trackingand_notications}
                  onChange={(event) => {
                    setTrackingandnotifications(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">customsdocumentation</label>
                <input
                  type="text"
                  className="form-control"
                  name="customsdocumentation"
                  id="customsdocumentation"
                  value={logisticsandShippingForm.customsdocumentation}
                  onChange={(event) => {
                    setCustomsdocumentation(event.target.value);
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
          <Modal.Title>LOGISTICS ACTIVITY</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label"> sender_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="sender_details"
                  id="sender_details"
                  value={logisticsandShippingEdit.sender_details}
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      sender_details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">receiver_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="receiver_details"
                  id="receiver_details"
                  value={logisticsandShippingEdit.receiver_details}
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      receiver_details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">package_dimensions</label>
                <input
                  type="text"
                  className="form-control"
                  name="package_dimensions"
                  id="package_dimensions"
                  value={logisticsandShippingEdit.package_dimensions}
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      package_dimensions: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">weight</label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                  id="weightd"
                  value={logisticsandShippingEdit.weight}
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      item_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">insurance_coverages</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurance_coverages"
                  id="insurance_coverages"
                  value={logisticsandShippingEdit.insurance_coverages}
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      insurance_coverages: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">trackingand_notications</label>
                <input
                  type="text"
                  className="form-control"
                  name="trackingand_notications"
                  id="trackingand_notications"
                  value={logisticsandShippingEdit.trackingand_notications}
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      trackingand_notications: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">customsdocumentation</label>
                <input
                  type="text"
                  className="form-control"
                  name="customsdocumentation"
                  id="customsdocumentation"
                  value={logisticsandShippingEdit.customsdocumentation}
                  o
                  onChange={(e) =>
                    setLogisticsandShippingEdit({
                      ...logisticsandShippingEdit,
                      customsdocumentation: e.target.value,
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
            <th>sender_details</th>
            <th> receiver_details</th>
            <th>package_dimensions</th>
            <th> weight</th>
            <th> insurance_coverages</th>

            <th>customsdocumentation</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {logisticsandShippingForm.map((logisticsandShipping, index) => {
            return (
              <tr key={index}>
                <td>{logisticsandShipping.sender_details}</td>
                <td>{logisticsandShipping.receiver_details}</td>
                <td>{logisticsandShipping.package_dimensions}</td>
                <td>{logisticsandShipping.weight}</td>
                <td>{logisticsandShipping.insurance_coverages}</td>

                <td>{logisticsandShipping.customsdocumentation}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(logisticsandShipping);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(logisticsandShipping._id)}
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
export default LogisticsandShipping;
