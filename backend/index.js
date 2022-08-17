//const dotenv = require("dotenv");
require('./db/connect')
const express = require('express');
//const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');
const staffRoutes = require('./routers/employes');
const directionRoutes = require('./routers/directions');
const demandesRoutes = require('./routers/demandes');
const FrsRoutes= require('./routers/fournisseurs');
const ClientsRoutes= require('./routers/clients');
const categoriesRoutes= require('./routers/categories');
const appelDoffresRoutes= require('./routers/appelDoffres');
const produitsRoutes= require('./routers/produits');
const FactAchatRoutes= require('./routers/FactureAchat');
const LigneAchatRoutes= require('./routers/LigneAchat');
const FactVenteRoutes= require('./routers/FactureVente');
const LigneVenteRoutes= require('./routers/LigneVente');
const AvoirtAchatRoutes= require('./routers/AvoirSurAchat');
const AvoirLigneAchatRoutes= require('./routers/LigneAvoirAchat');
const AvoirFactVenteRoutes= require('./routers/AvoirVente');
const AvoirLigneVenteRoutes= require('./routers/LigneAvoirVente');
//const cmdFrsRoutes= require('./routers/commandeFournisseurs');
const userRoutes=require('./routers/users');

var cors = require('cors');


const app = express();
//dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

app.use(morgan("dev"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/images/', express.static(path.join(__dirname, 'images/')));
app.use('/api/staff',staffRoutes);
app.use('/api/directions',directionRoutes);
app.use('/api/fournisseurs',FrsRoutes);
app.use('/api/clients',ClientsRoutes);
app.use('/api/demandes',demandesRoutes);
app.use('/api/appelDoffres',appelDoffresRoutes);
app.use('/api/categories',categoriesRoutes);
app.use('/api/produits',produitsRoutes);
//app.use('/api/commandes/achat',cmdFrsRoutes);
app.use('/api/factures/achat',FactAchatRoutes);
app.use('/api/achat/addToInvoice',LigneAchatRoutes);
app.use('/api/factures/vente',FactVenteRoutes);
app.use('/api/vente/addToInvoice',LigneVenteRoutes);

app.use('/api/avoirs/achat',AvoirtAchatRoutes);
app.use('/api/avoirSurachat/addToInvoice',AvoirLigneAchatRoutes);
app.use('/api/avoirs/vente',AvoirFactVenteRoutes);
app.use('/api/avoirSurvente/addToInvoice',AvoirLigneVenteRoutes);
app.use('/api/auth', userRoutes);

app.listen(port, ()=> console.log(`Server is listening on ${port}`));
