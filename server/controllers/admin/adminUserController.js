const {
  editUserSchema,
  createUserSchema,
} = require("../../validators/userSchema");

const jwt = require("jsonwebtoken");
const z = require("zod");

const userQueries = require("../../queries/userQueries");

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const validation = createUserSchema.safeParse(userData);

    if (!validation.success) {
      return res.status(404).json({
        message: "Validation error",
        errors: z.prettifyError(validation.error),
      });
    }

    const existingUser = await userQueries.getUserByEmail(userData.email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    await userQueries.createUser(userData);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userQueries.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dataToUpdate = req.body;
    const validation = editUserSchema.safeParse(dataToUpdate);

    if (!validation.success) {
      return res.status(404).json({
        message: "Validation error",
        errors: z.prettifyError(validation.error),
      });
    }

    await userQueries.editUser(userId, dataToUpdate);

    res.status(200).json({ message: "User edited" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userQueries.getUsers();

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userQueries.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await userQueries.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userQueries.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userQueries.deleteUser(userId);

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getUsers,
};
