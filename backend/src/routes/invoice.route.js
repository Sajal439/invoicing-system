import { Router } from "express";
import { newInvoice } from "../controllers/invoice.controller.js";

const invoiceRouter = Router();

invoiceRouter.route("/new-invoice").post(newInvoice);
export { invoiceRouter };
