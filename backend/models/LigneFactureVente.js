const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const LigneArticleVenteSchema = new mongoose.Schema({
  article: {
    article_id: { type: ObjectId, ref: "Produit" }
  },
  quantite_s: { type: Number, required: true, default: 1 },
  total: { type: Number,  required: false },
  facture_id: { type: ObjectId, ref: "FactureVente" },
});
LigneArticleVenteSchema.methods.calculTotal=function(){
 
  return this.article.price_a * this.quantite_a
}
module.exports = mongoose.model("LigneCdeVente", LigneArticleVenteSchema);
