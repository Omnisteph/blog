import express from "express";
import {allUserPosts, createUser, deleteUser, getAllUsers, getSingleUser, updateUser} from "../controller/userCntrl.js";
const router = express.Router();

router.post("/register", createUser);
router.get("/allUsers", getAllUsers);
router.get("/:id",getSingleUser);
router.delete("/deleteUserdede/:id", deleteUser);
router.put("/updateUser/:id", updateUser);
router.post("/userPosts", allUserPosts);
export {router as userRoutes};