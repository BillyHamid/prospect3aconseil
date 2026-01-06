import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Calendar,
  CreditCard,
  UserCheck,
  Target,
  Plus,
  MoreHorizontal,
  Award,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  Activity,
  MapPin,
  Phone,
  Mail,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MinusCircle,
  PieChart,
  LineChart,
  Users as UsersIcon,
  FileText,
  MessageSquare,
  Bell,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [expandedCard, setExpandedCard] = useState(null);
  const [notifications, setNotifications] = useState(3);

  // Mock data for dashboard with Burkinabé names
  const stats = [
    {
      title: "Objectif du mois",
      value: "7,500,000 FCFA",
      change: "+12%",
      icon: Target,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      iconColor: "text-white",
      progress: 75,
      trend: "up",
      comparison: "vs. mois dernier"
    },
    {
      title: "Contrats signés",
      value: "24",
      change: "+8%",
      icon: Award,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      iconColor: "text-white",
      progress: 60,
      trend: "up",
      comparison: "vs. mois dernier"
    },
    {
      title: "Taux de conversion",
      value: "68%",
      change: "+5%",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      iconColor: "text-white",
      progress: 80,
      trend: "up",
      comparison: "vs. mois dernier"
    },
    {
      title: "Rendez-vous aujourd'hui",
      value: "6",
      change: "En cours",
      icon: Clock,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      iconColor: "text-white",
      progress: 40,
      trend: "neutral",
      comparison: "sur 8 prévus"
    }
  ];

  const appointments = [
    {
      id: 1,
      name: "Yacouba Diallo",
      time: "09:30",
      type: "Auto",
      status: "Confirmé",
      phone: "+226 70 12 34 56",
      address: "Ouagadougou, Secteur 5",
      priority: "high",
      nextAction: "Signature du contrat"
    },
    {
      id: 2,
      name: "Aminata Traoré",
      time: "11:00",
      type: "Habitation",
      status: "Confirmé",
      phone: "+226 78 98 76 54",
      address: "Bobo-Dioulasso, Zone 3",
      priority: "medium",
      nextAction: "Présentation des options"
    },
    {
      id: 3,
      name: "Salif Kouyaté",
      time: "14:15",
      type: "Santé",
      status: "À confirmer",
      phone: "+226 76 11 22 33",
      address: "Koudougou, Quartier Sud",
      priority: "low",
      nextAction: "Appel de confirmation"
    },
    {
      id: 4,
      name: "Fatoumata Sissoko",
      time: "16:00",
      type: "Moto",
      status: "Confirmé",
      phone: "+226 76 55 44 33",
      address: "Ouahigouya, Centre",
      priority: "high",
      nextAction: "Finalisation du devis"
    }
  ];

  const recentProspects = [
    {
      id: 1,
      name: "Yacouba Diallo",
      type: "Auto",
      status: "À relancer",
      date: "Aujourd'hui",
      progress: 40,
      value: "120,000 FCFA",
      risk: "medium"
    },
    {
      id: 2,
      name: "Aminata Traoré",
      type: "Habitation",
      status: "Chaud",
      date: "Hier",
      progress: 80,
      value: "95,000 FCFA",
      risk: "low"
    },
    {
      id: 3,
      name: "Salif Kouyaté",
      type: "Santé",
      status: "Contrat signé",
      date: "2 janv.",
      progress: 100,
      value: "85,000 FCFA",
      risk: "none"
    },
    {
      id: 4,
      name: "Issa Ouattara",
      type: "Auto",
      status: "Chaud",
      date: "Hier",
      progress: 70,
      value: "110,000 FCFA",
      risk: "low"
    }
  ];

  const activityFeed = [
    {
      id: 1,
      user: "Vous",
      action: "a créé un nouveau prospect",
      target: "Yacouba Diallo",
      time: "il y a 10 min",
      type: "prospect",
      icon: UsersIcon,
      color: "text-blue-500"
    },
    {
      id: 2,
      user: "Vous",
      action: "a signé un contrat",
      target: "Aminata Traoré",
      time: "il y a 45 min",
      type: "contract",
      icon: FileText,
      color: "text-green-500"
    },
    {
      id: 3,
      user: "Vous",
      action: "a programmé un RDV",
      target: "Salif Kouyaté",
      time: "il y a 2h",
      type: "appointment",
      icon: Calendar,
      color: "text-indigo-500"
    },
    {
      id: 4,
      user: "Vous",
      action: "a mis à jour le statut",
      target: "Fatoumata Sissoko",
      time: "hier",
      type: "update",
      icon: MessageSquare,
      color: "text-purple-500"
    }
  ];

  const quickStats = [
    { label: "Prospects chauds", value: "12", change: "+3", icon: Users, color: "text-orange-500" },
    { label: "En attente de signature", value: "8", change: "-2", icon: FileText, color: "text-blue-500" },
    { label: "RDV cette semaine", value: "15", change: "+5", icon: Calendar, color: "text-green-500" },
    { label: "Alertes", value: "3", change: "0", icon: AlertTriangle, color: "text-yellow-500" }
  ];

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">Bonjour, Salif ! Suivez votre activité en temps réel</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-navy-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus size={20} className="mr-2" />
            Nouveau prospect
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md">
            <Filter size={20} className="mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-deep-navy">{stat.value}</p>
                </div>
                <div className="flex items-center">
                  <Icon size={20} className={stat.color} />
                  <span className={`text-xs ml-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-deep-navy mt-2">{stat.value}</p>
                  <p className="text-sm font-medium mt-2 flex items-center">
                    {stat.trend === 'up' ? (
                      <TrendingUp size={16} className="text-green-600 mr-1" />
                    ) : stat.trend === 'down' ? (
                      <TrendingUp size={16} className="text-red-600 mr-1 rotate-180" />
                    ) : (
                      <MinusCircle size={16} className="text-gray-500 mr-1" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">{stat.comparison}</span>
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg shadow-md`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Column - Appointments and Prospects */}
        <div className="xl:col-span-2 space-y-6">
          {/* Appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                <Calendar size={24} className="mr-2 text-navy-blue" />
                Rendez-vous du jour
              </h2>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl ${
                        appointment.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        appointment.priority === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                        'bg-gradient-to-r from-blue-500 to-blue-600'
                      } flex items-center justify-center mr-4 shadow-md`}>
                        <Calendar size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">{appointment.name}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock size={14} className="mr-1" />
                          {appointment.time} • {appointment.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin size={14} className="mr-1" />
                          {appointment.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        appointment.status === 'Confirmé'
                          ? 'bg-green-100 text-green-800 shadow-sm'
                          : 'bg-yellow-100 text-yellow-800 shadow-sm'
                      }`}>
                        {appointment.status}
                      </span>
                      <div className="flex gap-2 mt-2">
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <Phone size={16} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <Mail size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600">Action suivante: {appointment.nextAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Prospects */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                <Users size={24} className="mr-2 text-navy-blue" />
                Prospects récents
              </h2>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {recentProspects.map((prospect) => (
                <div key={prospect.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl ${
                        prospect.risk === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        prospect.risk === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        prospect.risk === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        'bg-gradient-to-r from-gray-500 to-gray-600'
                      } flex items-center justify-center mr-4 shadow-md`}>
                        <Users size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">{prospect.name}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Target size={14} className="mr-1" />
                          {prospect.type} • {prospect.date}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Valeur: {prospect.value}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        prospect.status === 'Contrat signé'
                          ? 'bg-green-100 text-green-800 shadow-sm'
                          : prospect.status === 'Chaud'
                          ? 'bg-orange-100 text-orange-800 shadow-sm'
                          : 'bg-blue-100 text-blue-800 shadow-sm'
                      }`}>
                        {prospect.status}
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          style={{ width: `${prospect.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activity Feed, Performance, and Notifications */}
        <div className="xl:col-span-2 space-y-6">
          {/* Activity Feed */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                <Activity size={24} className="mr-2 text-navy-blue" />
                Activité récente
              </h2>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {activityFeed.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-deep-navy">{activity.user}</span> {activity.action} <span className="font-medium text-navy-blue">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance and Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                  <BarChart3 size={24} className="mr-2 text-navy-blue" />
                  Performance
                </h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="week">Semaine</option>
                  <option value="month">Mois</option>
                  <option value="quarter">Trimestre</option>
                </select>
              </div>
              <div className="h-48 flex items-center justify-center">
                <div className="w-full">
                  <div className="flex items-end justify-between h-32 gap-2">
                    {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'].map((label, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-gradient-to-t from-navy-blue to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                          style={{ height: `${Math.random() * 60 + 40}%` }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                  <Bell size={24} className="mr-2 text-navy-blue" />
                  Notifications
                </h2>
                <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {notifications}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle size={16} className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">RDV à confirmer</p>
                    <p className="text-xs text-yellow-600">3 rendez-vous en attente</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Contrats signés</p>
                    <p className="text-xs text-green-600">2 nouveaux contrats</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <UsersIcon size={16} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Prospects chauds</p>
                    <p className="text-xs text-blue-600">5 prospects prêts à signer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;