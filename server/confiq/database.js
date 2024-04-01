const mongoose = require("mongoose");

require("dotenv").config()

exports.dbconnection =  async() => {
    mongoose.connect( process.env.MOGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log("Db connection succesfully"))
        .catch((error) => {
            console.log("Db Facing connection isssuess")
            console.error(error)
            process.exit(1)
        })
}
