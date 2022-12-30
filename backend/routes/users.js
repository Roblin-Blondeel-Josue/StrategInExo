const express = require("express");

const router = express.Router();
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("../controller/auth");
const {
  getUsers,
  getUser,
  getUserByEmailWithPasswordAndPassToNext,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

router.post("/register", hashPassword, createUser);
router.post("/login", getUserByEmailWithPasswordAndPassToNext, verifyPassword);
router.get("/users", verifyToken, getUsers);
router.get("/:userID", verifyToken, getUser);
router.put("/:userID", verifyToken, updateUser);
router.delete("/:userID", verifyToken, deleteUser);

module.exports = router;
