import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async(req, res) => {
    const name = req.body;
    try {
        const createCat = await prisma.category.create({data: req.body});
        res.send({message: "A Category Has been Created", createCat: createCat}); 
    } catch (err) {
        throw new Error(err.message)
    }
   
});

export const getAllCategories = asyncHandler(async(req, res) =>{
    try {
        const allCats = await prisma.category.findMany({});
        res.json(allCats);
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getSingleCategory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const singleCat = await prisma.category.findUnique({where: {id: +id}});
        res.json(singleCat); 
    } catch (err) {
        throw new Error(err.message);
    }
});

export const deleteCategory = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    try {
       const deleteCat = await prisma.category.delete({where: {id: +id}});
       res.send({message: "A Category Has Been Deleted", deleteCat: deleteCat});
    } catch (err) {
        throw new Error(err.message);
    }
});

export const updateCategory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const name = req.body;
    try {
        const updateCat = await prisma.category.update({
            where: {id: +id},
            data: {...req.body}
        });
        res.send({message: "A Category Has Been Updated", updateCat: updateCat});
    } catch (err) {
        throw new Error(err.message);
    }
});