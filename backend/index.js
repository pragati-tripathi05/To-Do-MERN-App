const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
