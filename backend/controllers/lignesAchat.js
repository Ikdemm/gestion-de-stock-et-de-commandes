const Ligne = require("../models/LigneFactureAchat");
const Facture = require("../models/FactureFournisseur");
const Produit = require("../models/Produit");
//const Stock = require("../models/Stock");

const _ = require("lodash")
exports.createLigneAchat= async(req, res)=>{
    let factureId = req.body.facture_id;
    //console.log('L1', factureId)
    let facture = await Facture.findById(factureId);
    //console.log('L2', facture)
    let articleId = req.body.article_id;
    //console.log('L3', articleId)
    let article = await Produit.findById(articleId)
    //console.log('L4', article)
  
    //console.log('stock', stock)
    if(!facture)
    return res.status(404).send("Cet Id de facture d'achat n'existe pas")
   var newLigne = new Ligne({
    article:{
        article_id: article._id,
        title: article.title,
        price_a: article.price_a
    },
    quantite_a:req.body.quantite_a,
    total:req.body.total,
    facture_id:req.body.facture_id
})
try{
    const saved_Line= await newLigne.save();
    facture.articles.push(saved_Line);
    facture.net_a_payer+=saved_Line.total;
    await facture.save();
   
    console.log(article.stock.stock_final);
    article.stock.quantite_entree+=saved_Line.quantite_a;
    article.stock.stock_final+=saved_Line.quantite_a;
    console.log(saved_Line.quantite_a);
    await article.save()
    console.log(article.stock.stock_final);
    res.status(201).json({ message: 'La nouvelle ligne est bien ajoutée à la facture !', saved_Line})

}catch(err){
    res.status(400).send(`Error : ${err.message}`);
  }

}

exports.getAllLignes= async(req, res)=>{
    let lignes= await Ligne.find()
    res.send(lignes)
}
exports.deleteOneLine=async(req,res)=>{
    let articleId = req.body.article_id;
    //console.log('L3', articleId)
    let article = await Produit.findById(articleId)
    const line=await Ligne.findByIdAndRemove({ _id: req.params.id });
    console.log('ligne',line)

    if(!line){

     res.status(404).json({ message: "Aucune ligne d'achat n'est trouvée avec cet ID, veuillez vérifier le ID !"});
    }
    
    const invoice =await Facture.findById(line.facture_id);
    console.log('invoice1',invoice)
    var index = await invoice.articles.indexOf(ligne=>ligne.id==_id);
    await invoice.articles.splice(index);
    invoice.net_a_payer-=line.total;
    article.stock.quantite_entree-=line.quantite_a;
    article.stock.stock_final-=line.quantite_a;
    await article.save()
    await invoice.save();
    console.log('invoice2',invoice)
    res.send(line)
}