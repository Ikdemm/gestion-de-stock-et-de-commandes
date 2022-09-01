const AppelDoffre = require("../models/AppelDoffre");

exports.createAppelDoffre = async (req, res) => {
  let newAppelDoffre = new AppelDoffre(req.body);
  try {
    newAppelDoffre = await newAppelDoffre.save();
    res.send(newAppelDoffre);
  } catch (error) {
    res.status(400).send(`Error : ${error.message}`);
  }
};
exports.getAllAppelDoffres = async (req, res) => {
  const appelDoffres = await AppelDoffre.find();
  if (appelDoffres.length === 0) return res.status(204).end();
  res.send(appelDoffres);
};
exports.getOneAppelDoffre = async (req, res) => {
  let apo = await AppelDoffre.findById(req.params.id)
  if(!apo)
  return res.status(404).send('AppelDoffre not found')
  res.send(apo)

};
exports.deleteAppelDoffre = async (req, res) => {
  try {
    if (!req.params.id) res.send("missing id");
    else {
      const appelDoffreToDelete = await AppelDoffre.findById(req.params.id);
      console.log(appelDoffreToDelete);
      await appelDoffreToDelete.remove();
      res.send("appelDoffre deleted");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateApo = (req, res) => {
  const apoId = req.params["id"];
  AppelDoffre.findById(apoId)
    .then((apo) => {
      if (!apo) {
        const error = new Error("Could not find this APO");
        error.statusCode = 404;
        throw error;
      }
      apo = _.merge(apo, req.body);
      return apo.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Category updated successfully",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
