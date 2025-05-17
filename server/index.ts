import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { globalErrorHandler } from "./middlewares/error.middleware";
import eventRoutes from "./routes/event.routes";
import userRoutes from "./routes/user.routes";
import bookingRoutes from "./routes/booking.routes";
// import type { ErrorRequestHandler } from "express";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
// Routes app 
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.get("/", (_req: Request, res: Response) => {
    res.send("Hello from Express + TypeScript!");
});
// global error handler (force type to fix overload issue)
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler);

const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
