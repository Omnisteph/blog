import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

// This Action Creates Users 
export const createUser = asyncHandler(async(req, res) => {
    const {name, email} = req.body;
    const userExist = await prisma.user.findUnique({where: {email: email}});
    if(!userExist){
        const registerUser = await prisma.user.create({
            data: req.body
        });
        res.send({message: "A User Has Been Registered", registerUser: registerUser});
    }else{
        res.status(201).send({message: "User Already Registered"});
    }
});

//This Action Gets All Users
export const getAllUsers = asyncHandler(async(req, res) =>{
    const findAllUsers = await prisma.user.findMany({});
    res.json(findAllUsers);
});

// This Action Gets A Single User
export const getSingleUser = asyncHandler(async(req, res) =>{
      const {id} = req.params;
      try {
        const singleUser = await prisma.user.findUnique({where: {id: id}});
        res.json(singleUser);
     } 
      catch (err) {
        throw new Error(err.message)
      }
      
});

// This Action Deletes A User
export const deleteUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const removeUser = await prisma.user.delete({where: {id: id}});
        res.send({message: "A User has been Deleted", removeUser: removeUser});
    } catch (err) {
        throw new Error(err.message)
    }
   
});

// This Action Updates A User
export const updateUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    try {
        const updateUsers = await prisma.user.update({
            where: {id: id},
            data: {...req.body}
        });
        res.send({message: "A User Has Been Updated", updateUsers: updateUsers});
    } catch (err) {
        throw new Error(err.message);
    }
});

// This Action Gets All The Posts Of The User
export const allUserPosts = asyncHandler(async(req, res) => {
    const {email} = req.body;
    try {
       const userPosts = await prisma.user.findMany({
            where: {
                email: email
            },
            include: {
                post: {
                    where: {
                        published: true,
                    }
                }
            }
        });
        res.json(userPosts)
    } catch (err) {
        throw new Error(err.message);
    }
});