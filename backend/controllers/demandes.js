const Demande = require("../models/Demande");
const Employe = require("../models/Employe");
const _ = require("lodash");


//creer une nouvelle demande
exports.createDemande = async (req, res) => {


  let employeeId = req.body.employe_id;
  let employee = await Employe.findById(employeeId);
  if (!employee) return res.status(400).send("Employee Id not Found");

  var newDemande = new Demande({
    dateDemande:req.body.dateDemande,
    objet:req.body.objet,
    detailsDemande:req.body.detailsDemande,
    etat:req.body.etat,
    employe_id:employee._id
   
  });

  try {
    const saved_demande = await newDemande.save();
    employee.demandes.push(saved_demande);
    await employee.save();
    res
      .status(201)
      .json({ message: "La nouvelle demande est bien créée !", saved_demande });
  } catch (err) {
    res.status(400).send(`Error : ${err.message}`);
  }
};
//récupérer une demande
exports.getOneDemande = (req, res, next) => {
  Demande.findOne({ _id: req.params.id })
    .then((demande) => res.status(200).json(demande))
    .catch((err) => {
      console.log(err);
      next();
    });
};
//modifier une demande
exports.updateOneDemande = async (req, res) => {
  var old_employee_id;
  var employee;
  let demande = await Demande.findById(req.params.id);
  if (!demande) return res.status(404).send(`Demand with this id is missing`);

  if (req.body.employe_id) {
    old_employee_id = demande.employe_id;
    employee = await Employe.findById(req.body.employe_id);
    if (!employee)
      return res.status(400).send(`Employee not found for the given ID`);
  }

  demande = _.merge(demande, req.body);
  try {
    const saved_demande = await demande.save();
    employee.demandes.push(saved_demande);
    await employee.save();
    //remove the demand from the other employee demand's array
    employee = await Employe.findById(old_employee_id);
    var index = employee.demandes.indexOf(demande=>demande.id==_id)
    employee.demandes.splice(index)
    await employee.save();
    res.status(200).send(saved_demande);
  } catch (err) {
    res.status(400).send(`Error : ${err.message}`);
  }
};
//supprimer une demande
exports.deleteOneDemande = async (req, res) => {
  const demande = await Demande.findByIdAndRemove({ _id: req.params.id });
  if (!demande)
    return res.status(404).json({
      message:
        "Aucune demande n'est trouvée avec cet ID, veuillez vérifier le ID !",
    });
  const employee = await Employe.findById(demande.employe_id);
  var index = employee.demandes.indexOf(demande=>demande.id==_id)
  employee.demandes.splice(index)
  await employee.save();
  res.send(demande);
};

//récupérer toutes les demandes
exports.getAllDemandes = (req, res, next) => {
  Demande.find()
    .then((demandes) => res.status(200).json(demandes))
    .catch((err) => {
      console.log(err);
      next();
    });
};
//récupérer toutes les demandes non traitées

exports.getDemandesNonTraitees=async(req, res) => {
  let demandes = await Demande.find({etat:"non_traitee"})
  if(demandes.length==0)
      return res.status(204).json({ message: 'Liste des demandes non traitées est vide !'})
      res.send(demandes)
    };
//récupérer toutes les demandes par employé
exports.getDemandesParEmploye=async(req, res) => {
  let demandes = await Demande.find().populate('employe_id')
  if(demandes.length==0)
      return res.status(204).json({ message: 'Liste des demandes non traitées est vide !'})
      res.send(demandes)
    };
exports.marquerCommeTraitee=async(req, res) => {
  let demandes = await Demande.find().populate('employe_id')
  if(demandes.length==0)
      return res.status(204).json({ message: 'Liste des demandes non traitées est vide !'})
      res.send(demandes)
    };