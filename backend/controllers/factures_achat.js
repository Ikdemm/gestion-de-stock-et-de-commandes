const Facture = require('../models/FactureFournisseur');

exports.createInvoice= async(req,res)=>{
    let newFacture = new Facture(req.body)
    try{
        newFacture= await newFacture.save()
        res.send(newFacture)
    }catch(error){
        res.status(400).send(`Error : ${error.message}`);
    
    }

}