const express = require("express");
const router = express.Router();
const {
  register,
  login,
  lockAccount,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/lockAccount/:username", lockAccount);

module.exports = router;
