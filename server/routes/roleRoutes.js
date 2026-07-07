const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

router.use(authMiddleware, adminMiddleware);

router.get("/", roleController.getRoles);

module.exports = router;
