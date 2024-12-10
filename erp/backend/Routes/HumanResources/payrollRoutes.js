import mongoose  from "mongoose";
import express from "express";
import payrollSchema from "../../models/Human Resources/payroll.js"
import { Parser } from "json2csv";

let router = express.Router();


//creating a payroll attribute

router.route("/create-payroll").post(async (req, res, next) => {
    await payrollSchema 
    .create(req.body)
    .then((result) => {
        res.json({
            data:result,
            message: "payroll atrribute contributed",
            status: 200,
        });

    })
        .catch((err) => {
            return next(err);
        });
    });


    //get all paroll information


router.route("/").get(async (req, res, next) => {
    await payrollSchema
     .find()
     .then ((result) => {
        res.json({
            data: result, 
            message: "payroll information sellected",
            status: 200,
        });
     })

     .catch((err) => {
        return next(err);
     });
});


router.route("/update-payroll/:id").put(async (req, res, next) => {
    try {
      const result = await payrollSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update data." });
    }
  });

  
router.route("/delete-payroll/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await payrollSchema.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ msg: "Data successfully deleted." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });

  // Endpoint to fetch data and generate CSV
  router.route('/generate-csv').get(async (req, res) => {
    try {
      // Fetch data from MongoDB using Mongoose
      const data = await payrollSchema.find({}, { _id: 0 }); // Exclude _id field if needed
  
      // Define the fields for the CSV and their titles
      const fields = [
        { label: 'Employee ID', value: 'employeeId' },
      
        { label: 'Employee Name', value: 'employee_name' },
        { label: 'Employee Status', value: 'employee_status' },
        { label: 'Job Title', value: 'job_title' },
        { label: 'Base Salary', value: 'base_salary' },
        { label: 'Bonuses', value: 'bonuses' },
        { label: 'Deductions', value: ' deductions_medicalcontribution' },
       
      ];
      const opts = { fields };
  
      // Convert data to CSV format using json2csv
      const parser = new Parser(opts);
      const csv = parser.parse(data);
  
      // Set response headers for CSV download
      res.header('Content-Type', 'text/csv');
      res.attachment('data.csv');
      res.send(csv);
    } catch (error) {
      console.error('Error generating CSV:', error);
      res.status(500).send('Error generating CSV');
    }
  });

export { router as payrollRoutes}