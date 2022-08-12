const Ligne = require("../models/LigneFactureVente");
const Facture = require("../models/FactureClient");
const Produit = require("../models/Produit");
const _ = require("lodash")
exports.createLigneAchat= async(req, res)=>{
    let factureId = req.body.facture_id;
    let facture = await Facture.findById(factureId);
    let articleId = req.body.article_id;
    //console.log(articleId)
    let produit= await Produit.findById(articleId)
    //console.log(produit)
    if(!facture)
    return res.status(400).send("Cet Id de facture de vente n'existe pas")
   var newLigne = new Ligne({
    article:{
        article_id: articleId._id,
        title: produit.title,
        price_v: produit.price_v,
        qte_en_stock: produit.qte_en_stock,
    },
    quantite:req.body.quantite,
    total:req.body.total
})
if(newLigne.article.qte_en_stock>=newLigne.quantite){
    try{

        const saved_Line= await newLigne.save() ;
        facture.articles.push(saved_Line);
        console.log(produit.qte_en_stock)
        produit.qte_en_stock-=newLigne.quantite;
        await facture.save();
        console.log(produit.qte_en_stock)
        res.status(201).json({ message: 'La nouvelle ligne est bien ajoutée à la facture de vente !'})

}catch(err){
    res.status(400).send(`Error : ${err.message}`);
  }

}

else  
//console.log({message: `La quantité commandée : ${newLigne.quantite} est supérieure à la quantité en stock : ${newLigne.article.qte_en_stock}`});
return res.status(400).send(`La quantité commandée : ${newLigne.quantite} est supérieure à la quantité en stock : ${newLigne.article.qte_en_stock}`);
}


