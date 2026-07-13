const cycleQueries = require("../queries/cycleQueries");

// TODO: role crud for admin

const getMyCycles = async (req, res) => {
  try {
    const userId = req.user.id;

    const cycles = await cycleQueries.getCyclesByUserId(userId);

    return res.status(200).send({ cycles, message: "Cycles found" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};

const getCurrentCycle = async (req, res) => {
  try {
    const userId = req.user.id;

    const currentCycle = await cycleQueries.getCurrentCycleByUserId(userId);

    if (!currentCycle) {
      return res.status(404).send({ message: "No current cycle found" });
    }

    return res
      .status(200)
      .send({ cycle: currentCycle, message: "Cycle found" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};

const getCycleById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cycleId } = req.params;

    const cycle = await cycleQueries.getCycleByIdAndUserId(cycleId, userId);

    if (!cycle) {
      return res.status(404).send({ message: "Cycle not found" });
    }

    return res.status(200).send({ cycle, message: "Cycle found" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};

const editCycle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cycleId } = req.params;

    const cycle = await cycleQueries.getCycleByIdAndUserId(cycleId, userId);

    if (!cycle) {
      return res.status(404).send({ message: "Cycle not found" });
    }

    await cycleQueries.editCycle(cycleId, userId, req.body);

    return res.status(200).send({
      cycle,
      message: "Cycle found",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};

const deleteCycle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cycleId } = req.params;

    const cycle = await cycleQueries.getCycleByIdAndUserId(cycleId, userId);

    if (!cycle) {
      return res.status(404).send({
        message: "Cycle not found",
      });
    }

    await cycleQueries.deleteCycle(cycleId, userId);

    return res.status(200).send({
      message: "Cycle deleted",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};

const createCycle = async (req, res) => {
  try {
    const userId = req.user.id;
    const started_at_date = req.body.started_at_date;

    const result = await cycleQueries.createCycle(userId, started_at_date);

    res.status(201).send({ result, message: "Cycle created" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  getMyCycles,
  getCurrentCycle,
  getCycleById,
  editCycle,
  deleteCycle,
  createCycle,
};
