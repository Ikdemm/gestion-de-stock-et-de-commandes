const Stock =require('../models/Stock')

exports.createCategorie = async (req, res) => {
    let newStock = new Stock(req.body)
    try{
        newStock =await newStock.save()
        res.send(newStock)
    }catch(error){
        res.status(400).send(`Error : ${error.message}`);

    }


/*    let produit_id=req.body.produit_id;
    console.log(produit_id);
    let produit= await Produit.findById(produit_id);
    console.log(produit);
    let achatId=req.body.entrees;
    console.log(achatId);
    let achat= await Achat.findById(achatId);
    console.log(achat);
    let venteId=req.body.sorties;
    console.log(venteId);
    let vente= await Vente.findById(venteId);
    console.log(vente);

if(!produit)
return res.status(400).send("Un produit avec cet Id n'existe pas") 

var newStock = new Stock({
    produit:{
        produit_id:produit._id,
        title:produit.title
    },
    stock_initial:req.body.stock_initial,
    entrees:{
        achat_id:achat._id,
        quantite_e:achatId.quantite_e
    },
    sorties:{
        sortie_id:vente._id,
        quantite_s:venteId.quantite_s
    }, 
    stock_final:req.body.stock_final
})

try{
     newStock.save()

    res.status(201).json({ message: 'Le nouveau stock est bien ajouté à la BD !'})

}catch(err){
    res.status(400).send(`Error : ${err.message}`);
  } */
 
};