import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({limit: '50mb', extended: true })); // To parse form data in the req.body
app.use(cookieParser());
app.use(cors());


// api routes
app.use("/api/users", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes);


//connect db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>
        console.log("Connected To MongoDB")
    )
    .catch((err) => {
        console.log(err);
    })

app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`));