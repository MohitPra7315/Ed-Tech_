const razorpay = require("razorpay")
require("dotenv").config();

exports.instance = new razorpay({
        key_id:process.env.Razorpay_key_id,
    key_secret: process.env.Razorpay_key_secret
});


