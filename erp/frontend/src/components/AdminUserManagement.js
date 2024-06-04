import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import nav from "../images/nav.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUserManagement = () => {
    const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    toast.success("User registered successfully!");
    handleClose();
  };

  return (
    <div>
         <ToastContainer />
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            {" "}
            <MdDashboard /> &nbsp;ADMIN USER MANAGEMENT{" "}
          </b>
        </a>
      </nav>
      <div className="d-flex justify-content-end p-3">
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
          <Modal.Title>CREATE NEW USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">fullname</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  id="fullname"
                  value={fullname}
                  onChange={(event) => setFullname(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">email</label>
                <input
                  type="email"
                  className="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="mb-3">
              <label>Role:</label>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="client">Client</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
              </div>
              <div className="mb-3">
                <label className="form-label">password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              
             
              <div className="mb-3">
                <button type="submit"  className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>




       </div>
    
  );
};

export default AdminUserManagement;
