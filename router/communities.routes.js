const express = require("express");
const {
  getAllCommunities,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} = require("../controllers/communities.controller");
const router = express.Router();

router.get("/", getAllCommunities);
router.post("/create", createCommunity);
router.put("/update/:id", updateCommunity);
router.delete("/:id", deleteCommunity);

module.exports = router;
