import { Invoice } from "../models/invoice.model.js";
import { Party } from "../models/party.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import PDFDocument from "pdfkit";

const getPartyInvoiceSummary = asyncHandler(async (req, res) => {
  const { partyName, partyType } = req.params;

  // validate party type

  if (!["buyer", "dealer"].includes(partyType)) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Invalid party type. must be either buyer or dealer")
      );
  }

  // find party with both partyName and partyType

  const party = await Party.findOne({ partyName, partyType });

  if (!party) {
    return res
      .status(400)
      .json(
        new ApiError(400, `party ${partyName} with type ${partyType} not found`)
      );
  }

  // get invoices for the party with appropriate partyType

  let validInvoiceType;

  if (partyType === "buyer") {
    validInvoiceType = ["sale", "paymentRecieved", "saleReturn"];
  } else if (partyType === "dealer") {
    validInvoiceType = ["purchase", "paymentGiven"];
  }

  const invoices = await Invoice.find({
    partyName,
    invoiceType: { $in: validInvoiceType },
  }).sort({ createdAt: -1 });

  // calculate summary

  const summary = {
    totalInvoices: invoices.length,
    totalBalanceAmount: party.totalInvoiceAmount,
    partyDetails: {
      partyName: party.partyName,
      partyType: party.partyType,
      phoneNumber: party.phoneNumber,
      address: party.address,
    },
    invoiceByType: {},
  };

  // get invoice types based on party type

  validInvoiceType.forEach((type) => {
    summary.invoiceByType[type] = invoices.filter(
      (inv) => inv.invoiceType === type
    );
  });

  // generate pdf

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice_summary_${partyName}_${partyType}.pdf`
  );

  doc.pipe(res);

  // add content to pdf

  doc.fontSize(20).text("Invoice Summary Report", { align: "center" });
  doc.moveDown();

  // party details

  doc.fontSize(16).text("Party Details:");
  doc
    .fontSize(12)
    .text(`Name: ${summary.partyDetails.partyName}`)
    .text(`Type: ${summary.partyDetails.partyType}`)
    .text(`Phone: ${summary.partyDetails.phoneNumber}`)
    .text(`Address: ${summary.partyDetails.address}`);

  doc.moveDown();

  // invoice types

  doc.fontSize(16).text("Invoice Breakdown:");
  Object.entries(summary.invoiceByType).forEach(([type, invoices]) => {
    const typeTotal = invoices.reduce((sum, inv) => sum + inv.total, 0);
    doc.fontSize(12).text(`${type.charAt(0).toUpperCase() + type.slice(1)}:`);
    doc.text(`  Count: ${invoices.length}`);
    doc.text(`  Total Amount: ₹${typeTotal.toFixed(2)}`);
  });
  doc.moveDown();

  doc.end();
});

export { getPartyInvoiceSummary };