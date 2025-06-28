import { Invoice } from "../models/invoice.model.js";
import { Party } from "../models/party.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import PDFDocument from "pdfkit";

const getPartyInvoiceSummary = asyncHandler(async (req, res) => {
  const { partyName, partyType } = req.params;

  // Validate party type
  if (!["buyer", "dealer"].includes(partyType)) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Invalid party type. Must be either buyer or dealer")
      );
  }

  // Find party with both partyName and partyType
  const party = await Party.findOne({ partyName, partyType });

  if (!party) {
    return res
      .status(400)
      .json(
        new ApiError(400, `Party ${partyName} with type ${partyType} not found`)
      );
  }

  // Get invoices for the party
  const invoices = await Invoice.find({ partyName }).sort({ createdAt: -1 });

  // Calculate summary
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

  // Get invoice types based on party type
  const validInvoiceType = [
    "purchase",
    "paymentGiven",
    "sale",
    "paymentRecieved",
    "saleReturn",
  ];
  validInvoiceType.forEach((type) => {
    summary.invoiceByType[type] = invoices.filter(
      (inv) => inv.invoiceType === type
    );
  });

  // Generate PDF
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice_summary_${partyName}_${partyType}.pdf`
  );

  doc.pipe(res);

  // Add content to PDF
  doc.fontSize(20).text("Invoice Summary Report", { align: "center" });
  doc.moveDown();

  // Party details
  doc.fontSize(16).text("Party Details:");
  doc
    .fontSize(12)
    .text(`Name: ${summary.partyDetails.partyName}`)
    .text(`Type: ${summary.partyDetails.partyType}`)
    .text(`Phone: ${summary.partyDetails.phoneNumber}`)
    .text(`Address: ${summary.partyDetails.address}`);

  doc.moveDown();

  // Invoice types
  doc.fontSize(16).text("Invoice Breakdown:");
  Object.entries(summary.invoiceByType).forEach(([type, invoices]) => {
    const typeTotal = invoices.reduce((sum, inv) => sum + inv.total, 0);
    doc.fontSize(12).text(`${type.charAt(0).toUpperCase() + type.slice(1)}:`);
    doc.text(`  Count: ${invoices.length}`);
    doc.text(`  Total Amount: ₹${typeTotal.toFixed(2)}`);
  });
  doc.moveDown();

  // Table headers
  doc.fontSize(12).text("Invoices:", { underline: true });
  doc.moveDown();
  doc.text("Invoice Type", 150, doc.y, { width: 100 });
  doc.text("Total Amount", 250, doc.y, { width: 100 });
  doc.text("Discount", 350, doc.y, { width: 100 });
  doc.text("Date", 450, doc.y, { width: 100 });
  doc.moveDown();

  // Table rows
  invoices.forEach((inv) => {
    doc.text(inv.invoiceType, 150, doc.y, { width: 100 });
    doc.text(`₹${inv.total.toFixed(2)}`, 250, doc.y, { width: 100 });
    doc.text(`${inv.discount || 0}%`, 350, doc.y, { width: 100 });
    doc.text(new Date(inv.createdAt).toLocaleDateString(), 450, doc.y, {
      width: 100,
    });
    doc.moveDown();

    // Product details (if available)
    if (inv.products.length > 0) {
      doc.fontSize(10).text("Products:", 60, doc.y);
      inv.products.forEach((product) => {
        doc.text(
          `- ${product.productName}: ₹${product.price} x ${product.quantity} = ₹${product.total}`,
          70,
          doc.y
        );
        doc.moveDown();
      });
    }
    doc.moveDown();
  });

  doc.end();
});

const getSalesSummary = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });

  const summary = {
    totalSales: 0,
    totalPurchases: 0,
    totalPaymentsReceived: 0,
    totalPaymentsGiven: 0,
    totalSaleReturns: 0,
    recentTransactions: invoices.slice(0, 5),
  };

  invoices.forEach((invoice) => {
    switch (invoice.invoiceType) {
      case "sale":
        summary.totalSales += invoice.total;
        break;
      case "purchase":
        summary.totalPurchases += invoice.total;
        break;
      case "paymentRecieved":
        summary.totalPaymentsReceived += invoice.total;
        break;
      case "paymentGiven":
        summary.totalPaymentsGiven += invoice.total;
        break;
      case "saleReturn":
        summary.totalSaleReturns += invoice.total;
        break;
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, summary, "Sales summary fetched successfully"));
});

export { getPartyInvoiceSummary, getSalesSummary };
