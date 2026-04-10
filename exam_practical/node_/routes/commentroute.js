const express = require("express");
const { verifyToken } = require("../midlewares/verify");
const { createComment, getCommentsByRecipe, updateComment, deleteComment } = require("../controlers/commentcontroler");
const commentRoute = express.Router();

commentRoute.post("/", verifyToken, createComment);
commentRoute.get("/:recipeId", getCommentsByRecipe);
commentRoute.put("/:id", verifyToken, updateComment);
commentRoute.delete("/:id", verifyToken, deleteComment);

module.exports = commentRoute;