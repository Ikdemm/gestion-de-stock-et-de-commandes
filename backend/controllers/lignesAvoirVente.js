const Ligne = require("../models/LigneAvoirVente");
const Facture = require("../models/FactAvoirSurVente");
const Produit = require("../models/Produit");
const _ = require("lodash");

exports.createLigneAchat= async(req, res)=>{
    let factureId = req.body.avoir_id;
    //console.log('L1', factureId)
    let facture = await Facture.findById(factureId);
    //console.log('L2', facture)
    let articleId = req.body.article_id;
    console.log('L3', articleId)
    let article = await Produit.findById(articleId)
    console.log('L4', article.price_v)
    let prixDeVente= article.price_v
  
    if(!facture)
    return res.status(404).send("Cet Id de facture d'achat n'existe pas")
   var newLigne = new Ligne({
    article:{
        article_id: article._id,
           },
    quantite_a:req.body.quantite_a,
    total: prixDeVente * req.body.quantite_s,
    avoir_id:req.body.avoir_id
})
try{
    const saved_Line= await newLigne.save();
    facture.articles.push(saved_Line);
    facture.somme_a_rembourser=facture.calculNetaPayer()
    article.quanite_sortie-=saved_Line.quantite_s;
    article.stock_final= article.calculStockFinal()
    await facture.save();
    await article.save()
    res.status(201).json({ message: 'La nouvelle ligne est bien ajoutée !', saved_Line})
   
}catch(err){
    res.status(400).send(`Error : ${err.message}`);
  }

}

exports.getAllLignes= async(req, res)=>{
    let lignes= await Ligne.find()
    res.send(lignes)
}
exports.deleteOneLine = async(req,res)=>{ 
    let articleId = req.body.article_id;
    //console.log('L3', articleId)
    let article = await Produit.findById(articleId)
    const line=await Ligne.findByIdAndRemove({ _id: req.params.id });
    //console.log('ligne',line)
    if(!line){
     res.status(404).json({ message: "Aucune ligne d'achat n'est trouvée avec cet ID, veuillez vérifier le ID !"});
    }
    
    const invoice =await Facture.findById(line.facture_id);
    //console.log('invoice1',invoice)
    var index = invoice.articles.indexOf(ligne=>ligne.id==_id);
    invoice.articles.splice(index);
    invoice.somme_a_rembourser=invoice.calculNetaPayer();
    article.quanite_sortie+=line.quantite_s;
    article.stock_final=article.calculStockFinal()
    await article.save()
    await invoice.save();
    //console.log('invoice2',invoice)
    res.send(line)
}
 //update ligne d'achat
exports.updateOneLine= async (req, res)=>{
   var old_product_id
   var produit;
   var line = await Ligne.findById(req.params.id);
   console.log("line to modify", line)
   if(!line)
   return res.status(400).send('line Id not Found');
   // si on change le produit
   if(req.body.article_id){
    old_product_id=line.article.article_id;
    console.log("old_product_id", old_product_id)
    var old_article = await Produit.findById(old_product_id)
    console.log("old_article", old_article)
    old_article.quanite_sortie+=line.quantite_s;
    old_article.stock_final=old_article.calculStockFinal();
    await old_article.save()
    produit= await Produit.findById(req.body.article_id)
    console.log("new_produit", produit)

    if (!produit)
    return res.status(400).send(`Product not found for the given ID`);

    try{
        const invoice =await Facture.findById(line.facture_id);
        console.log('net a payer', invoice.somme_a_rembourser)
        console.log('total 1',line.total)
        line.article.article_id=produit
        line.total=0;
        line.total=produit.price_v*line.quantite_s
        var saved_Line = await line.save()
        var indexOfLine= invoice.articles.findIndex((l) => l.id == saved_Line._id)
        console.log('indexOfLine',indexOfLine)
        invoice.articles[indexOfLine].total=saved_Line.total
        console.log('invoice.articles[indexOfLine].total' ,invoice.articles[indexOfLine].total)
        
        invoice.somme_a_recevoir=invoice.calculNetaPayer()
        console.log('invoice.somme_a_recevoir A', invoice.somme_a_recevoir)
    
        invoice.save()
        produit.quanite_sortie-=saved_Line.quantite_s;
        produit.stock_final=produit.calculStockFinal();
        await produit.save()
        res.status(200).json({message: " Vous avez bien changé le produit à acheter"})
       } catch (err) {
        res.status(400).send(`Error : ${err.message}`);
      }
   }
   
  // si on change la quantité
  if(req.body.quantite_s){

    let old_quantity=line.quantite_s;
    console.log('old_quantity',old_quantity)
    let newQuantity=req.body.quantite_s;
    console.log('newQuantity',newQuantity)
    let ecart=newQuantity-old_quantity;

    old_product_id=line.article.article_id
    let old_article=await Produit.findById(old_product_id)
    console.log('sameProduct',old_article)
    console.log('ecart1',ecart)            
    try{

        if (ecart>0){
            old_article.quanite_sortie-=ecart
            old_article.stock_final=old_article.calculStockFinal();
            line.total+=(old_article.price_v*ecart)
            console.log('line.total1',line.total)            
        }else if(ecart<0){
            old_article.quanite_sortie-=ecart
            old_article.stock_final=old_article.calculStockFinal();
            line.total+=(old_article.price_v*ecart)
            console.log('line.total2',line.total)            
        } 
        console.log('ecart2',ecart)            
        old_article.save()
        line.quantite_s=newQuantity
        var saved_Line= await line.save()
        const invoice =await Facture.findById(line.facture_id);
        var indexOfLine= invoice.articles.findIndex((l) => l.id == saved_Line._id)
        invoice.articles[indexOfLine].total=saved_Line.total
        invoice.somme_a_rembourser=invoice.calculNetaPayer()
        invoice.save()
        res.status(200).json({message: " Vous avez bien changé la quantité à acheter"})
     } catch (err) {
        res.status(400).send(`Error : ${err.message}`);
      }

  }
} 
exports.getLineById= async (req,res)=>{
    let line = await Ligne.findById(req.params.id)
    if(!line)
    return res.status(404).send('line not found')
    res.sen(line)
}
