const mongoose = require("mongoose");
const LigneArticleVenteSchema = new mongoose.Schema({
  article: {
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
    title: { type: String, required: false },
    price_v: { type: Number, required: false },
    qte_en_stock: { type: Number, required: false },
  },
  quantite: { type: Number, required: true, default: 1 },
  total: {
    type: Number,
    required: false,
    default: function () {
   
      return this.article.price_v * this.quantite;
    },
  },

  facture_id: { type: mongoose.Schema.Types.ObjectId, ref: "FactureVente" },
});

module.exports = mongoose.model("LigneCdeVente", LigneArticleVenteSchema);
