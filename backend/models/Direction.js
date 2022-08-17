const mongoose = require('mongoose');
const Employee =require('../models/Employe');
const {ObjectId} = mongoose.Schema;

const directionSchema= new mongoose.Schema({
    name: {type:String, required : true},
    nb_employes:{type:Number, default:0},
    employes:[
        {type:ObjectId ,ref: 'Employe' }]
})
directionSchema.pre('remove', async function(next){
    const direction= this
    await Employee.deleteMany({direction_id:direction._id})
    next()
 })
module.exports = mongoose.model('Direction', directionSchema)
