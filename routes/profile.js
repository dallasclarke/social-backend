const express = require("express");
const router = express.Router();
const { getProfile } = require("./controllers/profileController");

router.get("/", getProfile);

router.post("/");

module.exports = router;