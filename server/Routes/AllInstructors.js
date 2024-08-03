
const express = require("express");
const router = express.Router();
const { AllInstructor } = require('../controllers/AllInstructor')
// router.Get("/ShowAllInstructor", AllInstructor);
router.get('/ShowAllInstructor', AllInstructor)
module.exports = router;
