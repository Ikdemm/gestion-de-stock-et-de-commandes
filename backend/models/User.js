const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
    email:{type: String, required: true, unique: true},
    //role_id:{type: mongoose.Schema.Types.ObjectId , ref:'Role'},
    roleName: {type: String, required:true, enum:['magasinier_appro','magasinier_bati','chef_serv_achat','chef_serv_vente','directeur_direction','employe','admin']},
    password:{type: String, required: true}
});
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);