import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log("Connected to Database"); }
).catch((err) => {
    console.log("connection Error", err);
})

// Routes Middleware
app.use("/api/books", bookRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send("Welcome to Books Api");
});
// Connect to the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Your server is running sucessfully on PORT: ${PORT}`));