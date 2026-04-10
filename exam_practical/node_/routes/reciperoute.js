const express = require("express");
const reciperouter = express.Router();
const { verifyToken } = require("../midlewares/verify");
const { getRecipes, getRecipeById, updateRecipe, deleteRecipe, createRecipe } = require("../controlers/recipecontroler");
const role = require("../verify/roles");

reciperouter.post("/", verifyToken, role(""), createRecipe);
reciperouter.get("/", getRecipes);
reciperouter.route("/:id").get(verifyToken, getRecipeById).delete(verifyToken, deleteRecipe).put(verifyToken, updateRecipe)

module.exports = reciperouter;