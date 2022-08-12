const mongoose = require("mongoose");
const factureAchatSchema = new mongoose.Schema({
  numFacture: { type: String, required: true },
  dateFacture: { type: Date, default: Date.now },
  fournisseur_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fournisseur" },
  articles: [
    {
      ligne_id: { type: mongoose.Schema.Types.ObjectId, ref: "LigneCdeAchat" },
      total: { type: Number, required: true },
    },
  ],
  net_a_payer: {
    type: Number,
    required: false,
    default: function () {
      this.net_a_payer = 0;
      if (this.articles.length > 0) {
        for (i = 0; i < articles.total.length; i++)
           (this.net_a_payer += this.articles.total);
      } else  (this.net_a_payer = 0);
return this.net_a_payer
    },
  },
  dateEcheance: { type: Date, required: false },
  mode_de_paiement: {
    type: String,
    required: true,
    enum: ["Comptant", "à crédit", "autres"],
    default: "Comptant",
  },
});
module.exports = mongoose.model("FactureAchat", factureAchatSchema);
