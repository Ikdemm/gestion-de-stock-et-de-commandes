const mongoose=require('mongoose')

const demandeSchema = new Schema({
    dateDemande:{type:Date,required: true, default: Date.now()},
    objet:{type:String, required: true},
    detailsDemande:{type:String, required: true}
})
const demandeEmployeSchema= new Schema({
    champs:[demandeSchema],
    id_employe:{type:mongoose.Schema.Types.ObjectId, ref:'Employe'}
})
const demandeAppelDoffreSchema= new Schema({
    champs:[demandeSchema],
    id_employe:{type:mongoose.Schema.Types.ObjectId, ref:'Employe'}
})