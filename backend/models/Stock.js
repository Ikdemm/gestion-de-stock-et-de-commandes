const mongoose=require('mongoose');
const stockSchema=mongoose.Schema({
    produit:{
        produit_id:{type: mongoose.Schema.Types.ObjectId , ref:'Produit'},
        title:{type:String, required: false}},
    stock_initial:{type:Number, required:true, default:0},
    entrees:[
        {
            achat_id:{type: mongoose.Schema.Types.ObjectId,ref:'LigneCdeAchat'},
            quantite_e:{type: Number, required: false}
        }
        ],
    sorties:
    [{
        sortie_id:{type: mongoose.Schema.Types.ObjectId,ref:'LigneCdeVente'},
        quantite_s:{type: Number, required: false}
    }],
    stock_final:{type:Number, required:false,
    default:function(){
        var existant=this.stock_initial
        var sommeEntrees=0
            if(this.entrees.length>0){
                for(i=0 ; i<entrees.quantite.length;i++)
                 sommeEntrees+=this.entrees.quantite_e
            }
            var sommeSorties=0
            if(this.entrees.length>0){
                for(i=0 ; i<sorties.quantite.length;i++)
                 sommeSorties+=this.sorties.quantite_s
            }
var stock=existant+sommeEntrees-sommeSorties

        console.log(existant)
        console.log(sommeEntrees)
        console.log(sommeSorties)
        console.log(stock)
        return stock
    }},
    stock_min:{type:Number, required:true, default:20},
    stock_max:{type:Number, required:true, default:100}
    
});

module.exports=mongoose.model('Stock',stockSchema);