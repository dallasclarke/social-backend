const express = require("express");
const router = express.Router();

const { createUser, signIn, verify } = require("./controllers/userController");

/* GET users listing. */

router.get("/verify", verify)

router.post("/create-user", createUser);
router.post("/sign-in", signIn);


module.exports = router;
