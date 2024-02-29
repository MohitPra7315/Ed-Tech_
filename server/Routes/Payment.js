
const express = require("express")
const { isStudent, Auth } = require("../Middleware/AuthN_AothZ")
const { capturePayment, verifyPayment, sendPaymentSuccesfullyMail_C } = require("../controllers/Payment")

const router = express.Router()


router.post("/capturePayment", Auth, isStudent, capturePayment)
router.post("/verifyPayment", Auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", Auth, isStudent, sendPaymentSuccesfullyMail_C)



module.exports = router
