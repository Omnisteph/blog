import express from "express";
import {createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory} from "../controller/categoryCntrl.js"
const router = express.Router();

router.post("/createCat", createCategory);
router.get("/allCats", getAllCategories);
router.get("/getCategory/:id", getSingleCategory);
router.delete("/deleteCat/:id", deleteCategory);


export {router as categoryRoutes};