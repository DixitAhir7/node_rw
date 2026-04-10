const commentModel = require("../model/commentModel");
const Comment = require("../models/comment.model");

const createComment = async (req, res) => {
    try {
        const { recipe, text } = req.body;

        const comment = await Comment.create({
            recipe,
            text,
            user: req.user.id,
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCommentsByRecipe = async (req, res) => {
    try {
        const comments = await Comment.find({
            recipe: req.params.recipeId,
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.text = req.body.text || comment.text;

        const updated = await commentModel.save();

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await comment.deleteOne();

        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    updateComment,
    deleteComment,
    getCommentsByRecipe,
    createComment
}