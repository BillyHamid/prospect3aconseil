import React, { useState } from 'react';
import { Users, FileText, AlertTriangle, Download, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TableauClients from './TableauClients';
import TableauContrats from './TableauContrats';
import TableauSinistres from './TableauSinistres';

const AssuranceDetail = ({ id }) => {
  // Si l'ID est passé en tant que props, l'utiliser, sinon le récupérer depuis l'URL
  const assuranceId = id || new URLSearchParams(window.location.hash.split('?')[1]).get('id');

  // Simuler les données de la compagnie d'assurance
  const compagnie = {
    id: parseInt(assuranceId),
    nom: assuranceId === '1' ? 'SANLAM' :
         assuranceId === '2' ? 'SONAR' :
         assuranceId === '3' ? 'CORIS Assurance' :
         assuranceId === '4' ? 'UAB Assurance' :
         assuranceId === '5' ? 'RAYNAL Assurance' :
         assuranceId === '6' ? 'SUNU Assurances' :
         assuranceId === '7' ? 'Jackson Assurance' : 'Yelen Assurance'
  };

  const [ongletActif, setOngletActif] = useState('clients');
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{compagnie.nom}</h1>
        <p className="text-gray-600">Détails de la compagnie d'assurance</p>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setOngletActif('clients')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              ongletActif === 'clients'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Clients affiliés
            </div>
          </button>

          <button
            onClick={() => setOngletActif('contrats')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              ongletActif === 'contrats'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Contrats
            </div>
          </button>

          <button
            onClick={() => setOngletActif('sinistres')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              ongletActif === 'sinistres'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Sinistres
            </div>
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div>
        {ongletActif === 'clients' && <TableauClients />}
        {ongletActif === 'contrats' && <TableauContrats />}
        {ongletActif === 'sinistres' && <TableauSinistres />}
      </div>
    </div>
  );
};

export default AssuranceDetail;