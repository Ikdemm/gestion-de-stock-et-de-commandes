const mongoose = require('mongoose');
const fournisseurSchema= new mongoose.Schema({
    nom_commercial: {type: String, required:true},
    numero_de_tel:{type: Number, required:true},
    adresse: {type: String, required:true},
    commandes:[
        {type: mongoose.Schema.Types.ObjectId ,ref: 'FactureAchat' }
    ]
})

module.exports= mongoose.model('Fournisseur',fournisseurSchema )