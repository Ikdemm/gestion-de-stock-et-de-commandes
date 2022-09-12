const mongoose= require('mongoose');

const employeSchema = mongoose.Schema({

    nom:{type:String, required: true},
    prenom:{type:String, required: true},
    imageUrl:{type:String, required: false},
    numCIN:{type: Number, required:true, unique:true},
    numTel:{type: Number, required:true, unique:true},
    adresse:{type:String, required: true},
    date_de_naissance:{type:Date, required: true},
    date_de_recrutement:{type:Date, required: true},
    poste :{type:String, required: true},
    direction_id:  { type: mongoose.Schema.Types.ObjectId ,ref: 'Direction'},

})

module.exports=mongoose.model('Employe', employeSchema);
