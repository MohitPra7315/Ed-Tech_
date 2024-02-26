
const express = require("express")
const { isStudent, Auth } = require("../Middleware/AuthN_AothZ")
const { capturePayment, verifyPayment, sendPaymentSuccesfullyMail } = require("../controllers/Payment")

const router = express.Router()


router.post("/capturePayment", Auth, isStudent, capturePayment)
router.post("/verifyPayment", Auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", Auth, isStudent, sendPaymentSuccesfullyMail)



module.exports = router
