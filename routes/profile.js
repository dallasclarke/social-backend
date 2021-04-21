const express = require("express");
const router = express.Router();

const { getProfile } = require("./controllers/profileController");

router.get("/user", getProfile);

module.exports = router;