const razorpay = require("razorpay")
require("dotenv").config();

exports.instance = new razorpay({
    key_id: 'rzp_test_yBMmOy4vxKIjQp',
    key_secret: 'tLy7WiXrjC8gW900FrCBpsx1'
});


