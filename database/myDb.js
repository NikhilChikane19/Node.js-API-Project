const mongoose = require('mongoose')

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected")
    } catch (err) {
        console.log('error', err);
    }
}

connectToDatabase()
