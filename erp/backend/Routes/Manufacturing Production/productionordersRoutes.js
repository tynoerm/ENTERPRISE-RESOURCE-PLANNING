import mongoose from "mongoose";
import express from "express";

import productionordersSchema from "../../models/ManufacturingProduction/productionorders.js";
import { Parser } from "json2csv";

let router = express.Router();

//create 


router.route("/create-productionorders").post(async (req, res, next) => {
    await productionordersSchema
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

//get all 

router.route("/").get(async (req, res, next) => {
    await productionordersSchema
        .find()
        .then((result) => {
            res.json({
                data: result,
                message: "all production orders fetched",
                status: 200,
            });
        })

        .catch((err) => {
            return next(err);
        });
});

// update 

router.route("/update-productionorders/:id").put(async (req, res, next) => {
    try {
      const result = await productionordersSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
  

  router.route("/delete-productionorders/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await productionordersSchema.findOneAndDelete({ _id: req.params.id });
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
      const data = await productionordersSchema.find({}, { _id: 0 }); // Exclude _id field if needed
  
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

export { router as productionordersRoutes}