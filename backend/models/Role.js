const mongoose = require('mongoose');
const roleSchema= new mongoose.Schema({
    roleName: {type: String, required:true, enum:['magasinier_appro','magasinier_bati','chef_serv_achat','chef_serv_vente','directeur_direction','employe','admin']},

    id_users:[
        {type: mongoose.Schema.Types.ObjectId ,ref: 'User' }
    ]
  
})

module.exports= mongoose.model('Role',roleSchema )