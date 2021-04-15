const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body);

    try {
      const genSalt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.password, genSalt);

      const createdUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      await createdUser.save();

      res.json({
        message: "User Created!",
      });
    } catch (e) {
      console.log(e);
      console.log(e.code);
      console.log(e.message);

      if (e.code === 11000) {
        res.status(409).json({
          message: "Email is a duplicate",
        });
      } else {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
    }
  },
};
