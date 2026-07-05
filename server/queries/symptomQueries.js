const db = require("../config/db");

const getSymptoms = async () => {
  const [rows] = await db.execute("SELECT * FROM symptoms ORDER by id asc");
  return rows;
};

module.exports = {
  getSymptoms,
};
