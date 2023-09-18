import express from "express";
import { createPosts, deleteUserPost, getAllDrafts, getAllPosts,  getPostCats, updateUserPost } from "../controller/postCntrl.js";
const router = express.Router();

router.post("/createPost", createPosts);
router.get("/allPosts", getAllPosts);
router.get("/postCats/:id", getPostCats);
router.delete("/deletePost/:id", deleteUserPost);
router.put("/updatePost/:id", updateUserPost);
router.get("/getDrafts", getAllDrafts);
export {router as postRoutes}