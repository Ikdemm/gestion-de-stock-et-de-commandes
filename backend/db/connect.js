const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE,

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Mongo is UP!!'))
  .catch(() => console.log('Mongo is down !'+Error));
