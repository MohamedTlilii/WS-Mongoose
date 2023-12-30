const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./models/Book");
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPWD}@mycluster.t5ajheo.mongodb.net/db-library?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to DataBase"))
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

//   add books : post
app.post("/api/addBooks", (req, res) => {
  Book.insertMany([
    {
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyl",
      available: true,
      price: 25,
    },
    {
      title: "The A B C Murders",
      author: "Agatha Christie",
      available: false,
      price: 35,
    },
    { title: "Nemesis", author: "Agatha Christie", available: true, price: 50 },
    {
      title: "The Green Mile",
      author: "Stephen King",
      available: false,
      price: 20,
    },
    {
      title: "Macbeth",
      author: "William Shakespeare",
      available: true,
      price: 40,
    },
    {
      title: "Treasure island",
      author: "Robert Louis Stevenson",
      available: true,
      price: 28,
    },
  ]);
  res.json({ message: "ok" });
});

// get books : get
app.get("/api/getBooks", async (req, res) => {
  const books = await Book.find();
  res.json({ data: books });
});
// get available books
app.get("/api/getAvailableBooks", async (req, res) => {
  const books = await Book.find({ available: true });
  res.json({ data: books });
});

// get title books  / The /
app.get("/api/getTitleBooks", async (req, res) => {
  const books = await Book.find({ title: /The/ });
  res.json({ data: books });
});

// get greater price then 30
app.get("/api/getGreaterPriceBooks", async (req, res) => {
  const books = await Book.find({ price: { $gt: 30 } });
  res.json({ data: books });
});
// get greater price lower then 30
app.get("/api/getLowerPriceBooks", async (req, res) => {
  const books = await Book.find({ price: { $lt: 30 } });
  res.json({ data: books });
});

// get  books of AGATHA CHRISTIE
app.get("/api/getAgathaChristieBooks", async (req, res) => {
  const books = await Book.find({ author: "Agatha Christie", available: true });
  res.json({ data: books });
});
// update
app.put("/api/UpdateBooks", async (req, res) => {
  const books = await Book.updateOne(
    { title: "The Green Mile" },
    { available: true }
  );
  res.json({ data: books });
});
// delete
app.delete("/api/DeleteBooks", async (req, res) => {
  const books = await Book.deleteOne({ title: "The Green Mile" });
  res.json({ data: books });
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("serveur is  up and runing on port 5000");
});
