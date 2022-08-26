const mongoose= require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const employeSchema = mongoose.Schema({

    nom:{type:String, required: true},
    prenom:{type:String, required: true},
    imageUrl:{type:String, required: false},
    numCIN:{type: Number, required:true, unique:true},
    adresse:{type:String, required: true},
    date_de_naissance:{type:Date, required: true},
    date_de_recrutement:{type:Date, required: true},
    poste :{type:String, required: true},
    direction:{
        direction_id:  { type: mongoose.Schema.Types.ObjectId ,ref: 'Direction'}
      
    } ,
    demandes:[
        { type: mongoose.Schema.Types.ObjectId ,ref: 'DemandeEmploye'}
    ],
    user_id:  { type: mongoose.Schema.Types.ObjectId ,ref: 'User'}
})
/* let employe_validator=Joi.object({
    nom:Joi.string().min(3).max(20).required(),
    prenom:Joi.string().min(3).max(20).required(),
    imageUrl:Joi.any(),
    numCIN:Joi.number().integer().min(8).max(8).required(),
    adresse:Joi.string().required(),
    date_de_naissance:Joi.date().required(),
    date_de_recrutement:Joi.date().required(),
    poste:Joi.string().required(),
    direction:{ 
        direction_id: Joi.objectId(),
       
    }
}) 
 */
module.exports=mongoose.model('Employe', employeSchema);
//module.exports.employe_validator=employe_validator;
