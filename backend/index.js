const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
require("dotenv").config();

const Todo = require("./models/Todo");

const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
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
