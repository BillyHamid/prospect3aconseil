import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  UserMinus, 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Target, 
  TrendingUp, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Yacouba Diallo',
      email: 'yacouba@3aconseils.com',
      role: 'Agent Commercial',
      status: 'Actif',
      performance: 92,
      targets: 1250000,
      achieved: 1180000,
      leads: 24,
      contracts: 8,
      avgValue: '150,000 FCFA',
      lastActivity: '2026-01-07',
      color: 'bg-green-500'
    },
    {
      id: 2,
      name: 'Aminata Traoré',
      email: 'aminata@3aconseils.com',
      role: 'Agent Commercial',
      status: 'Actif',
      performance: 87,
      targets: 1100000,
      achieved: 980000,
      leads: 18,
      contracts: 6,
      avgValue: '163,000 FCFA',
      lastActivity: '2026-01-07',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Salif Kouyaté',
      email: 'salif@3aconseils.com',
      role: 'Agent Commercial',
      status: 'Actif',
      performance: 78,
      targets: 950000,
      achieved: 740000,
      leads: 15,
      contracts: 4,
      avgValue: '185,000 FCFA',
      lastActivity: '2026-01-06',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      name: 'Fatoumata Sissoko',
      email: 'fatoumata@3aconseils.com',
      role: 'Agent Commercial',
      status: 'Actif',
      performance: 95,
      targets: 1300000,
      achieved: 1240000,
      leads: 28,
      contracts: 10,
      avgValue: '124,000 FCFA',
      lastActivity: '2026-01-07',
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Issa Ouattara',
      email: 'issa@3aconseils.com',
      role: 'Agent Commercial',
      status: 'En probation',
      performance: 65,
      targets: 800000,
      achieved: 520000,
      leads: 12,
      contracts: 2,
      avgValue: '260,000 FCFA',
      lastActivity: '2026-01-05',
      color: 'bg-red-500'
    }
  ]);

  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    role: 'Agent Commercial',
    status: 'Actif'
  });

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = (e) => {
    e.preventDefault();
    const agent = {
      id: agents.length + 1,
      ...newAgent,
      performance: 0,
      targets: 0,
      achieved: 0,
      leads: 0,
      contracts: 0,
      avgValue: '0 FCFA',
      lastActivity: new Date().toISOString().split('T')[0],
      color: 'bg-gray-500'
    };
    setAgents([...agents, agent]);
    setNewAgent({ name: '', email: '', role: 'Agent Commercial', status: 'Actif' });
    setShowAddForm(false);
  };

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'En probation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">Gestion des équipes</h1>
          <p className="text-gray-600 mt-2">Gérez vos agents et suivez leurs performances</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <UserPlus size={20} className="mr-2" />
            Ajouter agent
          </button>
        </div>
      </div>

      {/* Add Agent Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-deep-navy mb-4">Ajouter un nouvel agent</h2>
          <form onSubmit={handleAddAgent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
              <input
                type="text"
                value={newAgent.name}
                onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Nom de l'agent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newAgent.email}
                onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="email@entreprise.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
              <select
                value={newAgent.role}
                onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="Agent Commercial">Agent Commercial</option>
                <option value="Agent Senior">Agent Senior</option>
                <option value="Chef d'équipe">Chef d'équipe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={newAgent.status}
                onChange={(e) => setNewAgent({...newAgent, status: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="Actif">Actif</option>
                <option value="En probation">En probation</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200"
              >
                Ajouter l'agent
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un agent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>
          <button className="bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md">
            <Filter size={20} className="mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Agents List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-deep-navy flex items-center">
            <Users size={24} className="mr-2 text-navy-blue" />
            Liste des agents ({filteredAgents.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Agent</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rôle</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Objectif</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-sm">{agent.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">{agent.name}</p>
                        <p className="text-sm text-gray-600">{agent.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{agent.role}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className={`${agent.color} h-2 rounded-full`}
                          style={{ width: `${agent.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{agent.performance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-700">{agent.achieved.toLocaleString()} FCFA</p>
                      <p className="text-gray-500">sur {agent.targets.toLocaleString()} FCFA</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Agents actifs</p>
              <p className="text-3xl font-bold text-deep-navy">{agents.filter(a => a.status === 'Actif').length}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-md">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Performance moyenne</p>
              <p className="text-3xl font-bold text-deep-navy">
                {Math.round(agents.reduce((acc, agent) => acc + agent.performance, 0) / agents.length)}%
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-md">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Contrats signés</p>
              <p className="text-3xl font-bold text-deep-navy">
                {agents.reduce((acc, agent) => acc + agent.contracts, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg shadow-md">
              <CheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">CA généré</p>
              <p className="text-3xl font-bold text-deep-navy">
                {agents.reduce((acc, agent) => acc + agent.achieved, 0).toLocaleString()} FCFA
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg shadow-md">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;