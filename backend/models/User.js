const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const {ObjectId} = mongoose.Schema;

const userSchema=mongoose.Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    role: {type: String, required:true, enum:['magasinier_appro','magasinier_bati','chef_serv_achat','chef_serv_vente','directeur_direction','employe','admin']},
    employe_id:{
        type: ObjectId,
        ref: "Employe",
        
      },
} ,{timestamps : true});
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);