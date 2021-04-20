const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

router.post(
  "/",
  [check("text", "Text is required!").not().isEmpty()],
  (req, res) => {}
);

module.exports = router;
