const {
  editUserSchema,
  createUserSchema,
} = require("../validators/userSchema");
const z = require("zod");

const userQueries = require("../queries/userQueries");

const editMe = async (req, res) => {
  try {
    const user = await userQueries.getUserById(req.user.id);

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

    await userQueries.editUser(user.id, dataToUpdate);

    res.status(200).json({ message: "User edited" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const getMe = async (req, res) => {
  try {
    const user = await userQueries.getUserById(req.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMe = async (req, res) => {
  try {
    const user = await userQueries.getUserById(req.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    await userQueries.deleteUser(user.id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  editMe,
  getMe,
  deleteMe,
};
