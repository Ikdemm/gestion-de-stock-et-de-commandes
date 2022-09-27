const mongoose = require('mongoose');
require('dotenv').config();

//mongoose.connect(process.env.DATABASE,
mongoose.connect("mongodb://localhost:27017/gsc",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Mongo is UP!!'))
  .catch(() => console.log('Mongo is down !'+Error));
