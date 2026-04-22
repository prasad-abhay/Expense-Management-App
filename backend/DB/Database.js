import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    const db = process.env.MONGO_URI;

    try {
        const { connection } = await mongoose.connect(db, { useNewUrlParser: true });

        console.log(`MongoDB Connected to ${connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }



}