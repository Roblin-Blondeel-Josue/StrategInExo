const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  hashedPassword: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Users", User);
