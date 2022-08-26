const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const bcryptjs =require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema=mongoose.Schema({
    email:{type: String, required: true, unique: true},
    role: {type: String, required:true, enum:['magasinier_appro','magasinier_bati','chef_serv_achat','chef_serv_vente','directeur_direction','employe','admin']},
    password:{type: String, required: true},
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
});
//hashing
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= bcryptjs.hashSync(this.password,10)
    }
    next()
})
//generate token
userSchema.methods.generateToken= async function(){
    try{
        let generatedToken = jwt.sign({_id:this._id},  process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: generatedToken});
        await this.save();
        return generatedToken;
    }catch (error){
        console.log(error)
    }
}
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User',userSchema);