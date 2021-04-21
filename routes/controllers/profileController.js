const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await (
        await Profile.findOne({ user: req.user.id })
      ).populate("User", ["name", "birthday"]);

      if (!profile) {
        return res.status(400).json({ msg: "There is no profile found!" });
      }

      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Sever Error");
    }
  },
};
