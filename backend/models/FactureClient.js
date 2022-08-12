const mongoose = require('mongoose');
const factureVenteSchema= new mongoose.Schema({
    numFacture: {type: String, required:true},
    dateFacture:{ type: Date, default: Date.now() },
    client_id: {type: mongoose.Schema.Types.ObjectId ,ref: 'Client' },
    articles:[ 
        {
            ligne_id:{type: mongoose.Schema.Types.ObjectId ,ref: 'LigneCdeVente', required:false },
            total:{type: Number, required:false}
        }
],
   // net_a_payer:{type:Number, required: false, default:0 },
      net_a_payer:{type:Number, required: false,default: function(){
            this.net_a_payer=0
            if (this.articles.length>0){
                for  (i=0; i<articles.total.length;i++)
                return (this.net_a_payer+=this.articles.total)
            }else return  this.net_a_payer=0
       
    }},  
    dateEcheance:{ type: Date , required: false},
    mode_de_paiement: {type: String, required:false, enum : ['Comptant','à crédit','autres'], default:'Comptant'},

})
module.exports=mongoose.model('FactureVente',factureVenteSchema );