import React, { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TableauSinistres = () => {
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth();
  // Données simulées pour les sinistres
  const [sinistres] = useState([
    {
      id: 1,
      reference: 'SNST-2023-001',
      client: 'Kouakou Yao',
      typeSinistre: 'Accident de la route',
      dateDeclaration: '2023-06-15',
      statut: 'En cours',
      montantEstime: 1500000
    },
    {
      id: 2,
      reference: 'SNST-2023-002',
      client: 'Traoré Awa',
      typeSinistre: 'Maladie grave',
      dateDeclaration: '2023-07-22',
      statut: 'Traité',
      montantEstime: 2500000
    },
    {
      id: 3,
      reference: 'SNST-2023-003',
      client: 'Konaté Mamadou',
      typeSinistre: 'Incendie',
      dateDeclaration: '2023-08-10',
      statut: 'En attente',
      montantEstime: 3000000
    },
    {
      id: 4,
      reference: 'SNST-2023-004',
      client: 'Diabaté Fatoumata',
      typeSinistre: 'Vol',
      dateDeclaration: '2023-09-05',
      statut: 'En cours',
      montantEstime: 800000
    },
    {
      id: 5,
      reference: 'SNST-2023-005',
      client: 'Sawadogo Thomas',
      typeSinistre: 'Décès',
      dateDeclaration: '2023-10-18',
      statut: 'Traité',
      montantEstime: 5000000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState('tous');
  const [currentPage, setCurrentPage] = useState(1);
  const sinistresPerPage = 5;

  // Filtrer les sinistres
  const filteredSinistres = sinistres.filter(sinistre => {
    const matchesSearch = sinistre.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.typeSinistre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = statutFilter === 'tous' || sinistre.statut.toLowerCase() === statutFilter.toLowerCase();
    return matchesSearch && matchesStatut;
  });

  // Pagination
  const indexOfLastSinistre = currentPage * sinistresPerPage;
  const indexOfFirstSinistre = indexOfLastSinistre - sinistresPerPage;
  const currentSinistres = filteredSinistres.slice(indexOfFirstSinistre, indexOfLastSinistre);
  const totalPages = Math.ceil(filteredSinistres.length / sinistresPerPage);

  const handleExport = (format) => {
    alert(`Exportation des sinistres au format ${format} démarrée...`);
    // Ici, vous implémenteriez la logique réelle d'exportation
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* En-tête du tableau avec recherche et filtres */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un sinistre..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={statutFilter}
            onChange={(e) => {
              setStatutFilter(e.target.value);
              setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
            }}
          >
            <option value="tous">Tous les statuts</option>
            <option value="en cours">En cours</option>
            <option value="traité">Traité</option>
            <option value="en attente">En attente</option>
          </select>

          <div className="relative group">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleExport('PDF')}
              >
                Exporter en PDF
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleExport('Excel')}
              >
                Exporter en Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Référence sinistre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type de sinistre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date déclaration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant estimé
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSinistres.length > 0 ? (
              currentSinistres.map((sinistre) => (
                <tr key={sinistre.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sinistre.reference}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{sinistre.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{sinistre.typeSinistre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(sinistre.dateDeclaration).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sinistre.statut.toLowerCase() === 'en cours' ? 'bg-yellow-100 text-yellow-800' :
                      sinistre.statut.toLowerCase() === 'traité' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sinistre.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{sinistre.montantEstime.toLocaleString()} FCFA</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucun sinistre trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">{indexOfFirstSinistre + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastSinistre, filteredSinistres.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredSinistres.length}</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Précédent
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? 'z-10 bg-red-50 border-red-500 text-red-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Suivant
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableauSinistres;