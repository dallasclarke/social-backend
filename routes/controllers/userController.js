const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mongo } = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body);

    try {
      const genSalt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.password, genSalt);

      const createdUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        birthday: req.body.birthday,
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

  signIn: async (req, res) => {
    try {
      console.log(req.body, "Found body");
      const foundEmail = await User.findOne({ email: req.body.email });
      console.log(foundEmail, "Found email");
      if (!foundEmail) {
        throw {
          message: "No user found, please sign up!",
          status: 404,
        };
      } else {
        const comparedPassword = await bcrypt.compare(
          req.body.password,
          foundEmail.password
        );

        if (!comparedPassword) {
          throw {
            message: "Please check your email and password!",
            status: 401,
          };
        }

        const token = jwt.sign(
          { email: foundEmail.email, _id: foundEmail._id },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );

        res.json({
          jwtToken: token,
          email: foundEmail.email,
          userId: foundEmail._id,
        });
      }
    } catch (e) {
      console.log("Sign in", e);

      if (e.status === 404) {
        res.status(e.status).json({
          message: e.message,
        });
      } else if (e.status === 401) {
        res.status(e.status).json({
          message: e.message,
        });
      } else {
        res.status(500).json({
          message: e.message,
        });
      }
    }
  },

  verify: (request, response) => {
    try {
      const payload = jwt.verify(request.query.token, process.env.SECRET_KEY);

      response.json({ email: payload.email });
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        response.status(400).json({
          message: err.message,
        });
      }

      if (err.name === "TokenExpiredError") {
        response.status(401).json({
          message: err.message,
        });
      }
    }
  },
};
