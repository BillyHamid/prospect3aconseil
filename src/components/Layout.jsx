import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  User,
  Briefcase,
  Calculator,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Users,
  FileText,
  Shield,
  UserCheck
} from 'lucide-react';

const Layout = ({ children, onNavigate, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, hasPermission } = useAuth();

  // Navigation basée sur les permissions de l'utilisateur
  const navigation = [
    { name: 'Dashboard', key: 'dashboard', icon: Home, permissions: ['dashboard'] },
    { name: 'Prospection', key: 'prospection', icon: User, permissions: ['prospection'] },
    { name: 'Simulateur', key: 'simulateur', icon: Calculator, permissions: ['simulateur'] },
    { name: 'Suivi', key: 'suivi', icon: BarChart3, permissions: ['suivi'] },
    { name: 'Contrats signés', key: 'dossiers', icon: Briefcase, permissions: ['dossiers'] },
    { name: 'Équipes', key: 'equipes', icon: Users, permissions: ['equipes'] },
    { name: 'Rapports', key: 'rapports', icon: FileText, permissions: ['rapports'] },
    { name: 'Paramètres', key: 'parametres', icon: Settings, permissions: ['parametres'] },
  ];

  // Filtrer les éléments de navigation en fonction des permissions
  const filteredNavigation = navigation.filter(item =>
    !item.permissions || item.permissions.some(permission => hasPermission(permission))
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
      setSidebarOpen(false); // Fermer le menu sur mobile après navigation
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img
              src="/3ac.jpeg"
              alt="3A Conseils Logo"
              className="w-10 h-10 rounded-xl shadow-md object-cover"
            />
            <div>
              <p className="text-xs text-gray-500">Plateforme</p>
              <p className="text-xs font-medium text-red-700 capitalize">{user?.role || 'Utilisateur'}</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.key)}
                    className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group ${
                      currentPage === item.key
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mr-3 ${
                        currentPage === item.key
                          ? 'text-white'
                          : 'text-gray-600 group-hover:text-red-600'
                      } transition-colors`}
                    />
                    <span className={`font-medium ${
                      currentPage === item.key ? 'text-white' : 'text-gray-800'
                    }`}>
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-gray-800 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
            >
              <LogOut size={20} className="mr-3 text-gray-600 group-hover:text-red-600 transition-colors" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top navigation bar */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {filteredNavigation.find(item => item.key === currentPage)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors w-64"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center shadow-md cursor-pointer">
                <span className="text-white font-medium text-sm">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-white flex items-center justify-center">
                {user?.role === 'admin' ? (
                  <Shield size={12} className="text-blue-500" />
                ) : (
                  <UserCheck size={12} className="text-green-500" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;