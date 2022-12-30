const Model = require("../models/User");

const getUsers = (req, res) => {
  Model.find({}, { firstname: 1, lastname: 1, email: 1 })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getUser = (req, res) => {
  Model.findOne(
    { _id: req.params.userID },
    { firstname: 1, lastname: 1, email: 1 }
  )
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "User not found" }));
};
const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  Model.findOne({ email: req.body.email })
    .then((result) => {
      if (result != null) {
        req.user = result;
        next();
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user from the Users List");
    });
};
const createUser = (req, res) => {
  Model.create(req.body)
    .then(() => res.status(201).json({ msg: "User created" }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateUser = (req, res) => {
  Model.findOneAndUpdate({ _id: req.params.userID }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "User not found" }));
};

function deleteUser(req, res) {
  Model.findOneAndDelete({ _id: req.params.userID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "User not found" }));
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmailWithPasswordAndPassToNext,
  createUser,
  updateUser,
  deleteUser,
};
