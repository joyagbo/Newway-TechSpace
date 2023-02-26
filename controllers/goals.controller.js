const usersModel = require("../models/users.model.js");
const goalsModel = require("../models/goals.model.js");

exports.getAllGoals = async(req, res) => {
    try {
      const result = await goalsModel.find();
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
};

exports.createGoal = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // check if creator exists
  const creator = await usersModel.findOne({ _id: req.body.creator });
  if (!creator) {
    return res.status(400).json({
      status: "fail",
      message: "Creator does not exist",
    });
  }

  const Goal = await goalsModel.create({
    days: req.body.days,
    start_date: new Date(req.body.start_date),
    creator: req.body.creator,
  });

  if (Goal) {
    res.status(201).json({
      status: "success",
      data: Goal,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Goal not created",
    });
  }
};

exports.updateGoal = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  goalsModel.updateGoal(
    req.params.id,
    new goalsModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Goal with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Goal with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteGoal = (req, res) => {
  goalsModel.deleteGoal(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Goal with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Goal with id " + req.params.id,
        });
      }
    } else res.send({ message: `Goal was deleted successfully!` });
  });
};
