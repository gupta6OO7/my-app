const mongoose = require('mongoose');

const mongoDb = async() => {
    const uri = 'mongodb+srv://21ucs140:product140@cluster0.h97e9gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    console.log(uri);
    await mongoose.connect(uri, async() => {
        console.log("connected");
    });
}

module.exports = mongoDb;