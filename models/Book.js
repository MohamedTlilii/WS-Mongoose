const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  available: Boolean,
  price: Number,
});

module.exports = Book = mongoose.model("Book", bookSchema);
