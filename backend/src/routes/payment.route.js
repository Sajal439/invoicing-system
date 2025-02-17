import { Router } from "express";
import { updatePaymentStatus } from "../controllers/paymentStatus.controller.js";

const paymentRouter = Router();

paymentRouter.route("/update-payment-status").post(updatePaymentStatus);

export { paymentRouter };
