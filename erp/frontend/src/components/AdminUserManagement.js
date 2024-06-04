import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import nav from "../images/nav.jpeg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUserManagement = () => {
  const [showModal, setShowModal] = useState(false);
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
        <button
          type="button"
          className="btn btn-success"
          onClick={handleShow}
        >
          Create + 1
        </button>
      </div>

      <ToastContainer />

     
      <div
        className="modal fade show"
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register User</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                  <label>Fullname:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter fullname"
                    value={fullname}
                    onChange={(event) => setFullname(event.target.value)}
                    required
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
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
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
