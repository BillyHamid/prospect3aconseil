import React, { useState } from 'react';
import { Shield, Users, FileText, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AssurancePartenaires = () => {

  // Données simulées pour les compagnies d'assurance
  const compagnies = [
    {
      id: 1,
      nom: 'SANLAM',
      logo: '/placeholder-logo.png',
      clientsAffilies: 1250,
      contratsActifs: 850,
      sinistresEnCours: 45
    },
    {
      id: 2,
      nom: 'SONAR',
      logo: '/placeholder-logo.png',
      clientsAffilies: 980,
      contratsActifs: 620,
      sinistresEnCours: 32
    },
    {
      id: 3,
      nom: 'CORIS Assurance',
      logo: '/placeholder-logo.png',
      clientsAffilies: 1420,
      contratsActifs: 980,
      sinistresEnCours: 58
    },
    {
      id: 4,
      nom: 'UAB Assurance',
      logo: '/placeholder-logo.png',
      clientsAffilies: 750,
      contratsActifs: 540,
      sinistresEnCours: 28
    },
    {
      id: 5,
      nom: 'RAYNAL Assurance',
      logo: '/placeholder-logo.png',
      clientsAffilies: 1100,
      contratsActifs: 760,
      sinistresEnCours: 41
    },
    {
      id: 6,
      nom: 'SUNU Assurances',
      logo: '/placeholder-logo.png',
      clientsAffilies: 1350,
      contratsActifs: 920,
      sinistresEnCours: 52
    },
    {
      id: 7,
      nom: 'Jackson Assurance',
      logo: '/placeholder-logo.png',
      clientsAffilies: 890,
      contratsActifs: 630,
      sinistresEnCours: 35
    },
    {
      id: 8,
      nom: 'Yelen Assurance',
      logo: '/placeholder-logo.png',
      clientsAffilies: 1020,
      contratsActifs: 710,
      sinistresEnCours: 39
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth();

  // Filtrer les compagnies selon le terme de recherche
  const filteredCompagnies = compagnies.filter(compagnie =>
    compagnie.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer le clic sur une carte d'assurance
  const handleCardClick = (id) => {
    // Mettre à jour l'URL pour refléter la navigation
    window.location.hash = `#/?page=assurances&id=${id}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assurances Partenaires</h1>
        <p className="text-gray-600">Gestion des compagnies d'assurance partenaires du Burkina Faso</p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une compagnie d'assurance..."
            className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grille des compagnies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompagnies.map((compagnie) => (
          <div
            key={compagnie.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-1"
            onClick={() => handleCardClick(compagnie.id)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">{compagnie.nom}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{compagnie.clientsAffilies} clients affiliés</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FileText className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{compagnie.contratsActifs} contrats actifs</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{compagnie.sinistresEnCours} sinistres en cours</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500 border-t border-gray-100">
              Cliquez pour voir les détails
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssurancePartenaires;