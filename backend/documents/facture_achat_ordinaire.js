module.exports = ({ fournisseur, selectedFacture, tabLignesFiltred , tabProduits }) => {
  const moment = require("moment");
  require("moment/locale/fr");

  var lignesCommande = tabLignesFiltred.map(
    (a) =>{
      let articleId=a.article.article_id;
      let produitCommande=tabProduits.find((p)=>p._id===articleId);
      return(
         `<tr class="item">
         <td>${produitCommande.title}</td>
        <td>${produitCommande.price_a}</td>
        <td>${a.quantite_a}</td>
        <td>${a.total_HT}</td>
        <td>${a.TVA}</td>
        <td>${a.total_TTC}</td>
      </tr>`
      )
    }
    
  );



  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica';
            color: #555;
            }
            .margin-top {
            margin-top: 50px;
            }
            .justify-center {
            text-align: center;
            }
            .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            }
            .invoice-box table td {
            padding: 5px;
            vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
            text-align: right;
            }
            .invoice-box table tr.top table td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
            }
            .invoice-box table tr.information table td {
            padding-bottom: 40px;
            }
            .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            }
            .invoice-box table tr.details td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
            border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
            }
            @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            }

            .contact {
               color:  #555;
               font-size: 11pt;
               text-align: right;

             }
             .company_info {
               display: flex;
               justify-content: space-between;
               align-content: stretch;
               flex-wrap: nowrap;
            }
            .invoice_number{
               display: flex;
               text-align: right;
                font-weight: bolder;
                line-height: 1.5;
                font-size: x-large;
                align-content: flex-end;
            }
            .justify-right {
               text-align: right;
               }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                <td colspan="6">

                      <table  >
                         <tr class="company_info">
                                 <td class="title">
                                       <img  src="https://linstant-m.tn/uploads/8ae972df570d9bef38af72f9b5726853b3b2d66f.png"  style="width:100%; max-width:156px;"> 
                                 </td>
                       
                                 <td class="contact">
                                  
                                       <b> Adresse :</b> Tunis, Tunisie <br/>
                                       <b> Email :</b> contact@konnect.network <br/>
                                       <b> N° de téléphone :</b>  +216 24 563 609 <br/>
                                       <b> Site-web :</b> https://konnect.network/ <br/>
                                 
                                 </td>
                         </tr>
                     
                
                      </table>
                      </td>
                </tr>
                <tr class="information">
                <td colspan="6">

                      <table>
                        <tr class="invoice_number">
                  
                                 <td >
                                       N° de facture: ${selectedFacture.numFacture} <br>
                                       Date facture: ${moment(selectedFacture.dateFacture) .locale("fr") .format("LL")}  
                                 </td>
                        </tr>
                        <tr>
                                 <td>
                                       <b>   Nom du fournisseur:</b> ${fournisseur.nom_commercial} <br/>
                                       <b>   Adresse :</b> ${fournisseur.adresse} <br/>
                                       <b>   Email :</b> ${fournisseur.email} <br/>
                                       <b>   N° de téléphone :</b>  ${fournisseur.numero_de_tel}<br/>
                                 
                                 </td>
                         </tr>
                      </table>
                      </td>
                </tr>

                <tr class="heading">
                   <td>Articles commandés</td>
                   <td>PU</td>
                   <td>Q</td>
                   <td>Total HT</td>
                   <td>TVA</td>
                   <td>Total TTC</td>
                </tr>
       ${lignesCommande}
             </table>
        
            <div class="justify-right">
            <br/>
                  <b> Frais de livraison:</b> ${selectedFacture.frais_de_livraison} TND  <br/>
                  <b> Net commercial HT:</b> ${selectedFacture.net_commercial_HT} TND  <br/>
                  <b> Total TVA:</b> ${selectedFacture.TVA_deductibles} TND <br/>
                  <h3 > Net à payer: ${selectedFacture.net_a_payer} TND </h3>
             </div>
             <table>
             <tr>
                  <td>
                  <b>   Mode de paiemenet:</b> ${selectedFacture.mode_de_paiement} <br/>
                  <b>   Date d'échaénace :</b>   ${moment(selectedFacture.dateEcheance)
                     .locale("fr")
                     .format("LL")}  
               
                  
                  </td> 
             </table>

            </div>
       </body>
    </html>
    `;
};
