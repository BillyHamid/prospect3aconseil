import React, { useState, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Mail,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Building,
  Phone,
  Mail as MailIcon
} from 'lucide-react';
import NotificationManager from './NotificationManager';
import dataService from '../services/dataService';

const SignedContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [newContract, setNewContract] = useState({
    contractNumber: '',
    clientName: '',
    clientContact: '',
    clientPhone: '',
    clientEmail: '',
    contractType: 'Assurance Auto',
    startDate: '',
    endDate: '',
    amount: '',
    notes: ''
  });

  // Charger les contrats au montage du composant
  useEffect(() => {
    const loadContracts = async () => {
      try {
        const loadedContracts = dataService.getContracts();
        setContracts(loadedContracts);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des contrats:', error);
        setLoading(false);
      }
    };

    loadContracts();
  }, []);

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch =
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientContact.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'expiring_soon' && contract.status === 'Bientôt expiré') ||
      (filterStatus === 'active' && contract.status === 'Actif') ||
      (filterStatus === 'expired' && contract.status === 'Expiré');

    return matchesSearch && matchesStatus;
  });

  const handleAddContract = (e) => {
    e.preventDefault();
    const contractData = {
      ...newContract,
      amount: parseFloat(newContract.amount)
    };

    const newContractAdded = dataService.addContract(contractData);
    setContracts(dataService.getContracts()); // Recharger la liste

    setNewContract({
      contractNumber: '',
      clientName: '',
      clientContact: '',
      clientPhone: '',
      clientEmail: '',
      contractType: 'Assurance Auto',
      startDate: '',
      endDate: '',
      amount: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteContract = (id) => {
    dataService.deleteContract(id);
    setContracts(dataService.getContracts()); // Recharger la liste
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'Bientôt expiré':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expiré':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiration = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpirationLabel = (days) => {
    if (days < 0) return 'Expiré';
    if (days <= 14) return 'Critique';
    if (days <= 30) return 'À bientôt';
    return 'En cours';
  };

  const getExpirationColor = (days) => {
    if (days < 0) return 'bg-red-100 text-red-800';
    if (days <= 14) return 'bg-orange-100 text-orange-800';
    if (days <= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">Contrats signés</h1>
          <p className="text-gray-600 mt-2">Gérez et suivez les contrats signés avec les dates d'échéance</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Nouveau contrat
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Contrats actifs</p>
              <p className="text-3xl font-bold text-deep-navy">
                {contracts.filter(c => c.status === 'Actif').length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-md">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Échéances (30j)</p>
              <p className="text-3xl font-bold text-deep-navy">
                {contracts.filter(c => getDaysUntilExpiration(c.endDate) <= 30 && getDaysUntilExpiration(c.endDate) >= 0).length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg shadow-md">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">CA annuel</p>
              <p className="text-3xl font-bold text-deep-navy">
                {contracts.reduce((sum, c) => sum + c.amount, 0).toLocaleString()} FCFA
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-md">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Clients actifs</p>
              <p className="text-3xl font-bold text-deep-navy">{new Set(contracts.map(c => c.clientName)).size}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg shadow-md">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un contrat, client ou contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <option value="all">Tous les contrats</option>
            <option value="active">Actifs</option>
            <option value="expiring_soon">Bientôt expirés</option>
            <option value="expired">Expirés</option>
          </select>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-deep-navy flex items-center">
            <FileText size={24} className="mr-2 text-navy-blue" />
            Liste des contrats ({filteredContracts.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contrat</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Échéance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => {
                const daysUntilExpiration = getDaysUntilExpiration(contract.endDate);
                const expirationLabel = getExpirationLabel(daysUntilExpiration);
                const expirationColor = getExpirationColor(daysUntilExpiration);
                
                return (
                  <tr key={contract.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-deep-navy">{contract.contractNumber}</p>
                        <p className="text-sm text-gray-600">{contract.startDate} → {contract.endDate}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-800">{contract.clientName}</p>
                        <p className="text-sm text-gray-600">{contract.clientContact}</p>
                        <p className="text-sm text-gray-500">{contract.clientPhone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {contract.contractType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-800">{contract.amount.toLocaleString()} FCFA</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-800">{contract.endDate}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${expirationColor}`}>
                            {expirationLabel}: {daysUntilExpiration} jours
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedContract(contract)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteContract(contract.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Bell size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications and Upcoming Expirations */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-deep-navy mb-6 flex items-center">
                <AlertTriangle size={24} className="mr-2 text-orange-600" />
                Contrats expirant bientôt
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contracts
                  .filter(contract => getDaysUntilExpiration(contract.endDate) <= 30 && getDaysUntilExpiration(contract.endDate) >= 0)
                  .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                  .map(contract => {
                    const daysUntilExpiration = getDaysUntilExpiration(contract.endDate);
                    return (
                      <div key={contract.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800">{contract.contractNumber}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExpirationColor(daysUntilExpiration)}`}>
                            {daysUntilExpiration}j
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{contract.clientName}</p>
                        <p className="text-sm text-gray-500 mb-2">{contract.contractType}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{contract.amount.toLocaleString()} FCFA</span>
                          <span className="text-xs text-gray-500">{contract.endDate}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                            <Mail size={12} className="inline mr-1" /> Notif
                          </button>
                          <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
                            <MessageSquare size={12} className="inline mr-1" /> SMS
                          </button>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
          <div>
            <NotificationManager />
          </div>
        </div>
      )}

      {/* Add Contract Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy">Ajouter un nouveau contrat</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddContract} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de contrat</label>
                  <input
                    type="text"
                    value={newContract.contractNumber}
                    onChange={(e) => setNewContract({...newContract, contractNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="CTR-YYYY-XXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
                  <select
                    value={newContract.contractType}
                    onChange={(e) => setNewContract({...newContract, contractType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="Assurance Auto">Assurance Auto</option>
                    <option value="Assurance Habitation">Assurance Habitation</option>
                    <option value="Assurance Santé">Assurance Santé</option>
                    <option value="Assurance Moto">Assurance Moto</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du client</label>
                  <input
                    type="text"
                    value={newContract.clientName}
                    onChange={(e) => setNewContract({...newContract, clientName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Nom de l'entreprise ou du client"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact principal</label>
                  <input
                    type="text"
                    value={newContract.clientContact}
                    onChange={(e) => setNewContract({...newContract, clientContact: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Nom du contact"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={newContract.clientPhone}
                    onChange={(e) => setNewContract({...newContract, clientPhone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="+226 XX XX XX XX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newContract.clientEmail}
                    onChange={(e) => setNewContract({...newContract, clientEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="email@entreprise.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                  <input
                    type="date"
                    value={newContract.startDate}
                    onChange={(e) => setNewContract({...newContract, startDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                  <input
                    type="date"
                    value={newContract.endDate}
                    onChange={(e) => setNewContract({...newContract, endDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant (FCFA)</label>
                  <input
                    type="number"
                    value={newContract.amount}
                    onChange={(e) => setNewContract({...newContract, amount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Montant du contrat"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newContract.notes}
                    onChange={(e) => setNewContract({...newContract, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows="3"
                    placeholder="Notes complémentaires sur le contrat..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200"
                >
                  Ajouter le contrat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy">Détails du contrat</h2>
              <button 
                onClick={() => setSelectedContract(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Informations du contrat</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Numéro:</span> <span className="font-medium">{selectedContract.contractNumber}</span></p>
                    <p><span className="text-gray-600">Type:</span> <span className="font-medium">{selectedContract.contractType}</span></p>
                    <p><span className="text-gray-600">Montant:</span> <span className="font-medium">{selectedContract.amount.toLocaleString()} FCFA</span></p>
                    <p><span className="text-gray-600">Statut:</span> <span className="font-medium">{selectedContract.status}</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Dates importantes</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Début:</span> <span className="font-medium">{selectedContract.startDate}</span></p>
                    <p><span className="text-gray-600">Fin:</span> <span className="font-medium">{selectedContract.endDate}</span></p>
                    <p><span className="text-gray-600">Prochain paiement:</span> <span className="font-medium">{selectedContract.nextPayment}</span></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Informations client</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Nom:</span> <span className="font-medium">{selectedContract.clientName}</span></p>
                  <p><span className="text-gray-600">Contact:</span> <span className="font-medium">{selectedContract.clientContact}</span></p>
                  <p><span className="text-gray-600">Téléphone:</span> <span className="font-medium">{selectedContract.clientPhone}</span></p>
                  <p><span className="text-gray-600">Email:</span> <span className="font-medium">{selectedContract.clientEmail}</span></p>
                </div>
              </div>
              
              {selectedContract.notes && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
                  <p className="text-gray-700">{selectedContract.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setSelectedContract(null)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                  Envoyer une notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignedContracts;