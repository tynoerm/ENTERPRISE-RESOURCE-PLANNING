import React, { useState, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import axios from "axios";
import { TbLogin2 } from "react-icons/tb";
import insuranceImage from "../images/insurance2.jpeg";
import loginImage from "../images/newicon.jpeg";
import nav from "../images/nav.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fmclog from "../images/fmclog.PNG";


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




// Create AuthContext
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = (role) => {
    setUser({ role });
  
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("userDepartment");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login from context

  const [refresh, setRefresh] = useState(false);
 


  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (username && password) {
      axios
        .post("http://localhost:3001/api/login", {
          username,
          password,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);

          if (response.status === 200) {
            login(data.role);

            // Navigate based on the user role
            if (data.role === "admin") {
              navigate("/AdminComponent");
            } else if (data.role === "manager") {
              navigate("/ManagerComponent",{state:{dep:data.department}});
            } else if (data.role === "client") {
              navigate("/UserComponent", {state: {dep:data.department}});
            } else {
              setError("Unknown role");
              toast.error("Unknown role");
            }
          } else {
            setError(data.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setError("Login failed. Please try again later.");
          toast.error("Login failed. Please try again later.");
        });
    } else {
      setError("Please enter username and password");
      toast.error("Please enter username and password");
    }
    setRefresh(prev => !prev);
  };

  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginImage})`, // Replace with your image path
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToastContainer />

      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <img
            src={fmclog}
            alt="Logo"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <b>AUTHENTICATION SECTION</b>
        </a>
      </nav>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flex: 1 }}
      >
        <div
          className="col-md-5 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <h5 className="shadow-sm p-3 mb-5 bg-body rounded">
            <RiLoginBoxFill /> &nbsp; FREIGHT MARKS LOGISTICS
          </h5>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </div>

            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <div className="fw-bold">
            
            </div>
          </form>


          <div style={footerStyle}>
      <p>&copy; Freight Marks Logistics. All rights reserved.</p>
      
    </div>

        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  );
};

export default App;
