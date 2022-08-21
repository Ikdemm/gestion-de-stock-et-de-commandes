const { Schema } = require("mongoose");
const crypto = require("crypto");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const champsCommandeSchema = new Schema({
  numCommande: { type: String, required: true, default:function(){
    return crypto.randomBytes(10).toString("hex")
  } },
  dateCommande: { type: Date, default: Date.now(), required: true },
  dateEcheance: { type: Date, default: this.dateCommande + 15 },
 /*  etatCommande: {
    type: String,
    enum: ["en_cours_de_preparation", "validee", "livree"],
    default: "en_cours_de_preparation",
  }, */
  modeDePaiement: {
    type: String,
    enum: ["comptant", "credit", "autre"],
    default: "comptant",
  },
  commentaire: { type: String, required: false },
});
const commandeFournisseurSchema = new Schema({
  champs: champsCommandeSchema ,
  fournisseur_id: { type: ObjectId, ref: "Fournisseur" },
  articles: [
    {
      ligne_id: { type: ObjectId, ref: "LigneCdeAchat" },
      total: { type: Number, required: true },
    },
  ],
  net_a_payer: { type: Number,
     default: function () {
      this.net_a_payer = 0;
      if (this.articles.length > 0) {
        for (i = 0; i < this.articles.length; i++){

            this.net_a_payer += this.articles.total;
        }
      }
      return this.net_a_payer;
    }, }
});
const commandeClientSchema = new Schema({
  champs: [champsCommandeSchema],
  client_id: { type: ObjectId, ref: "Client" },
  articles: [{
      ligne_id: { type: ObjectId, ref: "LigneCdeVente" },
      total: { type: Number, required: true },
    }],
    net_a_payer: { type: Number,
      default: function () {
       this.net_a_payer = 0;
       if (this.articles.length > 0) {
         for (i = 0; i < this.articles.length; i++){
 
             this.net_a_payer += this.articles.total;
         }
       }
       return this.net_a_payer;
     }, }
});
const CommandeFournisseur = mongoose.model("CommandeFournisseur", commandeFournisseurSchema);
const CommandeClient = mongoose.model("CommandeClient", commandeClientSchema);
module.exports={
  CommandeFournisseur:CommandeFournisseur,
  CommandeClient:CommandeClient
}