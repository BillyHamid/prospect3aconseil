import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ProspectProvider } from './context/ProspectContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ManagerDashboard from './components/ManagerDashboard';
import ProspectionForm from './components/ProspectionForm';
import SimulationComponent from './components/SimulationComponent';
import ProspectTracking from './components/ProspectTracking';
import SignedContracts from './components/SignedContracts';
import TeamManagement from './components/TeamManagement';
import Reports from './components/Reports';
import Settings from './components/Settings';
import AssurancePartenaires from './components/AssurancePartenaires';
import AssuranceDetail from './components/AssuranceDetail';
import { Skeleton } from './components/Skeleton';

// Composant principal de l'application avec gestion des rôles
const AppContent = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef(null);

  const renderPage = () => {
    if (loading) {
      return <div className="p-6">Chargement...</div>;
    }

    if (!isAuthenticated) {
      return <AuthPage />;
    }

    if (isLoading) {
      return (
        <div className="p-6">
          <Skeleton type={currentPage === 'dashboard' ? 'dashboard' :
                        currentPage === 'prospection' ? 'prospection' :
                        currentPage === 'assurances' ? 'default' :
                        'default'} />
        </div>
      );
    }

    // Afficher le dashboard manager pour les utilisateurs avec le rôle admin
    if (user && user.role === 'admin' && currentPage === 'dashboard') {
      return <ManagerDashboard />;
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
        return <SignedContracts />;
      case 'equipes':
        return <TeamManagement />;
      case 'rapports':
        return <Reports />;
      case 'parametres':
        return <Settings />;
      case 'assurances':
        // Vérifier si l'URL contient une indication de page d'assurance détaillée
        const hash = window.location.hash;
        const isAssurancePage = hash.includes('page=assurances');

        if (isAssurancePage) {
          const urlParams = new URLSearchParams(hash.split('?')[1]);
          const assuranceId = urlParams.get('id');
          if (assuranceId) {
            return <AssuranceDetail id={assuranceId} />;
          }
        }
        return <AssurancePartenaires />;
      default:
        return <Dashboard />;
    }
  };

  const _handlePageChange = useCallback((page) => {
    setIsLoading(true);
    // clear any prior timer
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Si la page est 'assurances', on met à jour l'URL pour indiquer la navigation
      if (page === 'assurances') {
        window.location.hash = '#/?page=assurances';
      } else {
        // Si on quitte la page d'assurance, on met à jour l'URL pour supprimer les paramètres d'assurance
        const currentHash = window.location.hash;
        if (currentHash.includes('page=assurances')) {
          window.location.hash = `#/?page=${page}`;
        }
      }
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

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <ProspectProvider>
      <Layout onNavigate={_handlePageChange} currentPage={currentPage} user={user}>
        {renderPage()}
      </Layout>
    </ProspectProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
