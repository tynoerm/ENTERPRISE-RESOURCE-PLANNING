import mongoose from "mongoose";
import express from "express";
import SupplierSchema from "../../models/SupplyChainManagement/Procurement.js";
import { Parser } from "json2csv";




let router = express.Router();

//create purchase order

router.route("/createpurchaseorder"). post(async (req,  res, next) => {
    await SupplierSchema
         .create(req.body)
         .then((result) => {
            res.json({
                data: result,
                message: "Purchase order successfully created!",
                status: 200,
            });
         })

         .catch((err) => {
            return next(err);
         });
});



//get all purchasorder items
router.route("/").get(async (req, res, next) => {
    await SupplierSchema
    .find()
    .then((result) => {
        res.json({
            data: result,
            message: "All purchase order selected",
            status: 200,
        });
    })
    .catch((err) => {
        return next(err);
    });
});



router.route("/delete-procurement/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await SupplierSchema.findOneAndDelete({ _id: req.params.id });
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
      const data = await SupplierSchema.find({}, { _id: 0 }); // Exclude _id field if needed
  
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
  
  

//update purchaseorder
router.route("/update-procurement/:id").put(async (req, res, next) => {
    await SupplierSchema
     .findByIdAndUpdate(req.params.id, {
        $set: req.body,
     })
     .then((result) => {
        console.log(result);
        res.json({
            data: result,
            message: "data successfully added",
        });
     })
     .catch((err) => {
        console.log(err);
     });
});




export { router as ProcurementRoutes}