import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement de l'application
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Vérifier si le compte est expiré (pour les comptes de test)
        if (parsedUser.expirationDate) {
          const now = new Date();
          const expiration = new Date(parsedUser.expirationDate);
          if (now > expiration) {
            // Le compte est expiré, on le déconnecte
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUser(null);
            return;
          }
        }

        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Vérification des identifiants de test
    let userData = null;

    // Comptes de test avec expiration
    if (email === 'test1@gmail.com' && password === 'boxtest') {
      const now = new Date();
      const expiration = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 jours
      userData = {
        id: 5,
        email: 'test1@gmail.com',
        name: 'Client Test 1',
        role: 'agent',
        permissions: ['prospection', 'suivi', 'simulateur', 'dossiers', 'assurances'],
        expirationDate: expiration.toISOString()
      };
    } else if (email === 'test2@gmail.com' && password === 'boxtest') {
      const now = new Date();
      const expiration = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes
      userData = {
        id: 6,
        email: 'test2@gmail.com',
        name: 'Client Test 2',
        role: 'admin',
        permissions: ['dashboard', 'prospection', 'suivi', 'simulateur', 'dossiers', 'equipes', 'rapports', 'parametres', 'assurances', 'admin'],
        expirationDate: expiration.toISOString()
      };
    } else if (email === 'test@3aconseils.com' && password === 'Test1234!') {
      userData = {
        id: 1,
        email: 'test@3aconseils.com',
        name: 'Agent Test',
        role: 'agent',
        permissions: ['prospection', 'suivi', 'simulateur', 'dossiers', 'assurances']
      };
    } else if (email === 'demo@3aconseils.com' && password === 'Demo1234!') {
      userData = {
        id: 2,
        email: 'demo@3aconseils.com',
        name: 'Agent Demo',
        role: 'agent',
        permissions: ['prospection', 'suivi', 'simulateur', 'dossiers', 'assurances']
      };
    } else if (email === 'admin@3aconseils.com' && password === 'Admin1234!') {
      userData = {
        id: 4,
        email: 'admin@3aconseils.com',
        name: 'Admin Test',
        role: 'admin',
        permissions: ['dashboard', 'prospection', 'suivi', 'simulateur', 'dossiers', 'equipes', 'rapports', 'parametres', 'assurances', 'admin']
      };
    }

    if (userData) {
      // Vérifier si le compte est expiré (pour les comptes de test)
      if (userData.expirationDate) {
        const now = new Date();
        const expiration = new Date(userData.expirationDate);
        if (now > expiration) {
          return { success: false, error: 'Compte expiré' };
        }
      }

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'Identifiants incorrects' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission: (permission) => {
      if (!user) return false;
      return user.permissions.includes(permission);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};