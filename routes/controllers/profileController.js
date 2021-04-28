const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // console.log("user =>", req.user);
      const id = req.user;
      const user = await User.find({});
      console.log("user =>",user)

      const profile = await User.findById(id);

      res.send(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Sever Error");
    }
  },
  updateProfile: async (req, res) => {

  }
};
