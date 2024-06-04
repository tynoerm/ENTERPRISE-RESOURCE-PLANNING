import mongoose from "mongoose";
import express from "express";

import accountsreceivablesSchema from "../../models/Accounting/accountsreceivables.js";

import { Parser }  from "json2csv";

let router = express.Router();

//create accounts receivables


router.route("/create_accountsreceivables").post(async (req, res, next) => {
    await accountsreceivablesSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "record created successfully",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

//get all accounts receivables records from  the database

router.route("/").get(async (req, res, next) => {
    await accountsreceivablesSchema
        .find()
        .then((result) => {
            res.json({
                data: result,
                message: "all records fetched",
                status: 200,
            });
        })

        .catch((err) => {
            return next(err);
        });
});

// update accountsreceivables into the database

router.route("/update-accountsreceivables/:id").put(async (req, res, next) => {
  try {
    const result = await accountsreceivablesSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
  

  router.route("/delete-accountsreceivables/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await accountsreceivablesSchema.findOneAndDelete({ _id: req.params.id });
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
      const data = await accountsreceivablesSchema.find({}, { _id: 0 }); // Exclude _id field if needed
  
      // Convert data to CSV format using json2csv
      const parser = new Parser();
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
  

export { router as accountsreceivablesRoutes}