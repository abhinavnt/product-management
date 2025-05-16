import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { errorHandler } from "./middlewares/errorMiddleware";
const rfs = require("rotating-file-stream");
import authRoutes from "./routes/auth.route" 
import categoryRoutes from "./routes/category.route"

dotenv.config();
connectDB();


const app = express();
const CLIENT_URL = process.env.CLIENT_URL;


app.use(express.json());
app.use(cookieParser());



const errorLogStream = rfs.createStream("error.log", {
  interval: "1d",
  maxFiles: 7,
  path: path.join(__dirname, "../logs"),
});

app.use(
  morgan("combined", {
    stream: errorLogStream,
    skip: (req, res) => res.statusCode < 400,
  })
);

app.use(morgan("dev"));


app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/category",categoryRoutes)



app.use(errorHandler);

export default app;