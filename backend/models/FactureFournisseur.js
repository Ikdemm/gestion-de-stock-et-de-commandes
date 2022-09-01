const mongoose = require("mongoose");
const moment= require("moment")
const Ligne = require('../models/LigneFactureAchat')
const crypto = require("crypto");
const {ObjectId} = mongoose.Schema;

const factureAchatSchema = new mongoose.Schema({
  numFacture: { type: String, required: true , default:function(){
    return "FACT"+crypto.randomBytes(10).toString("hex")
  }},
  dateFacture: { type: Date,required: true, default:function(){
    return moment().format('ll');

   }},
  fournisseur_id: { type: ObjectId, ref: "Fournisseur" },
  articles: [
    {
      ligne_id: { type: ObjectId, ref: "LigneCdeAchat" },
     total: { type: Number, required: true }, 
    },
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
  etat:{type: String,enum: ["payee", "non_payee"],
  default: function(){
    if(this.mode_de_paiement=="Comptant"){
      return "payee"
    }else
    return "non_payee"
  }}

});

factureAchatSchema.pre('remove', async function(next){
  const facture= this
  await Ligne.deleteMany({facture_id:facture._id})
  next()
})
factureAchatSchema.methods.calculNetaPayer=function () {
   let sum = 0;
    if (this.articles.length > 0) {
      console.log('length', this.articles.length)
      for (i = 0; i < this.articles.length; i++) { 
        console.log('ssss',this.articles[i].total) 
        sum += this.articles[i].total}
        return sum +this.frais_de_livraison
    } if (this.articles.length = 0){
      return sum+= this.frais_de_livraison

    }

  }

module.exports = mongoose.model("FactureAchat", factureAchatSchema);
