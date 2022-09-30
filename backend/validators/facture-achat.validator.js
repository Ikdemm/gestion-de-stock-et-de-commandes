const { body } = require("express-validator");

const factureAchatValidator = [
  body("numFacture")
    .exists({ checkFalsy: true })
    .withMessage("numFacture is required")
    .isString()
    .withMessage("numFacture should be string"),
  body("dateFacture")
    .exists()
    .withMessage("dateFacture is required")
    .isDate()
    .withMessage("dateFacture should be valid date"),
  body("dateEcheance")
    .optional()
    .isDate()
    .withMessage("dateEcheance should be valid date"),
  body("fournisseur_id")
    .exists()
    .withMessage("fournisseur_id is required")
    .isString()
    .withMessage("fournisseur_id should be string"),
  body("frais_de_livraison")
    .optional()
    .isFloat()
    .withMessage("frais_de_livraison should be number"),
  body("net_a_payer")
    .optional()
    .isFloat()
    .withMessage("net_a_payer should be number"),
 body("mode_de_paiement")
    .exists()
    .withMessage("mode_de_paiement is required")
    .isString()
    .withMessage("mode_de_paiement should be string")
    .isIn(["Comptant", "à crédit", "autres"])
    .withMessage("mode_de_paiement value is invalid"),
 body("etat")
    .optional()
    .isString()
    .withMessage("etat should be string")
    .isIn(["payee",  "non_payee"])
    .withMessage("etat value is invalid"),

];

module.exports = factureAchatValidator;
