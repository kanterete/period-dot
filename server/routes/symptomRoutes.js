const express = require("express");
const router = express.Router();

const symptomController = require("../controllers/symptomController");

router.get("/", symptomController.getSymptoms);

module.exports = router;
