const mongoose = require('mongoose');
//const Produit = require('../models/Produit');
const {ObjectId} = mongoose.Schema;

const categorieSchema= new mongoose.Schema({
    name:{type:String, required : true, unique:true},
    nb_produits:{type:Number, default:0},
    produits:[
        {type:ObjectId ,ref: 'Produit' }
    ]
    
})
/* categorieSchema.pre('remove', async function(next){
   const categorie= this
   await Produit.deleteMany({categorie_id:categorie._id})
   next()
}) */
module.exports=mongoose.model('Categorie',categorieSchema )