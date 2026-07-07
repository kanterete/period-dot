const express = require("express");
const router = express.Router();

const symptomController = require("../controllers/symptomController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", symptomController.getSymptoms);

module.exports = router;
