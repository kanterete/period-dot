const z = require("zod");
const bcrypt = require("bcrypt");
const userQueries = require("../queries/userQueries");
const { generateAuthToken } = require("../utils/authToken");

const login = async (req, res) => {
  try {
    const validation = validate(req.body);

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

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

const validate = (data) => {
  const loginSchema = z.object({
    email: z.string().email("Incorrect email").max(255, "Email too long"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });
  return loginSchema.safeParse(data);
};

module.exports = {
  login,
  logout,
};
