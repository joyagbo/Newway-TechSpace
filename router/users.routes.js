const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
  getAllUsers,
  deleteProfile,
} = require("../controllers/users.controller.js");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
