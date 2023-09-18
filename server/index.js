import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { profileRoutes } from "./routes/profileRoutes.js";
import { postRoutes } from "./routes/postRoutes.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

app.use("/blog/users", userRoutes);
app.use("/blog/category", categoryRoutes);
app.use("/blog/profile", profileRoutes);
app.use("/blog/posts", postRoutes);