const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const userSchema=mongoose.Schema({
    email:{type: String, required: true, unique: true},
    role: {type: String, required:true, enum:['magasinier_appro','magasinier_bati','chef_serv_achat','chef_serv_vente','directeur_direction','employe','admin']},
    password:{type: String, required: true}
});
userSchema.pre('save', async function save(next) {
    try {
     if (!this.isModified('password')) return next();
   
   
     const hash = await bcrypt.hash(this.password, 10);
     this.password = hash;
   
     return next();
    } catch (error) {
     return next(error);
    }
   });
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);