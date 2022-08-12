const { Schema } = require("mongoose");
const crypto = require("crypto");

const champsCommandeSchema = new Schema({
  numCommande: { type: String, minlength: 6, maxlength: 10, default:function(){
    return crypto.randomBytes(10).toString("hex")
  } },
  dateCommande: { type: Date, default: Date.now(), required: true },
  dateEcheance: { type: Date, default: dateCommande + 15 },
  etatCommande: {
    type: String,
    enum: ["en_cours_de_preparation", "validee", "livree"],
    default: "en_cours_de_preparation",
  },
  modeDePaiement: {
    type: String,
    enum: ["comptant", "credit", "autre"],
    default: "comptant",
  },
  commentaire: { type: String, required: false },
});
const commandeFournisseur = new Schema({
  champs: [champsCommandeSchema],
  fournisseur_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fournisseur" },
  articles: [
    {
      ligne_id: { type: mongoose.Schema.Types.ObjectId, ref: "LigneCdeAchat" },
      total: { type: Number, required: true },
    },
  ],
  net_a_payer: { type: Number}
   /*  default: function () {
      this.net_a_payer = 0;
      if (this.articles.length > 0) {
        for (i = 0; i < this.articles.length; i++){

            this.net_a_payer += this.articles.total;
        }
      }
      return this.net_a_payer;
    }, */
});
const commandeClient = new Schema({
  champs: [champsCommandeSchema],
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  articles: [{
      ligne_id: { type: mongoose.Schema.Types.ObjectId, ref: "LigneCdeVente" },
      total: { type: Number, required: true },
    }],
  net_a_payer: {type: Number}

});
module.export = mongoose.model("CommandeFournisseur", commandeFournisseur);
module.export = mongoose.model("CommandeClient", commandeClient);
