const express = require("express");
const bookRoute = express.Router();
const Book = require("../models/book");

bookRoute.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

bookRoute.get("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

bookRoute.post("/", async (req, res) => {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
});

bookRoute.put("/:id", async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedBook);
});

bookRoute.delete("/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
});

module.exports = bookRoute;