const mongoose = require('mongoose')

async function connect( ) {
    
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/web_music');
        console.log('Connect Successfully!')
    } catch (error) {
        console.log('Failed!')
    }

}

module.exports = { connect }