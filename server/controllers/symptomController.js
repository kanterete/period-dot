const symptomQuries = require("../queries/symptomQueries");

const getSymptoms = async (req, res) => {
  try {
    const symptoms = await symptomQuries.getSymptoms();
    res.status(200).json(symptoms);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

module.exports = { getSymptoms };
