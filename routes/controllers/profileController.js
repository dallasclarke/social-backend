const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const id = req.user;
      // const user = await User.find({});
      // console.log("user =>",user)

      const profile = await User.findById(id);

      if (!profile) {
        return res.status(404).send("No user found!");
      }

      res.send(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Sever Error");
    }
  },
  createProfile: async (req, res) => {
    try {
      const profile = new Profile({
        bio: req.body.bio,
        city: req.body.city,
        state: req.body.city,
        user: req.user,
      });
      console.log("Profile =>", profile);
    } catch (err) {}
  },
  updateProfile: async (req, res) => {
    const id = req.user;
    
     try {
       const newProfile = await User.findByIdAndUpdate(
         id,
         {
           $set: {
             bio: req.body.bio,
             city: req.body.city,
             state: req.body.state,
           },
         },
         { new: true }
       ).exec();

       console.log("New Profile =>", newProfile);

       return res.json(newProfile);
     } catch (err) {
       console.log(err);
     }
  },
};
