const Employe = require ("../models/Employe");
const Direction = require("../models/Direction");
const User=require("../models/User")
const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
//const employe_validator = require("../models/Employe");
//const id_not_valid_fun = require("../models/Employe");
const fs = require('fs');
const _ = require('lodash');


//creer un nouveau employé
exports.createEmploye = async (req, res) => {
  
/*   let res_validation= employe_validator.validate(req.body);
  if(res_validation.error)
  return res.status(400).send(res_validation.error.details[0].message)  */
  let directionId= req.body.direction;
  console.log("directionId",directionId)
  let direction =await Direction.findById(directionId);
  console.log("direction",direction)
  if(!direction)
  return  res.status(400).send('Direction Id not Found'); 
  let userId= req.body.user_id;
  console.log("user_id",user_id)
  let user =await user.findById(user);
  console.log("userId",userId)
  if(!user)
  return  res.status(400).send('User Id not Found'); 
   var newEmploye = new Employe({
    nom: req.body.nom,
    prenom:req.body.prenom,
    //imageUrl: `${req.protocol}://${req.get('host')}/images/employes/${req.file.filename}`,
    imageUrl: req.file.filename,
    adresse:req.body.adresse,
    date_de_naissance:req.body.date_de_naissance,
    date_de_recrutement:req.body.date_de_recrutement,
    numCIN:req.body.numCIN,
    poste :req.body.poste,
    direction: {
      direction_id:directionId
    } ,
    user_id :user._id
  }) 

 try{

    const saved_employee= await newEmploye.save()
    direction.nb_employes+=1;
    direction.employes.push(saved_employee);
    await direction.save();
    res.status(201).json({ message: 'Le nouveau employé est bien ajouté !', result: saved_employee})
   
}catch(err){
  console.log("employee not submitted",err)
  //res.status(400).send(`Error : ${err.message}`);
}
} 
 
;
//récupérer un employé
exports.getOneEmploye = (req, res, next) => {
  Employe.findOne({ _id: req.params.id })
    .then((employe) => res.status(200).json(employe))
    .catch(err => {
        console.log(err);
        next();
    })
};
//modifier un employé
exports.updateOneEmploye=(req,res,next)=>{
    emp=req.file?
    {
        nom: req.body.nom,
        prenom:req.body.prenom,
        imageUrl: req.file.filename,
        adresse:req.body.adresse,
        date_de_naissance:req.body.date_de_naissance,
        date_de_recrutement:req.body.date_de_recrutement,
        poste :req.body.poste,
        active:req.body.active,
        numCIN:req.body.numCIN,
        direction: {
          direction_id:req.body.direction.direction._id ,
      
        }
       
    } : { ...req.body };
    
Employe.updateOne({_id: req.params.id}, {...emp, _id:req.params.id})

.then(() => res.status(200).json({ message: 'Employé modifié !'}))
.catch(err => {
    console.log(err);
    next();
})
};
//supprimer un employé
exports.deleteOneEmploye= async (req, res)  => {

      const employee= await Employe.findByIdAndRemove({ _id: req.params.id });
      if(!employee)
      return res.status(404).json({ message: 'Aucun employé est trouvé avec cet ID, veuillez vérifier le ID !'});
      const direction = await Direction.findById(employee.direction.direction_id);
      direction.nb_employes-=1;
      var index= direction.employes.indexOf(emp=> emp.id== _id)
      direction.employes.splice(index)
      await direction.save();
      res.send(employee) 

 
};


//récupérer tous les employés
exports.getAllEmployes=(req, res, next) => {
    Employe.find()
      .then(employes => res.status(200).json(employes))
      .catch(err => {
        console.log(err);
        next();
    })
  };


//récupérer les employés actifs
exports.getActiveEmployes=async(req, res) => {
let employees = await Employe.find({active:true})
if(employees.length==0)
    return res.status(204).json({ message: 'Liste des employés actifs est vide !'})
    res.send(employees)
  };