const roleQueries = require("../queries/roleQueries");

const getRoles = async (req, res) => {
  try {
    const roles = await roleQueries.getRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRoles };
