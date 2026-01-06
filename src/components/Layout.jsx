import React, { useState } from 'react';
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
  Search
} from 'lucide-react';

const Layout = ({ children, onNavigate, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', key: 'dashboard', icon: Home },
    { name: 'Prospection', key: 'prospection', icon: User },
    { name: 'Simulateur', key: 'simulateur', icon: Calculator },
    { name: 'Suivi', key: 'suivi', icon: BarChart3 },
    { name: 'Dossiers', key: 'dossiers', icon: Briefcase },
    { name: 'Paramètres', key: 'parametres', icon: Settings },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
      setSidebarOpen(false); // Fermer le menu sur mobile après navigation
    }
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-navy-blue to-blue-700 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">3A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-deep-navy">3A Conseils</h1>
              <p className="text-xs text-gray-500">Plateforme</p>
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
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.key)}
                    className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group ${
                      currentPage === item.key
                        ? 'bg-gradient-to-r from-navy-blue to-blue-600 text-white shadow-md'
                        : 'text-deep-navy hover:bg-gray-50'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mr-3 ${
                        currentPage === item.key
                          ? 'text-white'
                          : 'text-gray-600 group-hover:text-navy-blue'
                      } transition-colors`}
                    />
                    <span className={`font-medium ${
                      currentPage === item.key ? 'text-white' : 'text-deep-navy'
                    }`}>
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="flex items-center w-full p-3 text-deep-navy rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
              <LogOut size={20} className="mr-3 text-gray-600 group-hover:text-navy-blue transition-colors" />
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
              className="lg:hidden mr-4 text-gray-600 hover:text-deep-navy p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-deep-navy">
              {navigation.find(item => item.key === currentPage)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors w-64"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-navy-blue hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-navy-blue to-blue-600 flex items-center justify-center shadow-md cursor-pointer">
                <span className="text-white font-medium text-sm">SK</span>
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