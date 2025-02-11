import express from "express";
import { userRouter } from "./src/routes/auth.route.js";
import { productRouter } from "./src/routes/product.route.js";
import { invoiceRouter } from "./src/routes/invoice.route.js";
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/invoice", invoiceRouter);

export { app };
