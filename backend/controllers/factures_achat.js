const Facture = require("../models/FactureFournisseur");
const _ = require("lodash");
exports.createInvoice = async (req, res) => {
  let newFacture = new Facture(req.body);
  try {
    newFacture = await newFacture.save();
    res.send(newFacture);
  } catch (error) {
    res.status(400).send(`Error : ${error.message}`);
  }
};
exports.updateInvoice = async (req, res) => {
  const FactureId=req.params.id;

  Facture.findById(FactureId)
  .then(f => {
      if (!f) {
          const error = new Error('Could not find this invoice');
          error.statusCode = 404;
          throw error;
      }
    
      f = _.merge(f, req.body)
      f.net_a_payer=f.calculNetaPayer()

      return f.save();
  })
  .then(result => {
      res.status(200).json({
          message: 'Invoice updated successfully',
          result: result
      });
  })
  .catch(err => {
      console.log(err);
  })

  
};

exports.getAllInvoices = (req, res, next) => {
  Facture.find()
    .then((factures) => res.status(200).json(factures))
    .catch((err) => {
      console.log(err);
      next();
    });
};
exports.getInvoiceById = (req, res, next) => {
  Facture.findOne({ _id: req.params.id })
    .then((facture) => res.status(200).json(facture))
    .catch((err) => {
      console.log(err);
      next();
    });
};
//not allowed => creation de faction d'avoir
/* exports.deleteInvoice = async (req, res) => {
  try {
    if (!req.params.id) res.send("missing id");
    else {
      const invoiceToDelete = await Facture.findById(req.params.id);

      await invoiceToDelete.remove();

      res.send("Invoice and all lines attached are deleted successfully");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */
