const mongoose = require('mongoose');
const Produit = require('../models/Produit')
const categorieSchema= new mongoose.Schema({
    name:{type:String, required : true},
    nb_produits:{type:Number, default:0},
    produits:[
        {type: mongoose.Schema.Types.ObjectId ,ref: 'Produit' }
    ]
    
})
categorieSchema.pre('remove', async function(next){
   const categorie= this
   await Produit.deleteMany({categorie_id:categorie._id})
   next()
})
module.exports=mongoose.model('Categorie',categorieSchema )