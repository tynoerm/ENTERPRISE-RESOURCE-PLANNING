import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AccountsReceivables = () => {
  const [modalShow, setModalShow] = useState(false);
  const [accountsReceivablesForm, setAccountsReceivablesForm] = useState([]);
  const [formData, setFormData] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setAccountsReceivablesEdit(a);
    console.log(a);
  };
  const handleShow2 = () => setShow2(true);

  const [accountsReceivablesinsert, setAccountsReceivablesinsert] = useState(
    {}
  );
  const [accountsReceivablesEdit, setAccountsReceivablesEdit] = useState({});

  const [customer_information, setCustomersInformation] = useState("");
  const [invoice_details, setInvoiceDetails] = useState("");
  const [payment_information, setPaymentInformation] = useState("");
  const [accounting_codes, setAccountingCodes] = useState("");
  const [aging_information, setAgingInformation] = useState("");
  const [payment_history, setPaymentHistory] = useState("");

  const [InvoiceForm, setInvoiceForm] = useState([]);

  const [dateofinvoice, setDateofinvoice] = useState("");
  const [customername, setCustomername] = useState("");
  const [address, setAddress] = useState("");
  const [itemdescription, setItemdescription] = useState("");
  const [customercontact, setCustomercontact] = useState("");
  const [sellername, setSellername] = useState("");
  const [paymentmethods, setPaymentmethods] = useState("");
  const [vatamount, setVatamount] = useState("");
  const [taxes, setTaxes] = useState("");
  const [discoutapplied, setDiscountapplied] = useState("");
  const [totalamountdue, setTotalamountdue] = useState("");

   const[ selectedAccountsreceivables, setSelectedAccountsreceivables] =  useState([]);


   const handleCheckboxChange = (accountsreceivablesId) => {
    setSelectedAccountsreceivables((prevSelected) =>
      prevSelected.includes(accountsreceivablesId)
        ? prevSelected.filter((id) => id !== accountsreceivablesId)
        : [...prevSelected, accountsreceivablesId]
    );
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/accountsreceivables/download-pdf",
        {  selectedAccountsreceivables},
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the PDF", error);
    }
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/accountsreceivables/")
      .then((res) => {
        setAccountsReceivablesForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountsReceivablesinsert = {
      customer_information,
      invoice_details,
      payment_information,
      accounting_codes,
      aging_information,
      payment_history,
    };
    axios
      .post(
        "http://localhost:3001/accountsreceivables/create_accountsreceivables",
        accountsReceivablesinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setAccountsReceivablesForm((prev) => [
          ...prev,
          accountsReceivablesinsert,
        ]);
      });
    setShow(false);
    notify1("accounts receivables created successfully");
  };

  const notify5 = (message) => toast(message);

  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/accountsreceivables/delete-accountsreceivables/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setAccountsReceivablesForm((prevaccountsReceivablesForm) =>
          prevaccountsReceivablesForm.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    notify5(" deleted successfully");
  };

  const notify2 = (message) => toast(message);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/accountsreceivables/update-accountsreceivables/${accountsReceivablesEdit._id}`,
        accountsReceivablesEdit
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
    notify2("accounts receivables updated successfully");
  };

  const notify3 = (message) => toast(message);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const invoiceinsert = {
      dateofinvoice,
      customername,
      address,
      itemdescription,
      customercontact,
      sellername,
      paymentmethods,
      vatamount,
      taxes,
      discoutapplied,
      totalamountdue,
    };
    axios
      .post(
        "http://localhost:3001/accountsreceivablesinvoice/create-accountsreceivables2",
        invoiceinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setInvoiceForm((prev) => [...prev, invoiceinsert]);
      });

    setShow2(false);
    notify3("standard invoice created successfully");
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/accountsreceivables/generate-csv",
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
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>ACCOUNTS RECEIVABLES</b>
          </a>

          <form className="d-flex" role="search">
            <a className="btn btn-outline-primary " onClick={handleShow2}>
              CREATE INVOICE
            </a>
          
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/AccountsPayablesManager"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  ACCOUNTS PAYABLES
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/AccountsReceivablesManager"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  ACCOUNTS RECEIVABLES
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/ExpenseAccountManager"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  EXPENSE ACCOUNT
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  type="button"
                  class="btn btn-outline-success"
                >
                  LOG OUT
                </Link>
              </li>
           
           
            </ul>
          </form>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
      <Button
          variant="btn btn-primary"
          onClick={downloadPDF}
          disabled={selectedAccountsreceivables.length === 0}
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
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>ACCOUNTS RECEIVABLES MANAGER</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> customer_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_information"
                  id="customer_information"
                  value={accountsReceivablesForm.customer_information}
                  onChange={(event) => {
                    setCustomersInformation(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_details"
                  id="invoice_details"
                  value={accountsReceivablesForm.invoice_details}
                  onChange={(event) => {
                    setInvoiceDetails(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">payment_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="payment_information"
                  id="payment_information"
                  value={accountsReceivablesForm.payment_information}
                  onChange={(event) => {
                    setPaymentInformation(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">accounting_codes</label>
                <input
                  type="text"
                  className="form-control"
                  name="accounting_codes"
                  id="accounting_codes"
                  value={accountsReceivablesForm.accounting_codes}
                  onChange={(event) => {
                    setAccountingCodes(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">aging_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="aging_information"
                  id="aging_information"
                  value={accountsReceivablesForm.aging_information}
                  onChange={(event) => {
                    setAgingInformation(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> payment_history</label>
                <input
                  type="text"
                  className="form-control"
                  name=" payment_history"
                  id=" payment_history"
                  value={accountsReceivablesForm.payment_history}
                  onChange={(event) => {
                    setPaymentHistory(event.target.value);
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
                <label className="form-label"> customer_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_information"
                  id="customer_information"
                  value={accountsReceivablesEdit.customer_information}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      customer_information: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_details"
                  id="invoice_details"
                  value={accountsReceivablesEdit.invoice_details}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      invoice_details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">payment_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="payment_information"
                  id="payment_information"
                  value={accountsReceivablesEdit.payment_information}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      payment_information: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">accounting_codes</label>
                <input
                  type="text"
                  className="form-control"
                  name="accounting_codes"
                  id="accounting_codes"
                  value={accountsReceivablesEdit.accounting_codes}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      accounting_codes: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">aging_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="aging_information"
                  id="aging_information"
                  value={accountsReceivablesEdit.aging_information}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      aging_information: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> payment_history</label>
                <input
                  type="text"
                  className="form-control"
                  name=" payment_history"
                  id=" payment_history"
                  value={accountsReceivablesEdit.payment_history}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      payment_history: e.target.value,
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

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          
          <Modal.Title>STANDARD INVOICE CREATION</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit2}>
              <div className="inline-form">
                <div className="row mb-3">
                  <div className="col">
                  <label className="form-label" htmlFor="customername">
                      Date
                    </label>
                    <div>
                      <div className="form-group">
                        <DatePicker
                          className="form-control"
                          selected={dateofinvoice}
                          onChange={(date) => setDateofinvoice(date)}
                          dateFormat="MM/dd/yyyy"
                          isClearable
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="customername">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="customername"
                      id="customername"
                      value={InvoiceForm.customername}
                      onChange={(event) => {
                        setCustomername(event.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="address"
                      value={InvoiceForm.address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Item Description</label>

                    <textarea
                      className="form-control"
                      name="itemdescription"
                      id="itemdescription"
                      value={InvoiceForm.itemdescription}
                      onChange={(event) => {
                        setItemdescription(event.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" customercontact">
                      Customer Contact
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" customercontact"
                      id=" customercontact"
                      value={InvoiceForm.customercontact}
                      onChange={(event) => {
                        setCustomercontact(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" sellername">
                      Seller Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" sellername"
                      id=" sellername"
                      value={InvoiceForm.sellername}
                      onChange={(event) => {
                        setSellername(event.target.value);
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
                      value={InvoiceForm.vatamount}
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
                      value={InvoiceForm.taxes}
                      onChange={(event) => {
                        setTaxes(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" discountapplied">
                      Discount Applied
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="discountapplied"
                      id="discountapplied"
                      value={InvoiceForm.discoutapplied}
                      onChange={(event) => {
                        setDiscountapplied(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="totalamountdue">
                      Net amount payable
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalamountdue"
                      id="totalamountdue"
                      value={InvoiceForm.totalamountdue}
                      onChange={(event) => {
                        setTotalamountdue(event.target.value);
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

      <table className="table table-striped">
        <thead>
          <tr>
          <th>Select</th>
            <th>customer_information</th>
            <th> invoice_details</th>
            <th>payment_information</th>
            <th> accounting_codes</th>
            <th> aging_information</th>
            <th> payment_history</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {accountsReceivablesForm.map((accountsreceivables, index) => {
            return (
              <tr key={accountsreceivables._id}>
                    <td>
                <input
                  type="checkbox"
                  checked={selectedAccountsreceivables.includes(accountsreceivables._id)}
                  onChange={() => handleCheckboxChange(accountsreceivables._id)}
                />
              </td>
                <td>{accountsreceivables.customer_information}</td>
                <td>{accountsreceivables.invoice_details}</td>
                <td>{accountsreceivables.payment_information}</td>
                <td>{accountsreceivables.accounting_codes}</td>
                <td>{accountsreceivables.aging_information}</td>
                <td>{accountsreceivables.payment_history}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(accountsreceivables);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(accountsreceivables._id)}
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
export default AccountsReceivables;
