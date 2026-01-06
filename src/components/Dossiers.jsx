import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  FileText,
  Calendar,
  User,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dossiers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dossiers] = useState([
    {
      id: 1,
      client: 'Yacouba Diallo',
      type: 'Auto',
      dateSouscription: '2026-01-05',
      statut: 'actif',
      montant: '60,000 FCFA',
      agent: 'Salif Kouyaté',
      echeance: '2026-02-05',
      notes: 'Contrat complet avec assistance 0km'
    },
    {
      id: 2,
      client: 'Aminata Traoré',
      type: 'Habitation',
      dateSouscription: '2025-12-20',
      statut: 'en_attente',
      montant: '42,500 FCFA',
      agent: 'Mariam Kaboré',
      echeance: '2026-01-20',
      notes: 'En attente de documents complémentaires'
    },
    {
      id: 3,
      client: 'Issa Ouattara',
      type: 'Santé',
      dateSouscription: '2026-01-02',
      statut: 'resilie',
      montant: '47,500 FCFA',
      agent: 'Fatoumata Sissoko',
      echeance: '2026-02-02',
      notes: 'Résiliation anticipée'
    },
    {
      id: 4,
      client: 'Mariam Kaboré',
      type: 'Moto',
      dateSouscription: '2025-11-15',
      statut: 'actif',
      montant: '37,500 FCFA',
      agent: 'Yacouba Diallo',
      echeance: '2026-01-15',
      notes: 'Contrat standard'
    },
    {
      id: 5,
      client: 'Salif Kouyaté',
      type: 'Auto',
      dateSouscription: '2026-01-01',
      statut: 'en_cours',
      montant: '55,000 FCFA',
      agent: 'Aminata Traoré',
      echeance: '2026-02-01',
      notes: 'En cours de traitement'
    },
    {
      id: 6,
      client: 'Fatoumata Sissoko',
      type: 'Habitation',
      dateSouscription: '2025-12-10',
      statut: 'actif',
      montant: '45,000 FCFA',
      agent: 'Issa Ouattara',
      echeance: '2026-01-10',
      notes: 'Contrat renouvelé'
    }
  ]);

  const statusConfig = {
    actif: { label: 'Actif', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    en_cours: { label: 'En cours', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    en_attente: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
    resilie: { label: 'Résilié', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
  };

  const filteredDossiers = dossiers.filter(dossier => {
    const matchesSearch = dossier.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dossier.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || dossier.statut === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const totalActifs = dossiers.filter(d => d.statut === 'actif').length;
  const totalMontant = dossiers
    .filter(d => d.statut === 'actif')
    .reduce((sum, dossier) => sum + parseInt(dossier.montant.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-deep-navy">Gestion des Dossiers</h1>
              <p className="text-gray-600 mt-1">Suivez et gérez les dossiers clients</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter size={18} className="mr-2" />
                Filtres
              </button>
              <button className="flex items-center px-4 py-2 bg-navy-blue text-white rounded-lg hover:bg-blue-900 transition-colors">
                <Download size={18} className="mr-2" />
                Exporter
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un dossier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="en_cours">En cours</option>
              <option value="en_attente">En attente</option>
              <option value="resilie">Résilié</option>
            </select>
          </div>
        </div>

        {/* Dossiers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date souscription</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Échéance</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDossiers.map((dossier) => (
                <tr key={dossier.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-navy-blue bg-opacity-10 flex items-center justify-center mr-3">
                        <User size={18} className="text-navy-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-deep-navy">{dossier.client}</div>
                        <div className="text-sm text-gray-600">{dossier.notes}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {dossier.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {formatDate(dossier.dateSouscription)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${statusConfig[dossier.statut].dot}`}></span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[dossier.statut].color}`}>
                        {statusConfig[dossier.statut].label}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                    {dossier.montant}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {dossier.agent}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {formatDate(dossier.echeance)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filteredDossiers.length}</span> sur{' '}
            <span className="font-medium">{filteredDossiers.length}</span> dossiers
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 bg-navy-blue text-white text-sm font-medium hover:bg-blue-900">
              1
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total dossiers</p>
              <p className="text-2xl font-bold text-deep-navy">{dossiers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Dossiers actifs</p>
              <p className="text-2xl font-bold text-deep-navy">
                {dossiers.filter(d => d.statut === 'actif').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
              <DollarSign size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Montant total actif</p>
              <p className="text-2xl font-bold text-deep-navy">
                {totalMontant.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Échéances ce mois</p>
              <p className="text-2xl font-bold text-deep-navy">
                {dossiers.filter(d => {
                  const echeance = new Date(d.echeance);
                  const now = new Date();
                  return echeance.getMonth() === now.getMonth() && 
                         echeance.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dossiers;