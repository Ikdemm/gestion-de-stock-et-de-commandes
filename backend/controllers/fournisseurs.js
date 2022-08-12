const Fournisseur = require('../models/Founisseur');
const _ = require('lodash')
exports.createFournisseur= async (req, res) =>{

    let fournisseur = new Fournisseur(req.body)
    try{
        fournisseur= await fournisseur.save()
        res.send(fournisseur)
    }catch(error){
        res.sendStatus(405).send(error.message)
    }
} 
exports.getAllFournisseurs = async (req, res) => {

 let fournisseurs = await Fournisseur.find()
res.send(fournisseurs)

}
exports.getFournisseur = async(req, res) => {
let fournisseur = await Fournisseur.findById(req.params.id).populate('nom_commercial')
if(!fournisseur)
return res.status(404).send('fournisseur not found')
res.send(fournisseur)
} 

exports.updateFournisseur = (req, res) => {
    const pId = req.params['id'];

    Fournisseur.findById(pId)
        .then(p => {
            if (!p) {
                const error = new Error('Could not find this fournisseur');
                error.statusCode = 404;
                throw error;
            }
        

            p = _.merge(p, req.body)

            return p.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Fournisseur updated successfully',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        })

} 
exports.deleteFournisseur = (req, res) => {

    const pId = req.params['id'];
    Fournisseur.findByIdAndRemove(pId)
        .then(p => {

            if (!p) {
                const error = new Error('Could not find this fournisseur');
                error.statusCode = 404;

                throw error;
            }
            res.status(200).json({
                message: 'Fournisseur successfully deleted',
                result: p
            })
        })
        .catch(err => {
            console.log(err);
        })
}

