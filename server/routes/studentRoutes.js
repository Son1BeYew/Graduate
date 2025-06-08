const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// POST /api/student/create
router.post("/create", studentController.createStudentInfo);
// GET /api/student/:username
router.get("/:username", studentController.getStudentInfo);

module.exports = router;
