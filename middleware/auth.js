const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied!" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    console.log(decoded)
    req.user = decoded._id;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Token not valid!" });
  }
};
