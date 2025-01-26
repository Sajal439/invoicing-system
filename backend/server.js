import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// import { PUBLIC_DATA } from "./constants.js";
import { app } from "./app.js";
import { connectDb } from "./src/config/db.config.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
    app.on("error", (err) => {
      console.log("Error in server: ", err);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });
