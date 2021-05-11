const express = require("express");
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile,
} = require("./controllers/profileController");

router.get("/", getProfile);

router.post("/", createProfile);

router.put("/", updateProfile);

module.exports = router;
