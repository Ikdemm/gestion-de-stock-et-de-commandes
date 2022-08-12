const mongoose = require('mongoose');
const clientSchema= new mongoose.Schema({
    nomClient: {type: String, required:true},
    numero_de_tel:{type: Number, required:true},
    adresse: {type: String, required:true},
    email: {type: String, required:true},
    commandes:[
        {type: mongoose.Schema.Types.ObjectId ,ref: 'FactureVente' }
    ]
  
})

module.exports= mongoose.model('Client',clientSchema )