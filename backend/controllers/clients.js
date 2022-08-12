const Client = require('../models/Client');
const _ = require('lodash')
exports.createClient= async (req, res) =>{

    let client = new Client(req.body)
    try{
        client= await client.save()
        res.status(201).json({ message: 'Le client est bien ajouté à la BD !'})
    }catch(error){
        res.status(400).send(`Error : ${error.message}`);
    }
} 
exports.getAllClients = async (req, res) => {

 let fournisseurs = await Client.find()
res.send(fournisseurs)

}
exports.getClient = async(req, res) => {
let client = await Client.findById(req.params.id)
if(!client)
return res.status(404).send('client not found')
res.send(client)
} 

exports.updateClient = (req, res) => {
    const pId = req.params['id'];

    Client.findById(pId)
        .then(p => {
            if (!p) {
                const error = new Error('Could not find this client');
                error.statusCode = 404;
                throw error;
            }
        

            p = _.merge(p, req.body)

            return p.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Client updated successfully',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
        })

} 
exports.deleteClient = (req, res) => {

    const pId = req.params['id'];
    Client.findByIdAndRemove(pId)
        .then(p => {

            if (!p) {
                const error = new Error('Could not find this client');
                error.statusCode = 404;

                throw error;
            }
            res.status(200).json({
                message: 'Client successfully deleted',
                result: p
            })
        })
        .catch(err => {
            console.log(err);
        })
}

