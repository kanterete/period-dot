require("dotenv").config();
const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async ({ login, email, password, age }) => {
  const saltRounds = (await bcrypt.genSalt(Number(process.env.SALT))) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [result] = await db.execute(
    "INSERT INTO users (login, email, hashed_password, age) values(?, ?, ?, ?)",
    [login, email, hashedPassword, age],
  );
  return result;
};

const getUsers = async () => {
  const [users] = await db.execute(
    "SELECT id, login, email, age, role_id, created_at, updated_at FROM users",
  );
  return users;
};

const getUserById = async (userId) => {
  const [users] = await db.execute(
    "SELECT id, login, email, age, role_id, created_at, updated_at FROM users WHERE id = ?",
    [userId],
  );
  return users[0];
};

const getUserByEmail = async (email) => {
  const [users] = await db.execute(
    "SELECT id, login, email, hashed_password, age, role_id, created_at, updated_at FROM users WHERE email = ?",
    [email],
  );
  return users[0];
};

const deleteUser = async (userId) => {
  const [result] = await db.execute("DELETE FROM users WHERE id = ?", [userId]);
  return result;
};

const editUser = async (userId, data) => {
  const allowedFields = ["login", "email", "age"];

  const fieldsToUpdate = allowedFields.filter(
    (field) => data[field] !== undefined,
  );

  if (fieldsToUpdate.length === 0) {
    throw new Error("No valid fields to update");
  }

  const values = fieldsToUpdate.map((field) => data[field]);

  const setClause = fieldsToUpdate.map((field) => `${field} = ?`).join(", ");

  const [result] = await db.execute(
    `UPDATE users SET ${setClause} WHERE id = ?`,
    [...values, userId],
  );

  return result;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  editUser,
};
