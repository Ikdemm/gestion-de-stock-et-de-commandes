const Produit = require("../models/Produit");
const Categorie = require("../models/Categorie");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
//const produit_validator = require("../models/Produit");
const _ = require("lodash");
//const Stock = require("../models/Stock");

//creer un nouveau produit
exports.createProduit = async (req, res) => {
  /*  let res_validation = produit_validator.validate(req.body);
  if (res_validation.error)
    return res.status(400).send(res_validation.error.details[0].message); */

  let categorieId = req.body.categorie_id;
  let categorie = await Categorie.findById(categorieId);
  if (!categorie) return res.status(400).send("Categorie Id not Found");

  var newProduit = new Produit({
    title: req.body.title,
    description: req.body.description,
    price_a: req.body.price_a,
    price_v: req.body.price_v,
    stock_initial: req.body.stock_initial,
    quantite_entree: req.body.quantite_entree,
    quantite_sortie: req.body.quantite_sortie,
    image: req.body.image,
    stock_final: req.body.stock_final,
    stock_min: req.body.stock_min,
    stock_max: req.body.stock_max,
    taxe_sur_la_valeur_ajoutee:req.body.taxe_sur_la_valeur_ajoutee,
    categorie: {
      categorie_id: categorie._id,
    },
  });

  try {
    const saved_produit = await newProduit.save();
    categorie.nb_produits += 1;
    categorie.produits.push(saved_produit);
    await categorie.save();
    res
      .status(201)
      .json({ message: "Le nouveau produit est bien ajouté !", saved_produit });
  } catch (err) {
    res.status(400).send(`Error : ${err.message}`);
  }
};
//récupérer un employé
exports.getOneProduit = (req, res, next) => {
  Produit.findOne({ _id: req.params.id })
    .then((produit) => res.status(200).json(produit))
    .catch((err) => {
      console.log(err);
      next();
    });
};
//modifier un employé
exports.updateOneProduit = async (req, res) => {
 
  let produit = await Produit.findById(req.params.id);
  if (!produit) return res.status(404).send(`Product with this id is missing`);

  if (req.body.categorie_id) {

    let old_category_id = produit.categorie.categorie_id;
    console.log("old_category_id",old_category_id)

    let old_category=await Categorie.findById(old_category_id);
    console.log("old_category",old_category)
    old_category.nb_produits -= 1;
    let index=old_category.produits.indexOf((p)=>p.id==produit._id);
    old_category.produits.splice(index)
    await old_category.save()
    console.log("old_category_id",old_category_id)
    let newCategory = await Categorie.findById(req.body.categorie_id);
    newCategory.nb_produits += 1;
    newCategory.produits.push(produit)
    produit.categorie.categorie_id=newCategory;
    await newCategory.save()

    console.log("category",newCategory)
    if (!newCategory)
      return res.status(400).send(`Category not found for the given ID`);
  }

  produit = _.merge(produit, req.body);
  try {

    await produit.save();

    res.status(200).send(produit);
  } catch (err) {
    res.status(400).send(`Error : ${err.message}`);
  }
};
//supprimer un produit
exports.deleteOneProduit = async (req, res) => {
  const produit = await Produit.findByIdAndRemove({ _id: req.params.id });
  if (!produit)
    return res.status(404).json({
      message:
        "Aucun produit est trouvé avec cet ID, veuillez vérifier le ID !",
    });
  const category = await Categorie.findById(produit.categorie.categorie_id);
  category.nb_produits -= 1;
  var index = category.produits.indexOf((emp) => emp.id == _id);
  category.produits.splice(index);
  await category.save();
  res.send(produit);
};

//récupérer tous les employés
exports.getAllProduits = (req, res, next) => {
  Produit.find()
    .then((produits) => res.status(200).json(produits))
    .catch((err) => {
      console.log(err);
      next();
    });
};
