const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const productSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  categorie: {
    categorie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
      required: true,
    },
  },
  price_a: { type: Number, required: true },
  price_v: { type: Number, required: true },

  stock: {
    //stock_id: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
      stock_initial:{type:Number, required:true, default:0},
      quantite_entree:{type: Number, required: true, default:0},
      quantite_sortie:{type: Number, required: true, default:0} ,
      stock_final:{type:Number, required:false,
    default:function(){
var SF=this.stock_final      
var SI=this.stock.stock_initial;
console.log(SI)
var E=this.stock.quantite_entree;
console.log(E)
var S=this.stock.quantite_sortie;
console.log(S)
var SF= SI+E-S
console.log('SF', SF)
return SF
    }},
    stock_min:{type:Number, required:true, default:20},
    stock_max:{type:Number, required:true, default:100}
  },
});
/* let product_validator=Joi.object({
    title:Joi.string().required(),
    description: Joi.string(),
   // imageUrl:Joi.any(),
    categorie:  Joi.objectId(),
    price_a:Joi.number().positive().required() ,
    price_v:Joi.number().positive().required(),
    qte_en_stock:Joi.number().integer().positive() ,
    stock_min: Joi.number().integer().positive(),
})
 */
module.exports = mongoose.model("Produit", productSchema);
//module.exports.product_validator= product_validator;
