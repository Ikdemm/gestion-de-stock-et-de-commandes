import axios from 'axios';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function LineChart() {
  const [tabVenteFacts, settabVenteFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/factures/vente`).then((response) => {
      settabVenteFacts(response.data);
    });
  }, []); 
  const [tabAchatFacts, settabAchatFacts] = useState([]);

  useEffect(() => {
    axios.get(`/api/factures/achat`).then((response) => {
      settabAchatFacts(response.data);
    });
  }, []); 
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Variation des recettes et des dépenses en 2022',
      },
    },
  };
  
  const labels = ['Septembre', 'Octobre', 'Novembre','Decembre'];
  
   const data = {
    labels,
    datasets: [
      {
        label: 'Recettes',
        data: tabVenteFacts.map((v) =>v.net_a_payer),
        borderColor:         ' rgba(9, 255, 0)',

        backgroundColor: ' rgb(9, 255, 0, 0.2)',
      },
      {
        label: 'Dépenses',
        data: tabAchatFacts.map((v) =>v.net_a_payer),
        borderColor: ' #4125D9',
        backgroundColor:   'rgb(65, 37, 217, 0.2)',
      },
    ],
  };
  
  return (
    <div> <Line options={options} data={data} className="card " /></div>
  )
}
