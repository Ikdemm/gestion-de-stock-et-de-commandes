const {CommandeFournisseur} = require ("../models/Commande");
const Fournisseur = require("../models/Founisseur");

exports.createCmdFournisseur= async (req, res) =>{
/* let fournisseurId= req.body.fournisseur_id;
console.log(fournisseurId)
let fournisseur= await Fournisseur.findById(fournisseurId)
console.log(fournisseur)
if(!fournisseur) 
return res.status(404).send("Un fournisseur avec cet Id n'existe pas"); */
 
   let commande = new CommandeFournisseur(req.body)  
    //let commande = new CommandeFournisseur(req.body)
    try{
        commande= await commande.save()
        res.send(commande)
    }catch(error){
        res.sendStatus(405).send(error.message)
    }
} 
exports.getAllCommandesFournisseurs = async (req, res) => {

 let commandes = await CommandeFournisseur.find()
res.send(commandes)

}