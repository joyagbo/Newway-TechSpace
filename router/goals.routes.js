const express = require("express");
const {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goals.controller");
const router = express.Router();

router.get("/", getAllGoals);
router.post("/create", createGoal);
router.put("/update/:id", updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
