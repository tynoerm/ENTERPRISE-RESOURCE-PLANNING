import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PurchaseOrderManager = () => {
  const [modalShow, setModalShow] = useState(false);
  const [purchaseorderForm, setPurchaseorderform] = useState([]);
  const [purchaseorderedit, setPurchaseorderedit] = useState({});

  const [selectedPurchaseorder, setSelectedPurchasesorder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [purchaseordernumber, setPurchaseordernumber] = useState("");
  const [date, setDate] = useState("");
  const [buyername, setBuyername] = useState("");
  const [purchaseorderdetails ,setPurchaseorderdetails] = useState("");
  const [buyeraddress, setBuyeraddress] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [paymentmethods, setPaymentmethods] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [supplieraddress, setSupplieraddress] = useState("");
  const [vat, setVatamount] = useState("");
   const [totalprice, setTotalprice] = useState("");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setPurchaseorderedit(a);
    console.log(a);
  };

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/purchaseorders/")
      .then((res) => {
        console.log("Response data:", res.data);
        setPurchaseorderform(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const purchaseorderinsert = {
      purchaseordernumber,
      date,
      buyername,
      purchaseorderdetails,
      buyeraddress,
      createdby,
      paymentmethods,
      suppliername,
      supplieraddress,
      vat,
      totalprice,
    };
    axios
      .post(
        "http://localhost:3001/purchaseorders/create-purchaseorder",
        purchaseorderinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setPurchaseorderform((prev) => [...prev, purchaseorderinsert]);
      });
    setShow(false);
    notify1("Quotation created successfully");
  };

  const notify2 = (message) => toast(message);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/purchaseorders/update-purchaseorder/${purchaseorderedit._id}`,
        purchaseorderedit
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

  const handleCheckboxChange = (purchaseorderId) => {
    setSelectedPurchasesorder((prevSelected) =>
      prevSelected.includes(purchaseorderId)
        ? prevSelected.filter((id) => id !== purchaseorderId)
        : [...prevSelected, purchaseorderId]
    );
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/purchaseorders/download-pdf",
        { selectedPurchaseorder },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "purchaseorder.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the PDF", error);
    }
  };
  const filteredPurchaseorders = purchaseorderForm.filter(
    (purchaseorder) =>
      purchaseorder.createdby &&
      purchaseorder.createdby.toLowerCase().includes(searchTerm.toLowerCase())
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
            <b style={{ color: "white" }}>PURCHASE ORDERS MANAGEMENT</b>
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
          disabled={selectedPurchaseorder.length === 0}
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
          <Modal.Title>GENERATE PURCHASE ORDER</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="inline-form">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label" htmlFor="purchaseordernumber">
                      Purchase Order Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="purchaseordernumber"
                      id="purchaseordernumber"
                      value={purchaseorderForm.purchaseordernumber}
                      onChange={(event) => {
                        setPurchaseordernumber(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="date">
                       Date:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="date"
                      id="date"
                      placeholder="YYYY-MM-DD"
                      value={purchaseorderForm.date}
                      onChange={(event) => {
                        setDate(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="buyername">
                      Buyer Information
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="buyername"
                      id="buyername"
                 
                      value={purchaseorderForm.buyername}
                      onChange={(event) => {
                        setBuyername(event.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Goods Description </label>

                    <textarea
                      className="form-control"
                      name="purchaseorderdetails"
                      id="purchaseorderdetails"
                      value={purchaseorderForm.purchaseorderdetails}
                      onChange={(event) => {
                        setPurchaseorderdetails(event.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" buyeraddress">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="buyeraddress"
                      id="  buyeraddress"
                      value={purchaseorderForm.buyeraddress}
                      onChange={(event) => {
                        setBuyeraddress(event.target.value);
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
                      value={purchaseorderForm.createdby}
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
                    <label className="form-label" htmlFor=" suppliername">
                      Supplier Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="suppliername"
                      id="suppliername"
                      value={purchaseorderForm.suppliername}
                      onChange={(event) => {
                       setSuppliername(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="supplieraddress">
                      Supplier Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name=" supplieraddress"
                      id="supplieraddress"
                      value={purchaseorderForm.supplieraddress}
                      onChange={(event) => {
                      setSupplieraddress(event.target.value);
                      }}
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" vat">
                     Vat/Taxes:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="vat"
                      id="vat"
                      value={purchaseorderForm.vat}
                      onChange={(event) => {
                        setVatamount(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor="totalprice"
                    >
                     Total Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalprice"
                      id=" totalprice"
                      value={purchaseorderForm.totalprice}
                      onChange={(event) => {
                        setTotalprice(event.target.value);
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
          <Modal.Title>EDIT PURCHASE ORDER</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={ handleUpdate}>
              <div className="inline-form">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label" htmlFor="purchaseordernumber">
                      Purchase Order Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="purchaseordernumber"
                      id="purchaseordernumber"
                      value={purchaseorderedit.purchaseordernumber}
                      onChange={(e) =>
                       setPurchaseorderedit({
                          ...purchaseorderedit,
                          purchaseordernumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="date">
                       Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      id="date"
                      placeholder="YYYY-MM-DD"
                      value={purchaseorderedit.date}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="buyername">
                      Buyer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="buyername"
                      id="buyername"
                      placeholder="YYYY-MM-DD"
                      value={purchaseorderedit.buyername}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          buyername: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Purchase Order Details </label>

                    <textarea
                      className="form-control"
                      name="purchaseorderdetails"
                      id="purchaseorderdetails"
                      value={purchaseorderedit.purchaseorderdetails}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          purchaseorderdetails: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor="  sendername">
                     Buyer Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                    name="buyeraddress"
                      id="  buyeraddress"
                      value={purchaseorderedit.buyeraddress}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          buyeraddress: e.target.value,
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
                      value={purchaseorderedit.createdby}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
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
                      Supplier Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="suppliername"
                      id="suppliername"
                      value={purchaseorderedit.suppliername}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          suppliername: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" taxes">
                      Vat
                    </label>
                    <input
                      type="number"
                      className="form-control"
                     name="vat"
                      id="vat"
                      value={purchaseorderedit.vat}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          vat: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col">
                    <label className="form-label" htmlFor=" insurancefees">
                      Total Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalprice"
                      id=" totalprice"
                      value={purchaseorderedit.totalprice}
                      onChange={(e) =>
                        setPurchaseorderedit({
                          ...purchaseorderedit,
                          totalprice: e.target.value,
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
            <th>Purchaseorder Number</th>
            <th>Date</th>        
            <th>Buyer Name</th>
            <th>Purchaseorder Details</th>
            <th>Buyer Address</th>
            <th>Created By</th>

            <th>Payment Methods</th>
            <th>Supplier Name</th>
            <th>Supplier Address</th>
            <th>Vat</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { filteredPurchaseorders.map((purchaseorders, index) => (
            <tr key={purchaseorders._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedPurchaseorder.includes(purchaseorders._id)}
                  onChange={() => handleCheckboxChange(purchaseorders._id)}
                />
              </td>
              <td>{purchaseorders.purchaseordernumber}</td>
              <td>{formatDate(purchaseorders.date)}</td>
              <td>{purchaseorders. buyername}</td>
              <td>{purchaseorders. purchaseorderdetails}</td>
              <td>{purchaseorders. buyeraddress}</td>
              <td>{purchaseorders.createdby}</td>
              <td>{purchaseorders. paymentmethods}</td>
              <td>{purchaseorders.suppliername}</td>
              <td>{purchaseorders.supplieraddress}</td>
              <td>{purchaseorders.vat}</td>
              <td>{purchaseorders.totalprice}</td>
              <td>
              <div style={{ display: 'flex', gap: '10px' }}>
  <Button
    variant="btn btn-primary"
    onClick={() => {
      handleShow1(purchaseorders);
    }}
  >
    Edit
  </Button>
 
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

export default PurchaseOrderManager;
