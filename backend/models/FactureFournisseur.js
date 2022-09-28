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
      total_HT: { type: Number, required: true }, 
      TVA: { type: Number, required: true }, 
      total_TTC: { type: Number, required: true }, 
    },
  ],
  frais_de_livraison: {type: Number,required: false, default:0},
  net_commercial_HT:{type: Number,required: false, default:0},
  TVA_deductibles:{type: Number,required: false, default:0},
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
        console.log('calculNetaPayer',this.articles[i].total_TTC) 
        sum += this.articles[i].total_TTC}
        return sum +this.frais_de_livraison
    }else if (this.articles.length = 0){
      return sum += this.frais_de_livraison

    }

  }
factureAchatSchema.methods.calculTotalTVA=function () {
   let TVA_deductibles = 0;
    if (this.articles.length > 0) {
      console.log('length', this.articles.length)
      for (i = 0; i < this.articles.length; i++) { 
        console.log('calculTotalTVA',this.articles[i].TVA) 
        TVA_deductibles += this.articles[i].TVA}
        return TVA_deductibles
    }else if (this.articles.length = 0){
      return TVA_deductibles

    }

  }
factureAchatSchema.methods.calculTotalHT=function () {
   let net_commercial_HT = 0;
    if (this.articles.length > 0) {
      console.log('length', this.articles.length)
      for (i = 0; i < this.articles.length; i++) { 
        console.log('calculTotalHT',this.articles[i].total_HT) 
        net_commercial_HT += this.articles[i].total_HT}
        return net_commercial_HT
    }else if (this.articles.length = 0){
      return net_commercial_HT

    }

  }

module.exports = mongoose.model("FactureAchat", factureAchatSchema);
