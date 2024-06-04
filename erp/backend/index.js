import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import createError from "http-errors";
import session from "express-session";
import bcrypt from "bcrypt";

// Express Route

//register

//supply chain routes
import { InventoryManagementRoutes } from './Routes/InventoryManagementRoutes.js';
import { ProcurementRoutes } from "./Routes/SupplyChainManagement/ProcurementRoutes.js";
import { logisticsandShippingRoutes } from "./Routes/SupplyChainManagement/logisticsandShippingRoutes.js";

//Human Resources
import { payrollRoutes } from "./Routes/HumanResources/payrollRoutes.js";
import { recruitmentRoutes } from "./Routes/HumanResources/recruitment.js";
import { perfomancemanagementRoutes } from "./Routes/HumanResources/perfomancemanagementRoutes.js";

//Accounting
import { accountsreceivablesRoutes } from "./Routes/Accounting/accountsreceivables.js";
import { accountspayablesRoutes } from "./Routes/Accounting/accountspayable.js";
import { expenseaccountRoutes } from "./Routes/Accounting/expenseaccount.js";

//Sales and Customer Relation
import { leadmanagementRoutes } from "./Routes/Sales and Customer Relation/leadmanagementRoutes.js";
import { opportunitytrackingRoutes } from "./Routes/Sales and Customer Relation/opportunitytracking.js";
import { salesfocustingRoutes } from "./Routes/Sales and Customer Relation/salesfocusting.js";

//Manufacturing Production
import { materialsRoutes } from "./Routes/Manufacturing Production/materialsRoutes.js";
import { productionordersRoutes } from "./Routes/Manufacturing Production/productionordersRoutes.js";
import { qualitycontrolRoutes } from "./Routes/Manufacturing Production/qualitycontrolRoutes.js";

// Connecting mongoDB Database


const uri = "mongodb+srv://tinomutendaishemutemaringa:admin@enterpriseresourceplann.bpdy8kv.mongodb.net/?retryWrites=true&w=majority&appName=enterpriseresourceplanning";
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // Increase socket timeout
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


const app = express();


app.use(express.json());
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: {type: String},
  email: {type: String},
  role: { type: String, enum: ['admin', 'manager', 'client'], required: true},
  password: { type: String, required: true }
});

// Compile the user model
const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = req.headers.authorization.split(' ')[1];
  try {
    // Find user by token or any other authentication method you prefer
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Authorization middleware based on roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

// Registration route
app.post('/api/register', async (req, res) => {
  const { username,fullname,email, role, password } = req.body;
  try {
    // Check if the username already exists
    /*const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
*/
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      fullname,
      email,
      role,
      password:hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Return success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Logiing dfthjkl,jhgfdfghmj")
    await User.findOne({ username })
    .then((user)=>{
      console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate token or any other authentication method you prefer
      const token = 'some-authentication-token';
      res.json({ role: user.role, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  })
  .catch (error=>{
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
)
});

// Protected route example
app.get('/api/admin/dashboard', authenticateUser, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});

app.get('/api/manager/dashboard', authenticateUser, authorizeRoles('admin', 'manager'), (req, res) => {
  res.json({ message: 'Welcome to manager dashboard' });
});

app.get('/api/client/dashboard', authenticateUser, authorizeRoles('admin', 'manager', 'client'), (req, res) => {
  res.json({ message: 'Welcome to client dashboard' });
});

//register

//supply chain shippmemnt
app.use("/inventorymanagement", InventoryManagementRoutes);
app.use("/Procurement", ProcurementRoutes);
app.use("/logisticsandShipping", logisticsandShippingRoutes);

//Human Resources
app.use("/payroll", payrollRoutes);
app.use("/recruitment", recruitmentRoutes);
app.use("/perfomancemanagement", perfomancemanagementRoutes)

//Accounting 
app.use("/accountsreceivables", accountsreceivablesRoutes)
app.use("/accountspayables", accountspayablesRoutes)
app.use("/expenseaccount", expenseaccountRoutes)

//Sales and Customer Relation 
app.use("/leadmanagement", leadmanagementRoutes)
app.use("/opportunitytracking", opportunitytrackingRoutes)
app.use("/salesfocusting", salesfocustingRoutes)

//Manufacturing Production
app.use("/materials", materialsRoutes)
app.use("/productionorders", productionordersRoutes)
app.use("/qualitycontrol", qualitycontrolRoutes)

// PORT
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
