const Recipemodel = require("../model/Recipemodel");

const createRecipe = async (req, res) => {
    try {
        const { title, description } = req.body;

        const recipe = await Recipemodel.create({
            title,
            description,
            user: req.user.id,
        });

        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipemodel.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipemodel.findById(req.params.id)
            .populate("user", "name email");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipemodel.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        recipe.title = req.body.title || recipe.title;
        recipe.description = req.body.description || recipe.description;

        const updated = await recipe.save();

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipemodel.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        await recipe.deleteOne();

        res.json({ message: "Recipe deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    deleteRecipe,
    getRecipeById,
    getRecipes,
    createRecipe,
    updateRecipe
}