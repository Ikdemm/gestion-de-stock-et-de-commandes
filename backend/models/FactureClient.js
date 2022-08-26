const mongoose = require('mongoose');
const moment= require("moment")
const Ligne = require('../models/LigneFactureVente')
const crypto = require("crypto");
const {ObjectId} = mongoose.Schema;

const factureVenteSchema= new mongoose.Schema({
    numFacture: { type: String, required: true , default:function(){
        return "FACT"+crypto.randomBytes(10).toString("hex")
      }},
      dateFacture: { type: Date,required: true, default:function(){
        return moment().format('ll');
    
       }},
    client_id: {type: ObjectId ,ref: 'Client' },
    articles:[ 
        {
            ligne_id:{type: ObjectId ,ref: 'LigneCdeVente'},
            total:{type: Number, required:true}
        }
],
frais_de_livraison: {type: Number,required: false, default:0},
net_a_payer: {type: Number,required: false, default:0},
dateEcheance: { type: Date, required: false},
mode_de_paiement: {
  type: String,
  required: true,
  enum: ["Comptant", "à crédit", "autres"],
  default: "Comptant",
},

});
factureVenteSchema.pre('remove', async function(next){
const facture= this
await Ligne.deleteMany({facture_id:facture._id})
next()
})
factureVenteSchema.methods.calculNetaPayer=function () {
 let sum = 0+this.frais_de_livraison;
  if (this.articles.length > 0) {
    console.log('length', this.articles.length)
    for (i = 0; i < this.articles.length; i++) { 
      sum += this.articles[i].total}
  } 
  console.log('sum', sum)
return sum 
}
module.exports=mongoose.model('FactureVente',factureVenteSchema );