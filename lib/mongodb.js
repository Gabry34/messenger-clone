import mongoose from "mongoose";

const connectMongoDB = async (string) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB: " + string);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
