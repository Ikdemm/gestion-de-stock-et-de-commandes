const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const fournisseurSchema= new mongoose.Schema({
    nom_commercial: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    numero_de_tel:{type: Number, required:true},
    adresse: {type: String, required:true},
    logo: {type: String, required:false},

})
fournisseurSchema.plugin(uniqueValidator);
module.exports= mongoose.model('Fournisseur',fournisseurSchema )