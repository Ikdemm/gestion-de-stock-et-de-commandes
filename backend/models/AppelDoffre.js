const mongoose = require('mongoose');
const moment= require("moment")
const crypto = require("crypto");
const {ObjectId} = mongoose.Schema;

const appelDoffreSchema= new mongoose.Schema({
ref: { type: String, required: true , default:function(){
        return "APO-"+crypto.randomBytes(10).toString("hex")
      }},
dateAPO: { type: Date,required: true, default:function(){
        return moment().format('ll');
    
       }},
objet:{type: String,default:"Demande de prix"},
destinataires: [{type: ObjectId ,ref: 'Fournisseur' }],
articles:[ 
        {
            produit_id:{type: ObjectId ,ref: 'Produit'},
            quantite:{type: Number, required: true}
        }
],

commentaire: { type: String, required: false},
dateLimiteDeReponse: { type: Date, required: true},
dateDeCommandePlanifiee: { type: Date, required: false},


});

module.exports=mongoose.model('appelDoffre',appelDoffreSchema );