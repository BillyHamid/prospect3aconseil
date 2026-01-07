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

    if (email === 'test@3aconseils.com' && password === 'Test1234!') {
      userData = {
        id: 1,
        email: 'test@3aconseils.com',
        name: 'Agent Test',
        role: 'agent',
        permissions: ['prospection', 'suivi', 'simulateur', 'dossiers']
      };
    } else if (email === 'demo@3aconseils.com' && password === 'Demo1234!') {
      userData = {
        id: 2,
        email: 'demo@3aconseils.com',
        name: 'Agent Demo',
        role: 'agent',
        permissions: ['prospection', 'suivi', 'simulateur', 'dossiers']
      };
    } else if (email === 'manager@3aconseils.com' && password === 'Manager1234!') {
      userData = {
        id: 3,
        email: 'manager@3aconseils.com',
        name: 'Manager Test',
        role: 'manager',
        permissions: ['dashboard', 'prospection', 'suivi', 'simulateur', 'dossiers', 'equipes', 'rapports', 'parametres']
      };
    } else if (email === 'admin@3aconseils.com' && password === 'Admin1234!') {
      userData = {
        id: 4,
        email: 'admin@3aconseils.com',
        name: 'Admin Test',
        role: 'manager',
        permissions: ['dashboard', 'prospection', 'suivi', 'simulateur', 'dossiers', 'equipes', 'rapports', 'parametres', 'admin']
      };
    }

    if (userData) {
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