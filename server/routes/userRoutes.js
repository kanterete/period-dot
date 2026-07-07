const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/me", userController.getMe);
router.patch("/me", userController.editMe);
router.delete("/me", userController.deleteMe);

module.exports = router;
