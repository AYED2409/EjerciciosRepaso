const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to Mongo!'))
.catch(e => console.log('error to connect', e))
