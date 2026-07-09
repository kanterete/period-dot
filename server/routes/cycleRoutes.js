const express = require("express");
const router = express.Router();

const cycleController = require("../controllers/cycleController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", cycleController.getMyCycles);
router.get("/current", cycleController.getCurrentCycle);
router.get("/:cycleId", cycleController.getCycleById);

router.patch("/:cycleId", cycleController.editCycle);
router.delete("/:cycleId", cycleController.deleteCycle);

module.exports = router;
