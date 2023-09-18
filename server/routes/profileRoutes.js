import express from "express";
import { createProfile, deleteProfile, getAllProfiles, getSingleProfile, updateProfile } from "../controller/profileCntrl.js";
const router = express.Router();

router.post("/createProfiles", createProfile);
router.get("/singleProfile/:id",getSingleProfile);
router.get("/allProfiles", getAllProfiles);
router.delete("/deleteProf/:id", deleteProfile);
router.put("/updateProf/:id", updateProfile);

export {router as profileRoutes};