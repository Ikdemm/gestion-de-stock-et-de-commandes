const mongoose = require('mongoose');

const clientSchema= new mongoose.Schema({
    nomClient: {type: String, required:true},
    numero_de_tel:{type: Number, required:true, unique:true},
    adresse: {type: String, required:true},
    email: {type: String, required:true, unique:true}
  
})

module.exports= mongoose.model('Client',clientSchema )