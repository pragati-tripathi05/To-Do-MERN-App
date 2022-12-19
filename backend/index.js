const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3200;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
