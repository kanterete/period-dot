const express = require("express");
const router = express.Router();

const adminUserController = require("../../controllers/admin/adminUserController.js");
const {
  adminMiddleware,
  authMiddleware,
} = require("../../middleware/authMiddleware");

router.use(authMiddleware, adminMiddleware);

router.get("/", adminUserController.getUsers);
router.get("/:userId", adminUserController.getUserById);
router.post("/", adminUserController.createUser);
router.patch("/:userId", adminUserController.editUser);
router.delete("/:userId", adminUserController.deleteUser);

module.exports = router;
