import mongoose from "mongoose";

let isConnected = false; 

export async function connectToDatabase() {
  if (isConnected) {
   
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "kamwaleDb", 
    });

    isConnected = true;
    console.log("MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw new Error("Database is not connected");
  }
}
