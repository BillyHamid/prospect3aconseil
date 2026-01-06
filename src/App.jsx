import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ProspectProvider } from './context/ProspectContext';
import Layout from './components/Layout';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ProspectionForm from './components/ProspectionForm';
import SimulationComponent from './components/SimulationComponent';
import ProspectTracking from './components/ProspectTracking';
import Dossiers from './components/Dossiers';
import { Skeleton } from './components/Skeleton';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const timerRef = useRef(null);

  const renderPage = () => {
    if (!isAuthenticated) {
      return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
    }

    if (isLoading) {
      return (
        <div className="p-6">
          <Skeleton type={currentPage === 'dashboard' ? 'dashboard' :
                        currentPage === 'prospection' ? 'prospection' :
                        'default'} />
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'prospection':
        return <ProspectionForm />;
      case 'simulateur':
        return <SimulationComponent />;
      case 'suivi':
        return <ProspectTracking />;
      case 'dossiers':
        return <Dossiers />;
      case 'parametres':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-deep-navy mb-6">Paramètres</h1>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-gray-600">Page de paramètres en cours de développement</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };


  const _handlePageChange = useCallback((page) => {
    setIsLoading(true);
    // clear any prior timer
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      timerRef.current = null;
    }, 300);
  }, [setIsLoading, setCurrentPage]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <ProspectProvider>
      <Layout onNavigate={_handlePageChange} currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </ProspectProvider>
  );
}

export default App;
