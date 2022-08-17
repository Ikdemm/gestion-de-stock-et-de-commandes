const mongoose = require("mongoose");
const LigneAvoirVenteSchema = new mongoose.Schema({
  article: {
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
    //title: { type: String, required: false },
    //price_a: { type: Number, required: false },
  },
  quantite_s: { type: Number, required: true, default: 1 },
  total: {type: Number, required: false},
  avoir_id: { type: mongoose.Schema.Types.ObjectId, ref: "FactureVente" },

  
});
LigneArticleAchatSchema.methods.calculTotal=function(){
 
          return this.article.price_a * this.quantite_a
}
module.exports = mongoose.model("LigneAvoirVente", LigneAvoirVenteSchema);
