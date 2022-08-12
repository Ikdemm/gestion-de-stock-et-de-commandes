const mongoose = require("mongoose");
const LigneArticleAchatSchema = new mongoose.Schema({
  article: {
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
    title: { type: String, required: false },
    price_a: { type: Number, required: false },
  },
  quantite_a: { type: Number, required: true },
  total: {
    type: Number,
    required: false,
    default: function () {   
        return this.article.price_a * this.quantite_a;
    },
  },
    facture_id: { type: mongoose.Schema.Types.ObjectId, ref: "FactureAchat" },

  
});

module.exports = mongoose.model("LigneCdeAchat", LigneArticleAchatSchema);
