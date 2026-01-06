import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useProspectContext } from '../context/ProspectContext';

const ProspectTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { prospects, deleteProspect } = useProspectContext();

  const statusConfig = {
    chaud: { label: 'Chaud', color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
    'a_relancer': { label: 'À relancer', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    'contrat_signe': { label: 'Contrat signé', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    perdu: { label: 'Perdu', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
  };

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || prospect.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) {
      deleteProspect(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-deep-navy">Suivi des Prospects</h1>
              <p className="text-gray-600 mt-1">Gérez et suivez vos prospects en temps réel</p>
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
                placeholder="Rechercher un prospect..."
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
              <option value="chaud">Chaud</option>
              <option value="a_relancer">À relancer</option>
              <option value="contrat_signe">Contrat signé</option>
              <option value="perdu">Perdu</option>
            </select>
          </div>
        </div>

        {/* Prospects Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Prospect</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Dernier contact</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Prochain RDV</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProspects.map((prospect) => (
                <tr key={prospect.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-deep-navy">{prospect.name}</div>
                    <div className="text-sm text-gray-600">{prospect.notes}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone size={14} className="mr-2 text-gray-500" />
                        {prospect.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-900 mt-1">
                        <Mail size={14} className="mr-2 text-gray-500" />
                        {prospect.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {prospect.insuranceType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${statusConfig[prospect.status].dot}`}></span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[prospect.status].color}`}>
                        {statusConfig[prospect.status].label}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {formatDate(prospect.lastContact)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {prospect.nextAppointment ? formatDate(prospect.nextAppointment) : '-'}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {prospect.budget}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                        onClick={() => handleDelete(prospect.id)}
                      >
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
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filteredProspects.length}</span> sur{' '}
            <span className="font-medium">{filteredProspects.length}</span> résultats
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
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total prospects</p>
              <p className="text-2xl font-bold text-deep-navy">{prospects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Prospects chauds</p>
              <p className="text-2xl font-bold text-deep-navy">
                {prospects.filter(p => p.status === 'chaud').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">À relancer</p>
              <p className="text-2xl font-bold text-deep-navy">
                {prospects.filter(p => p.status === 'a_relancer').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contrats signés</p>
              <p className="text-2xl font-bold text-deep-navy">
                {prospects.filter(p => p.status === 'contrat_signe').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectTracking;