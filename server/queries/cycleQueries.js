const db = require("../config/db");

const getCycles = async () => {
  const [cycles] = await db.execute(
    "SELECT * FROM cycles ORDER BY started_at DESC",
  );
  return cycles;
};

const getCyclesByUserId = async (userId) => {
  const [cycles] = await db.execute(
    `SELECT * 
    FROM cycles 
    WHERE user_id = ?
    ORDER BY started_at DESC`,
    [userId],
  );
  return cycles;
};

const getCurrentCycleByUserId = async (userId) => {
  const [cycles] = await db.execute(
    `
    SELECT *
    FROM cycles
    WHERE user_id = ? AND ended_at IS NULL
    ORDER BY started_at DESC
    LIMIT 1 
    `,
    [userId],
  );

  return cycles[0];
};

const getCycleByIdAndUserId = async (cycleId, userId) => {
  const [cycles] = await db.execute(
    `
    SELECT *
    FROM cycles
    WHERE id = ? AND user_id = ?`,
    [cycleId, userId],
  );

  return cycles[0];
};

const editCycle = async (cycleId, userId, data) => {
  const allowedFields = [
    "started_at",
    "ended_at",
    "cycle_length",
    "period_length",
  ];

  const fieldsToUpdate = allowedFields.filter(
    (field) => data[field] !== undefined,
  );

  if (fieldsToUpdate.length === 0) {
    throw new Error("No valid fields to update");
  }

  const values = fieldsToUpdate.map((field) => data[field]);

  const setClause = fieldsToUpdate.map((field) => `${field} = ?`).join(", ");

  const [result] = await db.execute(
    `UPDATE cycles SET ${setClause} WHERE id = ? AND user_id = ?`,
    [...values, cycleId, userId],
  );

  return result;
};

const deleteCycle = async (cycleId, userId) => {
  const [result] = await db.execute(
    "DELETE FROM cycles WHERE id = ? AND user_id = ?",
    [cycleId, userId],
  );
  return result;
};

const createCycle = async (userId, started_at) => {
  const [result] = await db.execute(
    `INSERT INTO cycles (user_id, started_at) VALUES(?, ?)`,
    [userId, started_at],
  );
  return result;
};

module.exports = {
  getCyclesByUserId,
  getCurrentCycleByUserId,
  getCycleByIdAndUserId,
  editCycle,
  deleteCycle,
  createCycle,
};
