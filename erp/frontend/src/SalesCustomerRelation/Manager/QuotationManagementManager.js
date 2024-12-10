import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuotationManagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [quotationForm, setQuotationForm] = useState([]);
  const [quotationEdit, setQuotationEdit] = useState({});

  const [selectedQuotations, setSelectedQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [quotationnumber, setQuotationnumber] = useState("");
  const [currentdate, setCurrentdate] = useState("");
  const [expirydate, setExpirydate] = useState("");
  const [goodsdescription, setGoodsdescription] = useState("");
  const [sendername, setSendername] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [paymentmethods, setPaymentmethods] = useState("");
  const [vatamount, setVatamount] = useState("");
  const [taxes, setTaxes] = useState("");
  const [insurancefees, setInsurancefees] = useState("");
  const [totalfreightcharges, setTotalfreightcharges] = useState("");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setQuotationEdit(a);
    console.log(a);
  };

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/quotationmanagement/")
      .then((res) => {
        console.log("Response data:", res.data);
        setQuotationForm(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const quotationinsert = {
      quotationnumber,
      currentdate,
      expirydate,
      goodsdescription,
      sendername,
      createdby,
      paymentmethods,
      vatamount,
      taxes,
      insurancefees,
      totalfreightcharges,
    };
    axios
      .post(
        "http://localhost:3001/quotationmanagement/create-quotation",
        quotationinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setQuotationForm((prev) => [...prev, quotationinsert]);
      });
    setShow(false);
    notify1("Quotation created successfully");
  };

  const notify2 = (message) => toast(message);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/quotationmanagement/update-quotation/${quotationEdit._id}`,
        quotationEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
      });
    setShow1(false);
    notify2("Quotation updated successfully");
  };

  const handleCheckboxChange = (quotationId) => {
    setSelectedQuotations((prevSelected) =>
      prevSelected.includes(quotationId)
        ? prevSelected.filter((id) => id !== quotationId)
        : [...prevSelected, quotationId]
    );
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/quotationmanagement/download-pdf",
        { selectedQuotations },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "quotations.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the PDF", error);
    }
  };

  const filteredQuotations = quotationForm.filter(
    (quotation) =>
      quotation.createdby &&
      quotation.createdby.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toISOString().split('T')[0]; // Display YYYY-MM-DD
    } catch (error) {
      console.error('Error formatting date:', error);
      return ''; // Handle error case gracefully
    }
  };

  const notify = (message) => toast(message);
  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/quotationmanagement/delete-quotationmanagement/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setQuotationForm((prevquotationForm) =>
          prevquotationForm.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
      setShow(false)
      notify("Deleted Successfully")
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
        <div className="container-fluid">
          <a className="navbar-brand">
            <b style={{ color: "white" }}>QUOTATION MANAGEMENT</b>
          </a>
          <form className="d-flex align-items-center" role="search">
            <input
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="search by createdby"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ maxWidth: "200px" }} // Adjust the width as needed
            />
          </form>
       
          <Button href="/" className="btn btn-success">
            Log Out
          </Button>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
        <Button
          variant="btn btn-primary"
          onClick={downloadPDF}
          disabled={selectedQuotations.length === 0}
        >
          Download Selected as PDF
        </Button>
        <Button variant="btn btn-success" onClick={handleShow}>
          Create + 1
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "blue", color: "white" }}
        >
          <Modal.Title>GENERATE QUOTATION</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="inline-form">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label" htmlFor="quotationnumber">
                      Quotation Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="quotationnumber"
                      id="quotationnumber"
                      value={quotationForm.quotationnumber}
                      onChange={(event) => {
                        setQuotationnumber(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="currentdate">
                      Current Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="currentdate"
                      id="currentdate"
                      placeholder="YYYY-MM-DD"
                      value={quotationForm.currentdate}
                      onChange={(event) => {
                        setCurrentdate(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="expirydate">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="expirydate"
                      id="expirydate"
                      placeholder="YYYY-MM-DD"
                      value={quotationForm.expirydate}
                      onChange={(event) => {
                        setExpirydate(event.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Goods Description </label>

                    <textarea
                      className="form-control"
                      name="goodsdescription"
                      id="goodsdescription"
                      value={quotationForm.goodsdescription}
                      onChange={(event) => {
                        setGoodsdescription(event.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="  sendername">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" sendername"
                      id="  sendername"
                      value={quotationForm.sendername}
                      onChange={(event) => {
                        setSendername(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" createdby">
                      Created by:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" createdby"
                      id=" createdby"
                      value={quotationForm.createdby}
                      onChange={(event) => {
                        setCreatedby(event.target.value);
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

                  <div className="col">
                    <label className="form-label" htmlFor=" vatamount">
                      (VAT)amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="vatamount"
                      id="vatamount"
                      value={quotationForm.vatamount}
                      onChange={(event) => {
                        setVatamount(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" taxes">
                      Gross total amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" taxes"
                      id=" taxes"
                      value={quotationForm.taxes}
                      onChange={(event) => {
                        setTaxes(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" insurancefees">
                      Discount Applied
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="insurancefees"
                      id="insurancefees"
                      value={quotationForm.insurancefees}
                      onChange={(event) => {
                        setInsurancefees(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor=" totalfreightcharges"
                    >
                      Total Freight Charges
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name=" totalfreightcharges"
                      id=" totalfreightcharges"
                      value={quotationForm.totalfreightcharges}
                      onChange={(event) => {
                        setTotalfreightcharges(event.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
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
        size="xl"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "blue", color: "white" }}
        >
          <Modal.Title>EDIT QUOTATION</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={ handleUpdate}>
              <div className="inline-form">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label" htmlFor="quotationnumber">
                      Quotation Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="quotationnumber"
                      id="quotationnumber"
                      value={quotationEdit.quotationnumber}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          quotationnumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="currentdate">
                      Current Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="currentdate"
                      id="currentdate"
                      placeholder="YYYY-MM-DD"
                      value={quotationEdit.currentdate}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          currentdate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="expirydate">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="expirydate"
                      id="expirydate"
                      placeholder="YYYY-MM-DD"
                      value={quotationEdit.expirydate}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          expirydate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Goods Description </label>

                    <textarea
                      className="form-control"
                      name="goodsdescription"
                      id="goodsdescription"
                      value={quotationEdit.goodsdescription}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          goodsdescription: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="  sendername">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" sendername"
                      id="  sendername"
                      value={quotationEdit.sendername}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          sendername: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" createdby">
                      Created by:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" createdby"
                      id=" createdby"
                      value={quotationEdit.createdby}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          createdby: e.target.value,
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

                  <div className="col">
                    <label className="form-label" htmlFor=" vatamount">
                      (VAT)amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="vatamount"
                      id="vatamount"
                      value={quotationEdit.vatamount}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          vatamount: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" taxes">
                      Gross total amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" taxes"
                      id=" taxes"
                      value={quotationEdit.taxes}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          taxes: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" insurancefees">
                      Discount Applied
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="insurancefees"
                      id="insurancefees"
                      value={quotationEdit.insurancefees}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          insurancefees: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor=" totalfreightcharges"
                    >
                      Total Freight Charges
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name=" totalfreightcharges"
                      id=" totalfreightcharges"
                      value={quotationEdit.totalfreightcharges}
                      onChange={(e) =>
                        setQuotationEdit({
                          ...quotationEdit,
                          totalfreightcharges: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
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
            <th>Quotation Number</th>
            <th>Current Date</th>
            <th>Expiry Date</th>
            <th>Goods Description</th>
            <th>Sender Name</th>
            <th>CreatedBy</th>
            <th>Payment Methods</th>
            <th>VAT Amount</th>
            <th>Gross Total Amount</th>
            <th>Discount Applied</th>
            <th>Total Freight Charges</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotations.map((quotationmanagement, index) => (
            <tr key={quotationmanagement._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedQuotations.includes(quotationmanagement._id)}
                  onChange={() => handleCheckboxChange(quotationmanagement._id)}
                />
              </td>
              <td>{quotationmanagement.quotationnumber}</td>
              <td>{formatDate(quotationmanagement.currentdate)}</td>
              <td>{formatDate(quotationmanagement.expirydate)}</td>
              <td>{quotationmanagement.goodsdescription}</td>
              <td>{quotationmanagement.sendername}</td>
              <td>{quotationmanagement.createdby}</td>
              <td>{quotationmanagement.paymentmethods}</td>
              <td>{quotationmanagement.vatamount}</td>
              <td>{quotationmanagement.taxes}</td>
              <td>{quotationmanagement.insurancefees}</td>
              <td>{quotationmanagement.totalfreightcharges}</td>
              <td>
              <div style={{ display: 'flex', gap: '10px' }}>
  <Button
    variant="btn btn-primary"
    onClick={() => {
      handleShow1(quotationmanagement);
    }}
  >
    Edit
  </Button>
  <button
    className="btn btn-danger"
    onClick={() => handleDelete(quotationmanagement._id)}
    style={{ padding: '5px 10px' }} // Optional: Set padding for button styling
  >
    Delete
  </button>
</div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          backgroundColor: "navy",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
        }}
      >
        <p>&copy; Freight Marks Logistics. All rights reserved.</p>
      </div>
    </div>
  );
};

export default QuotationManagement;
