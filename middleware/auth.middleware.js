const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.headers.auth;

  if (token) {
    const decod = jwt.verify(token, process.env.key);

    if (decod) {
      const userId = decod.userId;
      console.log("decoded", decod);
      req.body.userId = userId;
      next();
    } else {
      res.send("Please Login first");
    }
  } else {
    res.send("Please Login first");
  }
};

module.exports = { auth };
