const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());

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
