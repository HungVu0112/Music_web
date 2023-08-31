const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();

let isConnected = false;

async function connect () {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("Is Connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "music_web",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("MONGODB CONNECTED")
         } catch (error) {
        console.log(error)
    }
}

module.exports = { connect }