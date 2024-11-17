const express = require("express");
const {
  loginController,
  registerController,
  verify,
} = require("../controllers/userController");
const { verifyUser } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/verify", verifyUser, verify);

module.exports = router;
