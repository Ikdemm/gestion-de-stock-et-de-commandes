const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE,
//you can replace process.env.DATABASE with the db below
//"mongodb+srv://mongo:123@nodesstoragemanager.8umboxw.mongodb.net/?retryWrites=true&w=majority"
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Mongo is UP!!'))
  .catch(() => console.log('Mongo is down !'+Error));
