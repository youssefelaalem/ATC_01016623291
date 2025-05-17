import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL as string)
        console.log(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        process.exit(1);

    }
}

export default connectDB;