import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const salesForecasting = () => {
  const [modalShow, setModalShow] = useState(false);
  const [salesFocustingForm, setSalesfocustingForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setSalesfocustingEdit(a);
    console.log(a);
  };

  const [salesFocustinginsert, setSalesfocustinginsert] = useState({});
  const [salesFocustingEdit, setSalesfocustingEdit] = useState({});

  const [forecast_period, setForecastperiod] = useState("");
  const [product, setProduct] = useState("");
  const [forecast_amount, setForecastamount] = useState("");
  const [sales_territory, setSalesterritory] = useState("");
  const [sales_representatives, setSalesrepresentatives] = useState("");
  const [growth_rate, setGrowthrate] = useState("");
  const [seasonality, setSeasonality] = useState("");
  const [forecast_approval_status, setForecastapprovalstatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/salesfocusting/")
      .then((res) => {
        setSalesfocustingForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const notify1 = (message) => toast(message);
  const handleSubmit = (e) => {
    e.preventDefault();
    const salesFocustinginsert = {
      forecast_period,
      product,
      forecast_amount,
      sales_territory,
      sales_representatives,
      growth_rate,
      seasonality,
      forecast_approval_status,
    };
    axios
      .post(
        "http://localhost:3001/salesfocusting/create-salesfocusting",
        salesFocustinginsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setSalesfocustingForm((prev) => [...prev, salesFocustinginsert]);
      });
      setShow(false)
            notify1(" created successfully")
  };


  const notify2 = (message) => toast(message);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/salesfocusting/update-salesfocusting/${salesFocustingEdit._id}`,
        salesFocustingEdit
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
        `http://localhost:3001/salesfocusting/delete-salesfocusting/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setSalesfocustingForm((prevsalesFocustingForm) =>
          prevsalesFocustingForm.filter((item) => item._id !== id)
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
        "http://localhost:3001/salesfocusting/generate-csv",
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
            <b>SALES FOCUSTING</b>
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
                <label className="form-label"> forecast_period</label>
                <input
                  type="text"
                  className="form-control"
                  name="forecast_period"
                  id="forecast_period"
                  value={salesFocustingForm.forecast_period}
                  onChange={(event) => {
                    setForecastperiod(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">product</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  id="product"
                  value={salesFocustingForm.product}
                  onChange={(event) => {
                    setProduct(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">forecast_amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="forecast_amount"
                  id="forecast_amount"
                  value={salesFocustingForm.forecast_amount}
                  onChange={(event) => {
                    setForecastamount(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">sales_territory</label>
                <input
                  type="text"
                  className="form-control"
                  name="sales_territory"
                  id="sales_territory"
                  value={salesFocustingForm.sales_territory}
                  onChange={(event) => {
                    setSalesterritory(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">sales_representatives</label>
                <input
                  type="text"
                  className="form-control"
                  name="sales_representatives"
                  id="sales_representatives"
                  value={salesFocustingForm.sales_representatives}
                  onChange={(event) => {
                    setSalesrepresentatives(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> growth_rate</label>
                <input
                  type="text"
                  className="form-control"
                  name="  growth_rate"
                  id="  growth_rate"
                  value={salesFocustingForm.growth_rate}
                  onChange={(event) => {
                    setGrowthrate(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">seasonality</label>
                <input
                  type="text"
                  className="form-control"
                  name=" seasonality"
                  id=" seasonality"
                  value={salesFocustingForm.seasonality}
                  onChange={(event) => {
                    setSeasonality(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> forecast_approval_status</label>
                <input
                  type="text"
                  className="form-control"
                  name="  forecast_approval_status"
                  id="  forecast_approval_status"
                  value={salesFocustingForm.forecast_approval_status}
                  onChange={(event) => {
                    setForecastapprovalstatus(event.target.value);
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
                <label className="form-label"> forecast_period</label>
                <input
                  type="text"
                  className="form-control"
                  name="forecast_period"
                  id="forecast_period"
                  value={salesFocustingEdit.forecast_period}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      forecast_period: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">product</label>
                <input
                  type="text"
                  className="form-control"
                  name="product"
                  id="product"
                  value={salesFocustingEdit.product}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      product: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">forecast_amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="forecast_amount"
                  id="forecast_amount"
                  value={salesFocustingEdit.forecast_amount}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      forecast_amount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">sales_territory</label>
                <input
                  type="text"
                  className="form-control"
                  name="sales_territory"
                  id="sales_territory"
                  value={salesFocustingEdit.sales_territory}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      sales_territory: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">sales_representatives</label>
                <input
                  type="text"
                  className="form-control"
                  name="sales_representatives"
                  id="sales_representatives"
                  value={salesFocustingEdit.sales_representatives}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      sales_representatives: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> growth_rate</label>
                <input
                  type="text"
                  className="form-control"
                  name="  growth_rate"
                  id="  growth_rate"
                  value={salesFocustingEdit.growth_rate}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      growth_rate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">seasonality</label>
                <input
                  type="text"
                  className="form-control"
                  name=" seasonality"
                  id=" seasonality"
                  value={salesFocustingEdit.seasonality}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      seasonality: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> forecast_approval_status</label>
                <input
                  type="text"
                  className="form-control"
                  name="  forecast_approval_status"
                  id="  forecast_approval_status"
                  value={salesFocustingEdit.forecast_approval_status}
                  onChange={(e) =>
                    setSalesfocustingEdit({
                      ...salesFocustingEdit,
                      forecast_approval_status: e.target.value,
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
            <th>forcast_period</th>
            <th> product</th>
            <th>forecast_amount</th>
            <th> sales_territory</th>
            <th> sales_representatives</th>
            <th> growth_rate</th>
            <th>seasonality</th>
            <th> forecast_approval_status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {salesFocustingForm.map((salesfocusting, index) => {
            return (
              <tr key={index}>
                <td>{salesfocusting.forecast_period}</td>
                <td>{salesfocusting.product}</td>
                <td>{salesfocusting.forecast_amount}</td>
                <td>{salesfocusting.sales_territory}</td>
                <td>{salesfocusting.sales_representatives}</td>
                <td>{salesfocusting.growth_rate}</td>
                <td>{salesfocusting.seasonality}</td>
                <td>{salesfocusting.forecast_approval_status}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(salesfocusting);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(salesfocusting._id)}
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
export default salesForecasting;
