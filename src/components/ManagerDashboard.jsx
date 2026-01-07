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
  FileText,
  MessageSquare,
  Bell,
  Settings,
  Eye,
  EyeOff,
  TrendingDown,
  UserPlus,
  UserMinus,
  Briefcase,
  Building,
  BarChart2,
  Users2,
  User,
  DollarSign as DollarSignIcon,
  TrendingUp as TrendingUpIcon,
  Activity as ActivityIcon,
  BarChart as BarChartIcon,
  Target as TargetIcon
} from 'lucide-react';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [expandedCard, setExpandedCard] = useState(null);
  const [notifications, setNotifications] = useState(5);
  const [showPassword, setShowPassword] = useState(false);

  // Données simulées pour le dashboard manager
  const stats = [
    {
      title: "Chiffre d'affaires total",
      value: "45,200,000 FCFA",
      change: "+18%",
      icon: DollarSignIcon,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      iconColor: "text-white",
      progress: 85,
      trend: "up",
      comparison: "vs. mois dernier"
    },
    {
      title: "Contrats signés",
      value: "128",
      change: "+22%",
      icon: Award,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      iconColor: "text-white",
      progress: 75,
      trend: "up",
      comparison: "vs. mois dernier"
    },
    {
      title: "Taux de conversion global",
      value: "72%",
      change: "+7%",
      icon: TrendingUpIcon,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      iconColor: "text-white",
      progress: 90,
      trend: "up",
      comparison: "vs. mois dernier"
    },
    {
      title: "Agents actifs",
      value: "24",
      change: "+4",
      icon: Users2,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      iconColor: "text-white",
      progress: 80,
      trend: "up",
      comparison: "sur 30 prévus"
    }
  ];

  const teamStats = [
    {
      title: "Performance moyenne",
      value: "85%",
      change: "+5%",
      icon: BarChart2,
      color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      iconColor: "text-white",
      progress: 85,
      trend: "up"
    },
    {
      title: "Objectifs atteints",
      value: "78%",
      change: "+12%",
      icon: TargetIcon,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      iconColor: "text-white",
      progress: 78,
      trend: "up"
    },
    {
      title: "Équipe optimale",
      value: "24/30",
      change: "+2",
      icon: Users,
      color: "bg-gradient-to-r from-violet-500 to-violet-600",
      iconColor: "text-white",
      progress: 80,
      trend: "up"
    },
    {
      title: "Satisfaction client",
      value: "92%",
      change: "+3%",
      icon: ActivityIcon,
      color: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600",
      iconColor: "text-white",
      progress: 92,
      trend: "up"
    }
  ];

  const agents = [
    {
      id: 1,
      name: "Yacouba Diallo",
      performance: 92,
      targets: 1250000,
      achieved: 1180000,
      status: "Excellente",
      color: "bg-green-500",
      leads: 24,
      contracts: 8,
      avgValue: "150,000 FCFA"
    },
    {
      id: 2,
      name: "Aminata Traoré",
      performance: 87,
      targets: 1100000,
      achieved: 980000,
      status: "Bonne",
      color: "bg-blue-500",
      leads: 18,
      contracts: 6,
      avgValue: "163,000 FCFA"
    },
    {
      id: 3,
      name: "Salif Kouyaté",
      performance: 78,
      targets: 950000,
      achieved: 740000,
      status: "Satisfaisante",
      color: "bg-yellow-500",
      leads: 15,
      contracts: 4,
      avgValue: "185,000 FCFA"
    },
    {
      id: 4,
      name: "Fatoumata Sissoko",
      performance: 95,
      targets: 1300000,
      achieved: 1240000,
      status: "Excellente",
      color: "bg-green-500",
      leads: 28,
      contracts: 10,
      avgValue: "124,000 FCFA"
    },
    {
      id: 5,
      name: "Issa Ouattara",
      performance: 65,
      targets: 800000,
      achieved: 520000,
      status: "À améliorer",
      color: "bg-red-500",
      leads: 12,
      contracts: 2,
      avgValue: "260,000 FCFA"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Yacouba Diallo",
      action: "a signé un contrat",
      target: "Assurance Auto Premium",
      time: "il y a 15 min",
      type: "contract",
      value: "280,000 FCFA",
      icon: FileText,
      color: "text-green-500"
    },
    {
      id: 2,
      user: "Aminata Traoré",
      action: "a ajouté un nouveau prospect",
      target: "Société Alpha",
      time: "il y a 45 min",
      type: "prospect",
      value: "120,000 FCFA",
      icon: UserPlus,
      color: "text-blue-500"
    },
    {
      id: 3,
      user: "Salif Kouyaté",
      action: "a atteint son objectif mensuel",
      target: "10 contrats",
      time: "il y a 2h",
      type: "achievement",
      value: "10/10",
      icon: Award,
      color: "text-purple-500"
    },
    {
      id: 4,
      user: "Fatoumata Sissoko",
      action: "a programmé un RDV",
      target: "Client Beta",
      time: "hier",
      type: "appointment",
      value: "150,000 FCFA",
      icon: Calendar,
      color: "text-indigo-500"
    },
    {
      id: 5,
      user: "Issa Ouattara",
      action: "a mis à jour un dossier",
      target: "Dossier #A456",
      time: "hier",
      type: "update",
      value: "95,000 FCFA",
      icon: MessageSquare,
      color: "text-orange-500"
    }
  ];

  const performanceChart = [
    { month: 'Jan', value: 65 },
    { month: 'Fév', value: 70 },
    { month: 'Mar', value: 75 },
    { month: 'Avr', value: 80 },
    { month: 'Mai', value: 78 },
    { month: 'Jui', value: 82 },
    { month: 'Juil', value: 85 },
    { month: 'Aoû', value: 88 },
    { month: 'Sep', value: 87 },
    { month: 'Oct', value: 90 },
    { month: 'Nov', value: 92 },
    { month: 'Déc', value: 95 }
  ];

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">Tableau de bord Manager</h1>
          <p className="text-gray-600 mt-2">Bonjour, Manager ! Suivez les performances de votre équipe en temps réel</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md">
            <Filter size={20} className="mr-2" />
            Période
          </button>
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
            <Plus size={20} className="mr-2" />
            Nouveau
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teamStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium">{stat.title}</p>
                  <p className="text-xl font-bold text-deep-navy">{stat.value}</p>
                </div>
                <div className="flex items-center">
                  <Icon size={20} className={stat.color.replace('bg-', 'text-').replace('-500', '').replace('-600', '')} />
                  <span className={`text-xs ml-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
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
                      <TrendingDown size={16} className="text-red-600 mr-1" />
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Team Performance and Agents */}
        <div className="xl:col-span-2 space-y-6">
          {/* Team Performance Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                <BarChart2 size={24} className="mr-2 text-navy-blue" />
                Performance de l'équipe
              </h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Semaine</option>
                <option value="month">Mois</option>
                <option value="quarter">Trimestre</option>
                <option value="year">Année</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {performanceChart.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-navy-blue to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${data.value}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agents Performance */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                <Users2 size={24} className="mr-2 text-navy-blue" />
                Performance des agents
              </h2>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mr-4 shadow-md">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-deep-navy">{agent.name}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Target size={14} className="mr-1" />
                          Objectif: {agent.targets.toLocaleString()} FCFA
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <DollarSign size={14} className="mr-1" />
                          Réalisé: {agent.achieved.toLocaleString()} FCFA
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-2">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          agent.status === 'Excellente'
                            ? 'bg-green-100 text-green-800 shadow-sm'
                            : agent.status === 'Bonne'
                            ? 'bg-blue-100 text-blue-800 shadow-sm'
                            : agent.status === 'Satisfaisante'
                            ? 'bg-yellow-100 text-yellow-800 shadow-sm'
                            : 'bg-red-100 text-red-800 shadow-sm'
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`${agent.color} h-2 rounded-full`}
                          style={{ width: `${agent.performance}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{agent.performance}%</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">{agent.leads}</p>
                      <p className="text-xs text-gray-500">Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">{agent.contracts}</p>
                      <p className="text-xs text-gray-500">Contrats</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">{agent.avgValue}</p>
                      <p className="text-xs text-gray-500">Moyenne</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activities and Notifications */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-deep-navy flex items-center">
                <ActivityIcon size={24} className="mr-2 text-navy-blue" />
                Activités récentes
              </h2>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
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
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <p className="text-xs font-medium text-green-600">{activity.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notifications and Quick Actions */}
          <div className="space-y-6">
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
                    <p className="text-sm font-medium text-yellow-800">Agents en sous-performance</p>
                    <p className="text-xs text-yellow-600">2 agents à suivre de près</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Objectifs atteints</p>
                    <p className="text-xs text-green-600">5 agents ont dépassé leurs objectifs</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <UserPlus size={16} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Nouveaux prospects</p>
                    <p className="text-xs text-blue-600">18 nouveaux prospects cette semaine</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-deep-navy mb-6 flex items-center">
                <Settings size={24} className="mr-2 text-navy-blue" />
                Actions rapides
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
                  <UserPlus size={20} className="mr-2" />
                  Ajouter agent
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
                  <Target size={20} className="mr-2" />
                  Définir objectif
                </button>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
                  <FileText size={20} className="mr-2" />
                  Générer rapport
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
                  <BarChart2 size={20} className="mr-2" />
                  Analyse détaillée
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;