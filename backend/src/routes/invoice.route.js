import { Router } from "express";
import { newInvoice } from "../controllers/invoice.controller.js";
import {
  getPartyInvoiceSummary,
  getSalesSummary,
} from "../controllers/invoiceSummary.controller.js";
import { authenticate, restrictTo } from "../middlewares/auth.middleware.js";

const invoiceRouter = Router();

invoiceRouter.route("/new-invoice").post(restrictTo("admin"), newInvoice);
invoiceRouter
  .route("/summary/:partyType/:partyName")
  .get(restrictTo("admin"), getPartyInvoiceSummary);
invoiceRouter.use(authenticate);
invoiceRouter.route("/summary").get(restrictTo("admin"), getSalesSummary);
export { invoiceRouter };
