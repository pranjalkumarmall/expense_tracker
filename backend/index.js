import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DATABASE/db.js";
import userRoute from "./routes/fileuser.route.js";
import expenseRoute from "./routes/expense.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Setup
const allowedOrigins = [
     // "http://localhost:5173",
    "https://your-frontend-domain.onrender.com" 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

// Start server
app.listen(port, () => {
    connectDB();
    console.log(`✅ Server live at: https://expense-tracker-1qkr.onrender.com`);
});
