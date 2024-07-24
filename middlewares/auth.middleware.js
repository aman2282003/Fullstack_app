const jwt = require("jsonwebtoken");
   
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, `masai`, function (err, decoded) {
      console.log(decoded);
      req.body.userId = decoded.userId;
      req.body.username = decoded.user;
      next();
    });
  } else {
    res.status(401).json({ message: "Token not found, please login first" });
  }
};

module.exports = auth;
