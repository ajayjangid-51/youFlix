import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
	mongoose
		.connect(process.env.MONGO_ATLAS)
		.then(() => {
			console.log("Connected to DB");
		})
		.catch((err) => {
			console.log("error in connecting monogodb");
			throw err;
		});
};

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
	res.send("hei , hello");
});

//error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || "Something went wrong!";
	return res.status(status).json({
		success: false,
		status,
		message,
	});
});

app.listen(4000, () => {
	connect();
	console.log("Connected to Server");
});
