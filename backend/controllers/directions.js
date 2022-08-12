const Direction = require("../models/Direction")

exports.createDirection = async (req, res) => {
let newDirection = new Direction(req.body)
try{
    newDirection= await newDirection.save()
    res.send(newDirection)
}catch(error){
    res.status(400).send(`Error : ${error.message}`);

}
};
exports.getAllDirections= async (req, res) => {
  const directions = await  Direction.find();
if(directions.length===0)
return res.status(204).end()
res.send(directions)
   
  };
exports.getOneDirection= async (req, res, next)=>{
    Direction.findOne({ _id: req.params.id })
    .then((direction) => res.status(200).json(direction))
    .catch(err => {
        console.log(err);
        next();
    })
}
exports.deleteDirection = async (req, res) => {
  try {
 
    if (!req.params.id) res.send("missing id");
    else {
    
      const directionToDelete = await Direction.findById(req.params.id);
      console.log(directionToDelete)
      await directionToDelete.remove();
      res.send("direction deleted");

  }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }



}