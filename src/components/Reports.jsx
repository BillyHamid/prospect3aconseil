import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Filter, 
  Search,
  Eye,
  Printer,
  Mail,
  MoreHorizontal
} from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [dateRange, setDateRange] = useState({
    start: '2026-01-01',
    end: '2026-01-31'
  });

  const reports = [
    {
      id: 1,
      title: 'Rapport mensuel des performances',
      description: 'Analyse détaillée des performances de l\'équipe pour le mois de janvier',
      date: '2026-01-31',
      type: 'Performance',
      size: '2.4 MB',
      status: 'Généré'
    },
    {
      id: 2,
      title: 'Rapport des contrats signés',
      description: 'Liste complète des contrats signés avec détails financiers',
      date: '2026-01-28',
      type: 'Contrats',
      size: '1.8 MB',
      status: 'Généré'
    },
    {
      id: 3,
      title: 'Analyse des leads qualifiés',
      description: 'Suivi des prospects convertis en clients potentiels',
      date: '2026-01-25',
      type: 'Prospection',
      size: '1.2 MB',
      status: 'Généré'
    },
    {
      id: 4,
      title: 'Rapport de satisfaction client',
      description: 'Évaluation de la satisfaction des clients sur les services fournis',
      date: '2026-01-20',
      type: 'Satisfaction',
      size: '0.9 MB',
      status: 'Généré'
    }
  ];

  const stats = [
    {
      title: "Chiffre d'affaires",
      value: "45,200,000 FCFA",
      change: "+18%",
      icon: DollarSign,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      iconColor: "text-white",
      trend: "up"
    },
    {
      title: "Contrats signés",
      value: "128",
      change: "+22%",
      icon: FileText,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      iconColor: "text-white",
      trend: "up"
    },
    {
      title: "Taux de conversion",
      value: "72%",
      change: "+7%",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      iconColor: "text-white",
      trend: "up"
    },
    {
      title: "Agents actifs",
      value: "24",
      change: "+4",
      icon: Users,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      iconColor: "text-white",
      trend: "up"
    }
  ];

  const chartData = [
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

  const handleGenerateReport = () => {
    alert('Génération du rapport en cours...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">Rapports et analyses</h1>
          <p className="text-gray-600 mt-2">Générez et consultez les rapports détaillés de votre entreprise</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-sm hover:shadow-md">
            <Filter size={20} className="mr-2" />
            Période
          </button>
          <button 
            onClick={handleGenerateReport}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FileText size={20} className="mr-2" />
            Générer rapport
          </button>
        </div>
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
                      <TrendingUp size={16} className="text-gray-500 mr-1" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                      {stat.change}
                    </span>
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg shadow-md`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-deep-navy flex items-center">
              <BarChart3 size={24} className="mr-2 text-navy-blue" />
              Évolution des performances
            </h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="year">Année</option>
              <option value="quarter">Trimestre</option>
              <option value="month">Mois</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
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

        {/* Distribution Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-deep-navy flex items-center">
              <PieChart size={24} className="mr-2 text-navy-blue" />
              Répartition des contrats
            </h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="type">Par type</option>
              <option value="agent">Par agent</option>
              <option value="region">Par région</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Simple pie chart representation */}
              <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-r-transparent transform -rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-500 border-r-transparent transform rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-yellow-500 border-r-transparent transform rotate-[135deg]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-deep-navy">128</p>
                  <p className="text-sm text-gray-600">Contrats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-deep-navy flex items-center">
            <FileText size={24} className="mr-2 text-navy-blue" />
            Rapports récents
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un rapport..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors w-64"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rapport</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Taille</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-deep-navy">{report.title}</p>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{report.date}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-700">{report.size}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Printer size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-deep-navy mb-4 flex items-center">
            <FileText size={24} className="mr-2 text-navy-blue" />
            Rapport personnalisé
          </h3>
          <p className="text-gray-600 mb-4">Créez un rapport sur mesure selon vos besoins spécifiques</p>
          <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
            <FileText size={20} className="mr-2" />
            Créer un rapport
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-deep-navy mb-4 flex items-center">
            <Download size={24} className="mr-2 text-navy-blue" />
            Exporter données
          </h3>
          <p className="text-gray-600 mb-4">Exportez vos données dans différents formats (CSV, Excel, PDF)</p>
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
            <Download size={20} className="mr-2" />
            Exporter
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-deep-navy mb-4 flex items-center">
            <Calendar size={24} className="mr-2 text-navy-blue" />
            Planification
          </h3>
          <p className="text-gray-600 mb-4">Planifiez la génération automatique de rapports à intervalles réguliers</p>
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
            <Calendar size={20} className="mr-2" />
            Planifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;