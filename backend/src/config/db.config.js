import mongoose from "mongoose";
// import { PUBLIC_DATA } from "../../constants";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    mongoose.disconnect();
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export { connectDb };
