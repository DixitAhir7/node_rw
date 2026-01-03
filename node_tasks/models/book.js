const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    price: Number,
    stock: Number
}, { timestamps: true });

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;