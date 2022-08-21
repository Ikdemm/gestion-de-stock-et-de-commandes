const mongoose = require("mongoose");
const LigneAvoirAchatSchema = new mongoose.Schema({
  article: {
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
   
  },
  quantite_a: { type: Number, required: true, default: 1 },
  total: {type: Number, required: false},
  avoir_id: { type: mongoose.Schema.Types.ObjectId, ref: "AvoirAchat" },

  
});
LigneAvoirAchatSchema.methods.calculTotal=function(){
 
          return this.article.price_a * this.quantite_a
}
module.exports = mongoose.model("LigneAvoirAchat", LigneAvoirAchatSchema);
