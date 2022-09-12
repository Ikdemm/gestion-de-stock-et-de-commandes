const Employe = require ("../models/Employe");
const Direction = require("../models/Direction");
const Joi = require('joi');

const fs = require('fs');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId

//creer un nouveau employé
exports.createEmploye = async (req, res) => {
  

  let directionId= req.body.direction_id;
  ObjectId.isValid(directionId);
  console.log("directionId",directionId)
  let direction =await Direction.findById(directionId);
  console.log("direction",direction)
  if(!direction)
  return  res.status(400).send('Direction Id not Found'); 

   var newEmploye = new Employe({
    nom: req.body.nom,
    prenom:req.body.prenom,
    imageUrl: req.file.filename,
    adresse:req.body.adresse,
    date_de_naissance:req.body.date_de_naissance,
    date_de_recrutement:req.body.date_de_recrutement,
    numCIN:req.body.numCIN,
    numTel:req.body.numTel,
    poste :req.body.poste,
    direction_id:direction._id,
  }) 

 try{

    const saved_employee= await newEmploye.save()
    direction.nb_employes+=1;
    direction.employes.push(saved_employee);
    await direction.save();
    res.status(201).json({ message: 'Le nouveau employé est bien ajouté !', result: saved_employee})
   
}catch(err){
  console.log("employee not submitted",err)

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
exports.updateImage=(req,res) => {
  const eId=req.params['id'];

  Employe.findById(eId)
      .then( employee => {
          if (! employee) {
              const error = new Error('Could not find this employee');
              error.statusCode = 404;
              throw error;
          }
      

           employee = _.merge( employee, req.file)

          return  employee.save();
      })
      .then(result => {
          res.status(200).json({
              message: 'Image employee updated successfully',
              result: result
          });
      })
      .catch(err => {
          console.log(err);
      })
}; 
exports.updateOneEmploye=(req,res,next) => {
  const cId= req.params['id'];
  Employe.findById(cId)
  .then(employe => {
    if (!employe) {
        const error = new Error('Could not find this employe');
        error.statusCode = 404;
        throw error;
    }
    employe = _.merge(employe, req.body)
    return employe.save();
}) 
.then(result => {
  res.status(200).json({
      message: 'Employee updated successfully',
      result: result
  });
})
.catch(err => {
  console.log(err);
})
  };
/* exports.updateOneEmploye=(req,res,next) => {
    const thingObject = req.file ?
    {
      ...JSON.parse(req.body),
      imageUrl: req.file.filename,

    } : { ...req.body };
    Employe.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Employé modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };
 */
//supprimer un employé
exports.deleteOneEmploye= async (req, res)  => {

      const employee= await Employe.findByIdAndRemove({ _id: req.params.id });
      if(!employee)
      return res.status(404).json({ message: 'Aucun employé est trouvé avec cet ID, veuillez vérifier le ID !'});
      const direction = await Direction.findById(employee.direction_id);
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


