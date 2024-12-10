1
import express from "express";
import InventorySchema from "../models/InventoryManagement.js";

import { Parser } from "json2csv";


let router = express.Router();
// Student Model

// CREATE Student
router.route("/create-inventory").post(async (req, res, next) => {
  await InventorySchema 
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// READ Students
router.route("/").get(async (req, res, next) => {
  await InventorySchema 
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Get Single Student
router.route("/get-user/:id").get(async (req, res, next) => {
  await InventorySchema 
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.route("/update-inventory/:id").put(async (req, res, next) => {
  try {
    const result = await InventorySchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

router.put('/updateSelectedItems', async (req, res) => {
  try {
    const selectedItems = req.body.selectedItems;

    for (const item of selectedItems) {
      await InventorySchema.findOneAndUpdate(
        { _id: item._id },
        {
          $set: {
            lowquality: item.lowquality,
            averagequality: item.averagequality,
            highquality: item.highquality,
          },
        },
        { new: true, useFindAndModify: false }
      );
    }

    res.status(200).json({ message: 'Items updated successfully' });
  } catch (error) {
    console.error('Error updating items:', error);
    res.status(500).json({ error: 'An error occurred while updating items' });
  }
});


router.route("/delete-inventory/:id").delete(async (req, res, next) => {
  try {
    const deletedUser = await InventorySchema.findOneAndDelete({ _id: req.params.id });
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
    const data = await InventorySchema.find({}, { _id: 0 }); // Exclude _id field if needed

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

export { router as InventoryManagementRoutes}