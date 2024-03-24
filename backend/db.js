const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGODB_URI


const mongoDB = async() => {
     try {
        await mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log('MongoDb connected successfully');
     } catch (error) {
        console.log('MongoDb connection error', error);
     }
}

module.exports = mongoDB;