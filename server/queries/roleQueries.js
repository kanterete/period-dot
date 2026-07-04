const db = require("../config/db");

const getRoles = async () => {
  const sql = "SELECT * FROM roles";

  const [rows] = await db.execute(sql);
  return rows;
};

module.exports = { getRoles };
