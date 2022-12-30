/* eslint-disable no-restricted-syntax */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
const routes = require("./routes/users");

app.use("/", routes);

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
