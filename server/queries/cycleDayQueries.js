const db = require("../config/db");

const getCycleDay = async (req, res) => {
  const [cycleDay] = await db.execute(`SELECT * from cycle_day`);
  return cycleDay;
};

const getCycleDayByCycleId = async (cycleId) => {
  const [cycleDay] = await db.execute(
    "SELECT * FROM cycle_days WHERE cycle_id = ?",
    [cycleId],
  );

  return cycleDay;
};

const createCycleDay = async (data) => {
  const [result] = await db.execute(
    `
        INSERT INTO cycle_days (cycle_id, day_date, phase, body_temp, bleeding_level, pain_level, mood, note) VALUES = (?, ?, ?, ?, ?, ?, ?, ?)`,
    [...data],
  );
  return result;
};

module.exports = {
  getCycleDay,
  getCycleDayByCycleId,
  createCycleDay,
};
