import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MdDashboard } from "react-icons/md";
import nav from "../images/nav.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';

const AdminUserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://enterprise-resource-planning.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users.');
    }
  };

  const handleShow = () => {
    setEditUser(null);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, fullname, email, role, password };
    try {
      const response = await axios.post("https://enterprise-resource-planning.onrender.com/api/register", userData);
      if (response.status === 200) {
        toast.success("User registered successfully!");
        handleClose();
        fetchUsers(); // Refresh the user list
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://enterprise-resource-planning.onrender.com/api/users/${id}`);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  const columns = [
    { name: 'Username', selector: 'username', sortable: true },
    { name: 'Fullname', selector: 'fullname', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'Role', selector: 'role', sortable: true },
    {
      cell: (row) => (
        <>
          <Button variant="warning" onClick={() => alert('Edit functionality not implemented yet')}>Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(row._id)}>Delete</Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <ToastContainer />
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            <MdDashboard /> &nbsp;ADMIN USER MANAGEMENT
          </b>
        </a>
      </nav>
      <div className="d-flex justify-content-end p-3">
        <Button type="button" className="btn btn-success" onClick={handleShow}>
          Create + 1
        </Button>
      </div>

      <ToastContainer />

      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="modal-header">
              <h5 className="modal-title">Register User</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
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

      <div className="container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <DataTable
          title="User Management"
          columns={columns}
          data={users}
          pagination
        />
      </div>
    </div>
  );
};

export default AdminUserManagement;
