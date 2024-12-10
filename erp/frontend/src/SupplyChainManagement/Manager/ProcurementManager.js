
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

    const [suppliername, setSuppliername] = useState("");
    const [address, setAddress] = useState("");
    const [contactdetails, setContactdetails] = useState("");
    const [email, setEmail] = useState("");
    const [qualityratings, setQualityratings] = useState("");
    const [deliveryperformance,setDeliveryperfomance] = useState("");
    const [categoryproducts, setCategoryproducts] = useState("");
    



    useEffect(() => {
        axios
            .get("http://localhost:3001/procurement/")
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
        const procurementinsert = {
            suppliername,
            address,
            contactdetails,
            email,
            qualityratings, 
            deliveryperformance,
            categoryproducts,
            
               }
        axios
            .post("http://localhost:3001/procurement/createpurchaseorder", procurementinsert)
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
            `http://localhost:3001/procurement/update-procurement/${procurementEdit._id}`,
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
          setShow1(false)
          notify2(" edited successfully")
      };

      const notify = (message) => toast(message);
      const handleDelete = async (id) => {
        axios
          .delete(
            `http://localhost:3001/procurement/delete-procurement/${id}`
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
            "http://localhost:3001/procurement/generate-csv",
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
                    <a class="navbar-brand"><b>SUPPLIER MANAGEMENT</b></a>

                    <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/InventoryManagementManager"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Inventory Management
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/ProcurementManager"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Supplier's Information
                </Link>
              </li>
              &nbsp;
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/LogisticsandShippingManager"
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Logistics and Shipping 
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
                  Log Out
                </Link>
              </li>
           
           
            </ul>
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
                    <Modal.Title>ORDER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"> Supplier Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="suppliername"
                                    id="suppliername"
                                    value={procurementForm.suppliername}
                                    onChange={(event) => {setSuppliername(event.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="addresss"
                                    id="address"
                                    value={procurementForm.addresss}
                                    onChange={(event) => {setAddress(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contact Details</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="contactdetails"
                                    id="contactdetails"
                                    value={procurementForm.contactdetails}
                                    onChange={(event) => {setContactdetails(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={procurementForm.email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> Quality Control Ratings</label>
                                <input
                                    type="text"
                                    className="qualityratings"
                                    name="qualityratings"
                                    id="qualityratings"
                                    value={procurementForm.qualityratings}
                                    onChange={(event) => { setQualityratings(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Delivery Perfomance</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="deliveryperfomance"
                                    id="deliveryperformance"
                                    value={procurementForm.deliveryperformance}
                                    onChange={(event) => { setDeliveryperfomance(event.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category Products</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="categoryproducts"
                                    id="categoryproducts"
                                    value={procurementForm.categoryproducts}
                                    onChange={(event) => { setCategoryproducts(event.target.value) }}
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
                                <label className="form-label"> Supplier Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="suppliername"
                                    id="suppliername"
                                    value={procurementEdit.suppliername}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, suppliername: e.target.value })
                                      } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                 name="addresss"
                                    id="address"
                                    value={procurementEdit.address}
                                    onChange={(e) =>
                                        setLogisticsandShippingEdit({ ...logisticsandShippingEdit,address: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contact Details</label>
                                <input
                                    type="number"
                                    className="form-control"
                                     name="contactdetails"
                                    id="contactdetails"
                                    value={procurementEdit.contactdetails}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, contactdetails: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                               name="email"
                                    id="email"
                                    value={procurementEdit.email}
                                    onChange={(e) =>
                                       setProcurementEdit({ ...procurementEdit,email: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">iQuality Control Ratings</label>
                                <input
                                    type="text"
                                    className="form-control"
                                   name="qualityratings"
                                    id="qualityratings"
                                    value={procurementEdit.qualityratings}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit, qualityratings: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Delivery Perfomance</label>
                                <input
                                    type="text"
                               name="deliveryperfomance"
                                    id="deliveryperformance"
                                    value={procurementEdit.deliveryperformance}
                                    onChange={(e) =>
                                        setProcurementEdit({ ...procurementEdit,deliveryperformance: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category Products</label>
                                <input
                                    type="text"
                                    className="form-control"
                                     name="categoryproducts"
                                    id="categoryproducts"
                                    value={procurementEdit.categoryproducts}
                                    onChange={(e) =>
                                       setProcurementEdit({ ...procurementEdit, categoryproducts: e.target.value })
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

                        <th>Supplier Name</th>
                        <th>Address</th>
                        <th>Contact Details</th>
                        <th>Email</th>
                        <th>Quality Control Ratings</th>
                        <th> Delivery Perfomance</th>
                        <th>Category Products</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>

                    {procurementForm.map((procurement, index) => {
                        return <tr key={index}>

                            <td>{procurement.suppliername}</td>
                            <td>{procurement.address}</td>
                            <td>{procurement.contactdetails}</td>
                            <td>{procurement.email}</td>
                            <td>{procurement.qualityratings}</td>
                            <td>{procurement.deliveryperformance}</td>
                            <td>{procurement.categoryproducts}</td>

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

            <div style={footerStyle}>
        <p>&copy; Freight Marks Logistics. All rights reserved.</p>
      </div>
        </div>
    )
}
export default Procurement