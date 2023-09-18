import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

export const createProfile = asyncHandler(async(req, res) => {
    const {username, description, image, userEmail} = req.body;
    try {
        const createProf = await prisma.profile.create({  
            data: {
                username,
                description,
                image,
                user: {connect: {email: userEmail}},
            },
        });
        res.send({message: "A User Profile has Been Created", createProf: createProf});
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getSingleProfile = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const singleProfile = await prisma.profile.findUnique({
            where: {id: id},
            // select: {userEmail: true}
        });
        res.status(200).send(singleProfile);
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getAllProfiles = asyncHandler(async(req, res) => {
    try {
        const allProfiles = await prisma.profile.findMany({});
        res.json(allProfiles);
    } catch (err) {
        throw new Error(err.message)
    }
});

export const deleteProfile = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
       const deleteProf = await prisma.profile.delete({where: {id: id}});
       res.send({message: "A User Profile has Been Deleted", deleteProf: deleteProf}); 
    } catch (err) {
        throw new Error(err.message)
    }
});

export const updateProfile = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    const {username, description, image, userEmail} = req.body;
    try {
        const updateProf = await prisma.profile.update({where: {id: id}, data: {...req.body}});
        res.send({message: "A User Profile Has Been Updated", updateProf: updateProf});
    } catch (err) {
        throw new Error(err.message);
    }
});