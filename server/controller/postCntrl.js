import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

// Create Posts
export const createPosts = asyncHandler(async(req, res) => {
    const {title, content, published, categoryId, authorEmail} = req.body;
    try {
        const createPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
                category: {connect: {id: categoryId}},
                author: {connect: {email: authorEmail}},

            }
        });
        res.send({message: "An Author Has Posted On The Blog", createPost: createPost});
    } catch (err) {
        throw new Error(err.message);
    }
});

// This Action gets All Posts
export const getAllPosts = asyncHandler(async(req, res) => {
    try {
        const allPosts = await prisma.post.findMany({
            where: {
             published: true   
            },
            orderBy: {
                createdAt: "desc",
            }
        });
        res.json(allPosts);
    } catch (err) {
        throw new Error(err.message);
    }
});

// This Action Gets Posts Using The CategoryId
export const getPostCats = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const postCats = await prisma.post.findMany({
            where: {
                category: {
                    id: +id
                }
            }
        });
        res.json(postCats);
    } catch (err) {
        throw new Error(err.message);
    }
});

// This Action Deletes User Post
export const deleteUserPost = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
       const deletePost = await prisma.post.delete({where: {id: id}});
       res.send({message: "A Post Has Been Deleted", deletePost: deletePost});
    } catch (err) {
        throw new Error(err.message)
    }
});


// This Action Update A Post
export const updateUserPost = asyncHandler(async(req, res) => {
    const {id} = req.params
    const {title, content, published, categoryId, authorEmail} = req.body;
    try {
        const updatePost = await prisma.post.update({
            where: {id: id},
            data: {...req.body}
        });
        res.send({message: "A Post Has Been Updated", updatePost: updatePost});
    } catch (err) {
        throw new Error(err.message);
    }
});

// This Action Find Drafts(Post That Are Not Published)
export const getAllDrafts = asyncHandler(async(req, res) => {
    try {
      const getDrafts = await prisma.post.findMany({
        where: {
            published: false
        }
      }); 
      res.json(getDrafts); 
    } catch (err) {
        throw new Error(err.message);
    }
});