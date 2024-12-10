import mongoose from "mongoose";
import express from "express";

import accountsreceivablesSchema from "../../models/Accounting/accountsreceivables.js";

import { Parser }  from "json2csv";

import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import 'pdfkit-table';
import { fileURLToPath } from "url";

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

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/download-pdf", async (req, res) => {
  const { selectedAccountsreceivables } = req.body;

  try {
    const accountsreceivables = await accountsreceivablesSchema.find({ _id: { $in:  selectedAccountsreceivables } });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'invoice.pdf');
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add logo image
    const logoPath = path.join(__dirname, '../../images/updatedlog.jpeg'); // Replace with the path to your logo
    doc.image(logoPath, 50, 40, { width: 50, height: 50 }); // Adjust the position and size as needed

    // Title
    doc.fontSize(20).text('Freight Marks Logistics', 110, 50); // Adjust the position to fit next to the logo
    doc.fontSize(20).text('Accounts Receivables Invoice', 110, 80); // Adjust the position to fit next to the logo
    doc.moveDown(2);

    // Table headers
    const headers = [
      'Customer Information',
      'Invoice Details',
      'Payment Information',
      'Accounting Codes',
      'Aging Information',
      'Payment_History',
     
     
    ];

    // Table
    const table = {
      headers,
      rows: accountsreceivables.map(accountsreceivables => [
        accountsreceivables.customer_information,
        accountsreceivables.invoice_details,
        accountsreceivables.payment_information,
        accountsreceivables.accounting_codes,
        accountsreceivables. aging_information,
        accountsreceivables.payment_history
        
      ])
    };

    // Calculate column widths
    const columnWidths = [80, 80, 80, 100, 80, 80, 100, 80, 100, 100, 100];
    const startX = 50;
    const startY = 150;
    const rowHeight = 20;

    // Render table headers
    doc.font('Helvetica-Bold').fontSize(10);
    headers.forEach((header, i) => {
      doc.text(header, startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), startY, {
        width: columnWidths[i],
        align: 'left'
      });
    });

    // Render table rows
    doc.font('Helvetica').fontSize(10);
    table.rows.forEach((row, rowIndex) => {
      const rowY = startY + (rowIndex + 1) * rowHeight;
      row.forEach((cell, cellIndex) => {
        doc.text(cell, startX + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0), rowY, {
          width: columnWidths[cellIndex],
          align: 'left'
        });
      });
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(filePath, 'quotations.pdf', (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Error downloading the file');
        } else {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting the file:', unlinkErr);
            }
          });
        }
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing the PDF file:', err);
      res.status(500).send('Error writing the PDF file');
    });

  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).send('Error fetching quotations');
  }
});


export { router as accountsreceivablesRoutes}