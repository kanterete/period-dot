const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
