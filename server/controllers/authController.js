const z = require("zod");
const bcrypt = require("bcrypt");
const userQueries = require("../queries/userQueries");
const { generateAuthToken } = require("../utils/authToken");
const { registerSchema, loginSchema } = require("../validators/authSchema");

const login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).send({
        message: "Validation error",
        errors: z.prettifyError(validation.error),
      });
    }

    const { email, password } = validation.data;

    const user = await userQueries.getUserByEmail(email);

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const passwordValid = await bcrypt.compare(password, user.hashed_password);

    if (!passwordValid) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const { hashed_password, ...safeUser } = user;

    const token = generateAuthToken(safeUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Logged in successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).send({
        message: "Validation error",
        errors: z.prettifyError(validation.error),
      });
    }

    const userData = validation.data;

    const existingEmail = await userQueries.getUserByEmail(userData.email);

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const existingLogin = await userQueries.getUserByLogin(userData.login);

    if (existingLogin) {
      return res.status(409).json({
        message: "Login already exists",
      });
    }

    const { confirmPassword, ...userToCreate } = validation.data;

    const user = await userQueries.createUser(userToCreate);

    return res.status(200).send({
      message: "Registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  login,
  register,
  logout,
};
