const razorpay = require("razorpay")


exports.instance = new razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});


