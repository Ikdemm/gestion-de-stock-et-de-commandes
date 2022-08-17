const mongoose = require("mongoose");
const moment= require("moment")
const Ligne = require('../models/LigneAvoirVente')
const crypto = require("crypto");

const AvoirVenteSchema = new mongoose.Schema({
    numAvoir: { type: String, required: true , default:function(){
      return "AV-"+crypto.randomBytes(10).toString("hex")
    }},
    dateAvoir: { type: Date,required: true, default:function(){
      return moment().format('ll');
  
     }},
    facture_id:{type: mongoose.Schema.Types.ObjectId, ref: "FactureVente"}, 
    articles: [
      {
    ligne_id: { type: mongoose.Schema.Types.ObjectId, ref: "LigneAvoirVente" },
    total: { type: Number, required: true }, 
      },
    ],
    somme_a_rembourser: {type: Number,required: false, default:0},
    
  
  });
  AvoirVenteSchema.pre('remove', async function(next){
    const avoir= this
    await Ligne.deleteMany({avoir_id:avoir._id})
    next()
  })
  AvoirVenteSchema.methods.calculNetaPayer=function () {
     let sum = 0;
      if (this.articles.length > 0) {
        console.log('length', this.articles.length)
        for (i = 0; i < this.articles.length; i++) { 
          console.log('ssss',this.articles[i].total) 
          sum += this.articles[i].total}
      } 
      console.log('sum', sum)
  return sum 
    }
  
  module.exports = mongoose.model("AvoirVente", AvoirVenteSchema);
  