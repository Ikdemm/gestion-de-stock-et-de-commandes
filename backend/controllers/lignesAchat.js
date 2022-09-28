const Ligne = require("../models/LigneFactureAchat");
const Facture = require("../models/FactureFournisseur");
const Produit = require("../models/Produit");
const _ = require("lodash");

exports.createLigneAchat= async(req, res)=>{
    let factureId = req.body.facture_id;
    //console.log('L1', factureId)
    let facture = await Facture.findById(factureId);
    //console.log('L2', facture)
    let articleId = req.body.article_id;
    let article = await Produit.findById(articleId)
    let prixDachat= article.price_a
    let TVA_deductible = article.taxe_sur_la_valeur_ajoutee /100 ;
    const quantite_a= req.body.quantite_a; 
    const total_HT= prixDachat * quantite_a 
    const TVA = total_HT* TVA_deductible;
    const total_TTC = total_HT+ TVA;

    if(!facture)
    return res.status(404).send("Cet Id de facture d'achat n'existe pas")
   var newLigne = new Ligne({
    article:{
        article_id: article._id,
           },
    quantite_a: quantite_a,
    total_HT: total_HT ,
    TVA: TVA,
    total_TTC:total_TTC ,
    facture_id:facture._id
})
try{
    const saved_Line= await newLigne.save();
    facture.articles.push(saved_Line);
    facture.net_commercial_HT=facture.calculTotalHT()
    facture.TVA_deductibles=facture.calculTotalTVA()
    facture.net_a_payer=facture.calculNetaPayer()
    await facture.save();
    article.quantite_entree+=saved_Line.quantite_a;
    article.stock_final= article.calculStockFinal()
    article.etat= article.actualiserEtat()
    await article.save()
    res.status(201).json({ message: 'La nouvelle ligne est bien ajoutée à la facture !', saved_Line})
   
}catch(err){
    res.status(400).send(`Error : ${err.message}`);
  }

}

exports.getAllLignes= async(req, res)=>{
    let lignes= await Ligne.find()
    res.send(lignes)
}

exports.deleteOneLine = async(req,res)=>{ 
    //const line=await Ligne.findByIdAndRemove({ _id: req.params.id });
    const line=await Ligne.findOne({ _id: req.params.id });
    console.log('ligne',line)
    let articleId = line.article.article_id;
    console.log('articleId', articleId)
    let article = await Produit.findById(articleId)
    console.log('article', article)
    if(!line){
     res.status(404).json({ message: "Aucune ligne d'achat n'est trouvée avec cet ID, veuillez vérifier le ID !"});
    }
    try{
        const invoice =await Facture.findById(line.facture_id);
        //console.log('invoice1',invoice)
        var index = invoice.articles.indexOf(ligne=>ligne.id==_id);
        invoice.articles.splice(index);
        invoice.net_a_payer=invoice.calculNetaPayer();
        invoice.net_commercial_HT=invoice.calculTotalHT();
        invoice.TVA_deductibles=invoice.calculNetaPayer();
        article.quantite_entree-=line.quantite_a;
        article.stock_final=article.calculStockFinal()
        article.etat= article.actualiserEtat()

        await article.save()
        await invoice.save();
        await line.remove();
        //console.log('invoice2',invoice)
        res.send(line)
    } catch (err) {
        res.status(400).send(`Error : ${err.message}`);
      }

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
    old_article.quantite_entree-=line.quantite_a;
    old_article.stock_final=old_article.calculStockFinal();
    await old_article.save()
    produit= await Produit.findById(req.body.article_id)
    console.log("new_produit", produit)

    if (!produit)
    return res.status(400).send(`Product not found for the given ID`);

    try{
        const invoice =await Facture.findById(line.facture_id);
        console.log('net a payer', invoice.net_a_payer)
        console.log('total_HT 1',line.total_HT)
        line.article.article_id=produit
        line.total_HT=0;
        line.total_HT=produit.price_a*line.quantite_a
        var saved_Line = await line.save()
        var indexOfLine= invoice.articles.findIndex((l) => l.id == saved_Line._id)
        console.log('indexOfLine',indexOfLine)
        invoice.articles[indexOfLine].total_HT=saved_Line.total_HT
        console.log('invoice.articles[indexOfLine].total_HT' ,invoice.articles[indexOfLine].total_HT)
        invoice.net_commercial_HT=invoice.calculTotalHT()
        invoice.TVA_deductibles=invoice.calculTotalTVA()
        invoice.net_a_payer=invoice.calculNetaPayer()
        console.log('invoice.net_a_payer A', invoice.net_a_payer)
    
        invoice.save()
        produit.quantite_entree+=saved_Line.quantite_a;
        produit.stock_final=produit.calculStockFinal();
        await produit.save()
        res.status(200).json({message: " Vous avez bien changé le produit à acheter"})
       } catch (err) {
        res.status(400).send(`Error : ${err.message}`);
      }
   }
   
  // si on change la quantité
  if(req.body.quantite_a){

    let old_quantity=line.quantite_a;
    console.log('old_quantity',old_quantity)
    let newQuantity=req.body.quantite_a;
    console.log('newQuantity',newQuantity)
    let ecart=newQuantity-old_quantity;

    old_product_id=line.article.article_id
    old_article=await Produit.findById(old_product_id)
   
    console.log('sameProduct',old_article)
    console.log('ecart1',ecart)            
    try{

        if (ecart>0){
            old_article.quantite_entree+=ecart
            old_article.stock_final=old_article.calculStockFinal();
            line.total_HT+=(old_article.price_a*ecart)
            console.log('line.total1',line.total_HT)            
        }else{ if(ecart<0){
            old_article.quantite_entree+=ecart
            old_article.stock_final=old_article.calculStockFinal();
            line.total_HT+=(old_article.price_a*ecart)
            console.log('line.total2',line.total_HT)}            
        } 
        console.log('ecart2',ecart)            
        old_article.save()
        line.quantite_a=newQuantity
        var saved_Line= await line.save()
        const invoice =await Facture.findById(line.facture_id);
        var indexOfLine= invoice.articles.findIndex((l) => l.id == saved_Line._id)
        invoice.articles[indexOfLine].total_HT=saved_Line.total_HT
        invoice.net_commercial_HT=invoice.calculTotalHT()
        invoice.TVA_deductibles=invoice.calculTotalTVA()
        invoice.net_a_payer=invoice.calculNetaPayer()
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
    res.send(line)
}
