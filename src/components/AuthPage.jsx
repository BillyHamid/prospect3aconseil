import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Shield, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuickLogin = () => {
    setFormData({
      email: 'test@3aconseils.com',
      password: 'Test1234!',
      name: '',
      confirmPassword: ''
    });
    setIsLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Vérification basique des identifiants de test
    if (isLogin) {
      if (formData.email === 'test@3aconseils.com' && formData.password === 'Test1234!') {
        alert('Connexion réussie avec les identifiants de test!');
        // Appel de la fonction de callback pour mettre à jour l'état d'authentification
        onLogin && onLogin();
      } else if (formData.email === 'demo@3aconseils.com' && formData.password === 'Demo1234!') {
        alert('Connexion réussie avec les identifiants de démonstration!');
        // Appel de la fonction de callback pour mettre à jour l'état d'authentification
        onLogin && onLogin();
      } else {
        alert('Identifiants incorrects. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen max-w-6xl mx-auto">
          {/* Left Side - Branding & Info */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="max-w-md mx-auto text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-navy-blue to-blue-600 flex items-center justify-center shadow-lg mr-4">
                  <Shield size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">
                    3A Conseils
                  </h1>
                  <p className="text-gray-600">Plateforme d'assurance</p>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Simplifiez votre gestion d'assurance
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Une solution complète pour gérer vos clients, contrats et suivis avec efficacité et professionnalisme.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Suivi en temps réel</h3>
                    <p className="text-gray-600">Gérez vos prospects et contrats instantanément</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Interface intuitive</h3>
                    <p className="text-gray-600">Design moderne et ergonomique pour une expérience optimale</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Sécurité garantie</h3>
                    <p className="text-gray-600">Données protégées avec les dernières technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="text-center mb-8">
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r from-navy-blue to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                    <Shield size={36} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">
                    {isLogin ? 'Connexion' : 'Créer un compte'}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {isLogin
                      ? 'Connectez-vous à votre compte'
                      : 'Créez votre compte pour commencer'}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-5">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User size={20} className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Votre nom complet"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse e-mail
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock size={20} className="text-gray-500" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="••••••••"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-navy-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    {isLogin ? 'Se connecter' : 'Créer le compte'}
                    <ArrowRight size={20} className="ml-2" />
                  </button>

                  {isLogin && (
                    <button
                      type="button"
                      onClick={handleQuickLogin}
                      className="w-full mt-4 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <Sparkles size={20} className="mr-2" />
                      Connexion rapide (test)
                    </button>
                  )}
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gradient-to-r from-navy-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 font-bold text-base"
                  >
                    {isLogin
                      ? "Pas de compte ? S'inscrire"
                      : "Déjà un compte ? Se connecter"}
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>© 2026 3A Conseils. Tous droits réservés.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;