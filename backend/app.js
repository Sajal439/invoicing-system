import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./src/routes/auth.route.js";
import { productRouter } from "./src/routes/product.route.js";
import { invoiceRouter } from "./src/routes/invoice.route.js";
import { paymentRouter } from "./src/routes/payment.route.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/payment", paymentRouter);

app.use(errorHandler);

export { app };
