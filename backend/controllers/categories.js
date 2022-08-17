var Categorie = require('../models/Categorie');
const _ = require('lodash');

exports.createCategorie =  (req, res, next) => {
let newC= _.pick(req.body,['name','nb_produits','produits']);
const newCategory = new Categorie(newC);
newCategory.save()
.then(result => {
  res.status(201).json({
      message: 'New Category created successfully',
      id: result['_id'].toString()
  })
})
.catch(err => {
  console.log(err);
  next();
})
};
exports.getAllCategories= async (req, res) => {
  try {
    const result = await Categorie.find();
    res.status(200).json(result);
}
catch (err) {
    console.log(err);
}
  };
exports.getOneCategorie= async (req, res)=>{
  const cId = req.params.id;
  Categorie.findById(cId)
      .then(categorie => {
          if (!categorie) {
              const error = new Error('Could not find this category');
              error.statusCode = 404;
              throw error;
          }
          res.status(200).json(categorie)
      })
      .catch(err => {
          console.log(err);
      })
}
exports.updateCategory= (req,res)=>{
  const cId= req.params['id'];
  Categorie.findById(cId)
  .then(categorie => {
    if (!categorie) {
        const error = new Error('Could not find this category');
        error.statusCode = 404;
        throw error;
    }
    categorie = _.merge(categorie, req.body)
    return categorie.save();
}) 
.then(result => {
  res.status(200).json({
      message: 'Category updated successfully',
      result: result
  });
})
.catch(err => {
  console.log(err);
})
}
exports.deleteCategory= async (req, res) => {
  try {
    if (!req.params.id) res.send("missing id");
    else {
     const categoryToDelete = await Categorie.findById(req.params.id);
      await categoryToDelete.remove();
      res.send("Category and all products deleted");
  }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}