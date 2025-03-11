import { Router } from "express";
import { newInvoice } from "../controllers/invoice.controller.js";
import { getPartyInvoiceSummary } from "../controllers/invoiceSummary.controller.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const invoiceRouter = Router();

invoiceRouter.route("/new-invoice").post(restrictTo("admin"), newInvoice);
invoiceRouter
  .route("/summary/:partyType/:partyName")
  .get(getPartyInvoiceSummary);
export { invoiceRouter };
