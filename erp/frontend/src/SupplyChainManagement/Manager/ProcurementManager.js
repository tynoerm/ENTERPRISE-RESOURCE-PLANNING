
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Procurement = () => {

    const [modalShow, setModalShow] = useState(false);
    const [procurementForm, setProcurementForm] = useState([]);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);

    const handleShow1 = (a) => { setShow1(true); setProcurementEdit(a); console.log(a) }

    const [procurementinsert, setProcurementinsert] = useState({});
    const [procurementEdit, setProcurementEdit] = useState({})

    const [purchase_order_date, setPurchaseorderdate] = useState("");
    const [buyer_information, setBuyerinformation] = useState("");
    const [delivery_address, setDeliveryaddress] = useState("");
    const [payment_terms, setPaymentterms] = useState("");
    const [item_description, setItemdescription] = useState("");
    const [selling_price, setSellingprice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit_price, setUnitprice] = useState("");
    const [sub_total, setSubtotal] = useState("");
    const [delivery_date, setDeliverydate] = useState("");
    const [warrant_information, setWarrantinformation] = useState("");
    const [approvals, setApprovals] = useState("");




    useEffect(() => {
        axios
            .get("https://enterprise-resource-planning.onrender.com/procurement/")
            .then((res) => {
                setProcurementForm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    const notify1 = (message) => toast(message);

    const handleSubmit = (e) => {
        e.preventDefault();
        const procurementinsert = { purchase_order_date, buyer_information, delivery_address, payment_terms, item_description, selling_price, quantity, unit_price, sub_total, delivery_date, warrant_information, approvals }
        axios
            .post("https://enterprise-resource-planning.onrender.com/procurement/createpurchaseorder", procurementinsert)
            .then((res) => {
                console.log({ status: res.status });
                setProcurementForm(prev => [...prev, procurementinsert])
            });
            setShow(false)
            notify1(" created successfully")
    }

    const notify2 = (message) => toast(message);
    const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(
            `https://enterprise-resource-planning.onrender.com/procurement/update-procurement/${procurementEdit._id}`,
            procurementEdit
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
            `https://enterprise-resource-planning.onrender.com/procurement/delete-procurement/${id}`
          )
          .then(() => {
      
            console.log("Data successfully deleted!");
    
            setProcurementForm((prevprocurementForm) =>
              prevprocurementForm.filter((item) => item._id !== id)
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
            "https://enterprise-resource-planning.onrender.com/procurement/generate-csv",
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
            <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded" >
                <div class="container-fluid">
                    <a class="navbar-brand"><b>PROCUREMENT</b></a>
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
                    <Modal.Title>CREATE PURCHASE ORDER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"> purchase_order_date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="item_name"
                                    id="item_name"
                                    value={procurementForm.purchase_order_date}
                                    onChange={(event) => { setPurchaseorderdate(event.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">buyer_information</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    id="email"
                                    value={procurementForm.buyer_information}
                                    onChange={(event) => { setBuyerinformation(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">delivery_address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="quantity"
                                    id="quantity"
                                    value={procurementForm.delivery_address}
                                    onChange={(event) => { setDeliveryaddress(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">payment_terms</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_updated"
                                    id="last_updated"
                                    value={procurementForm.payment_terms}
                                    onChange={(event) => { setPaymentterms(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">item_description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cost_price"
                                    id="cost_price"
                                    value={procurementForm.item_description}
                                    onChange={(event) => { setItemdescription(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="selling-price"
                                    id="selling_price"
                                    value={procurementForm.quantity}
                                    onChange={(event) => { setQuantity(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">unit_price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="supplier_name"
                                    id="supplier_name"
                                    value={procurementForm.unit_price}
                                    onChange={(event) => { setUnitprice(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">sub_total</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="supplier_name"
                                    id="supplier_name"
                                    value={procurementForm.sub_total}
                                    onChange={(event) => { setSubtotal(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">delivery_date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="supplier_name"
                                    id="supplier_name"
                                    value={procurementForm.delivery_date}
                                    onChange={(event) => { setDeliverydate(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">warrant_information</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="supplier_name"
                                    id="supplier_name"
                                    value={procurementForm.warrant_information}
                                    onChange={(event) => { setWarrantinformation(event.target.value) }}
                                />
                            </div>


                            <div className="mb-3">
                                <label className="form-label">approvals</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="supplier_name"
                                    id="supplier_name"
                                    value={procurementForm.approvals}
                                    onChange={(event) => { setApprovals(event.target.value) }}
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

                <Modal.Footer>

                </Modal.Footer>
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
                                <label className="form-label"> purchase_order_date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="purchase_order_date"
                                    id="purchase_order_date"
                                    value={procurementEdit.purchase_order_date}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, purchase_order_date: e.target.value })
                                      } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">buyer_information</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="buyer_information"
                                    id="buyer_information"
                                    value={procurementEdit.buyer_information}
                                    onChange={(e) =>
                                        setLogisticsandShippingEdit({ ...logisticsandShippingEdit, receiver_details: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">delivery_address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="delivery_address"
                                    id="delivery_address"
                                    value={procurementEdit.delivery_address}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, delivery_address: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">payment_terms</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="payment_terms"
                                    id="payment_terms"
                                    value={procurementEdit.payment_terms}
                                    onChange={(e) =>
                                       setProcurementEdit({ ...procurementEdit,payment_terms: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">item_description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="item_description"
                                    id="item_description"
                                    value={procurementEdit.item_description}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, item_description: e.target.value })
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
                                    value={procurementEdit.quantity}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, quantity: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">unit_price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="unit_price"
                                    id="unit_price"
                                    value={procurementEdit.unit_price}
                                    onChange={(e) =>
                                       setProcurementEdit({ ...procurementEdit, unit_price: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">sub_total</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="sub_total"
                                    id="sub_total"
                                    value={procurementEdit.sub_total}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, sub_total: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">delivery_date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="delivery_date"
                                    id="delivery_date"
                                    value={procurementEdit.delivery_date}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit,delivery_date: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">warrant_information</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="warrant_information"
                                    id="warrant_information"
                                    value={procurementEdit.warrant_information}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, warrant_information: e.target.value })
                                      }
                                />
                            </div>


                            <div className="mb-3">
                                <label className="form-label">approvals</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="approvals"
                                    id="approvals"
                                    value={procurementEdit.approvals}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, approvals: e.target.value })
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

                <Modal.Footer>

                </Modal.Footer>
            </Modal>







            <table className="table table-striped">
                <thead>
                    <tr>

                        <th>purchase_order_date</th>
                        <th> buyer_information</th>
                        <th>supplier_information</th>
                        <th> delivery_address</th>
                        <th> payment_terms</th>
                        <th> sub_total</th>
                        <th>approvals</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>

                    {procurementForm.map((procurement, index) => {
                        return <tr key={index}>

                            <td>{procurement.purchase_order_date}</td>
                            <td>{procurement.buyer_information}</td>
                            <td>{procurement.supplier_information}</td>
                            <td>{procurement.delivery_address}</td>
                            <td>{procurement.payment_terms}</td>
                            <td>{procurement.sub_total}</td>
                            <td>{procurement.approvals}</td>

                            <td>


                                <Button variant="btn btn-primary" onClick={() => { handleShow1(procurement) }}>
                                    Edit
                                </Button>
                                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(procurement._id)}
                  >
                    Delete
                  </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>


        </div>
    )
}
export default Procurement