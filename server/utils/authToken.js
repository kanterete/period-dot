require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { id: user.userId, role_id: user.role_id },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return token;
};

module.exports = {
  generateAuthToken,
};
