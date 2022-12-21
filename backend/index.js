const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
require("dotenv").config();

const Todo = require("./models/Todo");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// GET or READ
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST or CREATE
app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

// DELETE
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

// TOGGLE complete & pending
app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (err) {
    console.log("Error in db connection");
    console.log(err);
  }
  console.log(`Listening on ${PORT}`);
});
