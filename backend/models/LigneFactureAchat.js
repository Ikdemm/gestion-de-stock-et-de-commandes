const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const LigneArticleAchatSchema = new mongoose.Schema({
  article: {
    article_id: { type: ObjectId, ref: "Produit" },
    //title: { type: String, required: false },
    //price_a: { type: Number, required: false },
  },
  quantite_a: { type: Number, required: true, default: 1 },
  total_HT: {type: Number, required: false, default:0 },
  TVA: {type: Number, required: false, default:0},
  total_TTC: {type: Number, required: false, default:0},
  facture_id: { type: ObjectId, ref: "FactureAchat" },

});

LigneArticleAchatSchema.methods.calculTotal=function(){
 
          return this.article.price_a * this.quantite_a
}
LigneArticleAchatSchema.methods.calculTVA=function(){
 
          return this.article.price_a * this.quantite_a * (this.article.taxe_sur_la_valeur_ajoutee/100)
}
LigneArticleAchatSchema.methods.calculTTC=function(){
 
          return this.total_HT + this.TVA
}
module.exports = mongoose.model("LigneCdeAchat", LigneArticleAchatSchema);
