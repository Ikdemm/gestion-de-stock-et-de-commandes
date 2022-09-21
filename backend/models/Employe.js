const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const employeSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  imageUrl: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  numCIN: { type: Number, required: true, unique: true },
  numTel: { type: Number, required: true, unique: true },
  adresse: { type: String, required: true },
  date_de_naissance: { type: Date, required: true },
  date_de_recrutement: { type: Date, required: true },
  poste: { type: String, required: true },
  direction_id: { type: ObjectId, ref: "Direction", required: true },
});

module.exports = mongoose.model("Employe", employeSchema);
