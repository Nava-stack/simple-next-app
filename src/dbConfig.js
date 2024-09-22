import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB database connection established successfully");
    });
    connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit();
    });
  } catch (error) {
    console.error(error);
  }
}
