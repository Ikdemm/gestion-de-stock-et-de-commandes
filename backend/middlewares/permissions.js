const error = new Error("You're not allowed to do this action");

exports.isMagasinier_appro = (req, res, next) => {
  if (req.user.role == "magasinier_appro") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isMagasinier_bati = (req, res, next) => {
  if (req.user.role == "magasinier_bati") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isChef_serv_achat = (req, res, next) => {
  if (req.user.role == "chef_serv_achat") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isChef_serv_vente = (req, res, next) => {
  if (req.user.role == "chef_serv_vente") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isDirecteur_direction = (req, res, next) => {
  if (req.user.role == "directeur_direction") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isEmploye = (req, res, next) => {
  if (req.user.role == "employe") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isAdmin = (req, res, next) => {
  if (req.user.role == "admin") {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedMagasinier_appro = (req, res, next) => {
  if (req.user.role == "magasinier_appro" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedMagasinier_bati = (req, res, next) => {
  if (req.user.role == "magasinier_bati" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedChef_serv_achat = (req, res, next) => {
  if (req.user.role == "chef_serv_achat" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedChef_serv_vente = (req, res, next) => {
  if (req.user.role == "chef_serv_vente" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedDirecteur_direction = (req, res, next) => {
  if (req.user.role == "directeur_direction" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedEmploye = (req, res, next) => {
  if (req.user.role == "employe" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
exports.isConcernedAdmin = (req, res, next) => {
  if (req.user.role == "admin" && req.user.id==user._id) {
    return next();
  } else error.statusCode = 405;
  throw error;
};
