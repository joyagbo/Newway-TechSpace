const usersModel = require("../models/users.model.js");
const communitiesModel = require("../models/communities.model.js");

exports.getAllCommunities = async(req, res) => {
    try {
      const result = await communitiesModel.find();
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

exports.createCommunity = async (req, res) => {
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

  const community = await communitiesModel.create({
    name: req.body.name,
    description: req.body.description,
    creator: req.body.creator,
  });

  if (community) {
    res.status(201).json({
      status: "success",
      data: community,
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Community not created",
    });
  }
};

exports.updateCommunity = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  communitiesModel.updateCommunity(
    req.params.id,
    new communitiesModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Community with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Community with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteCommunity = (req, res) => {
  communitiesModel.deleteCommunity(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Community with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Community with id " + req.params.id,
        });
      }
    } else res.send({ message: `Community was deleted successfully!` });
  });
};
