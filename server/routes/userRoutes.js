const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:userId", userController.deleteUser);
router.patch("/:userId", userController.editUser);

module.exports = router;
