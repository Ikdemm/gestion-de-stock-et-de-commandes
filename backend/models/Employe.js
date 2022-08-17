const mongoose= require('mongoose');
const Demande =require('../models/Demande');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {ObjectId} = mongoose.Schema;

const employeSchema = mongoose.Schema({
    user_id:{type: ObjectId ,ref: 'User' },
    nom:{type:String, required: true},
    prenom:{type:String, required: true},
    imageUrl:{type:String, required: false},
    numCIN:{type: Number, required:true, length:8},
    adresse:{type:String, required: true},
    date_de_naissance:{type:Date, required: true},
    date_de_recrutement:{type:Date, required: true},
    poste :{type:String, required: true},
    direction:{
        direction_id:  {type: ObjectId ,ref: 'Direction' },
        name: {type:String, required : false}
    },
    demandes:[
       { demande_id:  {type: ObjectId ,ref: 'DemandeEmploye' }
   } ]
})
let employe_validator=Joi.object({
    nom:Joi.string().min(3).max(20).required(),
    prenom:Joi.string().min(3).max(20).required(),
    imageUrl:Joi.any(),
    adresse:Joi.string().required(),
    date_de_naissance:Joi.date().required(),
    date_de_recrutement:Joi.date().required(),
    poste:Joi.string().required(),
    active:Joi.boolean().required(),
    direction:{ 
        direction_id: Joi.objectId(),
        name:Joi.string()
    }
})
employeSchema.pre('remove', async function(next){
    const employe= this
    await Demande.deleteMany({employe_id:employe._id})
    next()
 })
module.exports=mongoose.model('Employe', employeSchema);
module.exports.employe_validator=employe_validator;
