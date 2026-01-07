import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Key, 
  Bell, 
  Mail, 
  Globe, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Upload,
  Settings as SettingsIcon
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Manager Test',
    email: 'manager@3aconseils.com',
    role: 'Manager',
    phone: '+226 70 00 00 00',
    department: 'Commercial'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    weeklyReport: true
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profil mis à jour avec succès !');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }
    alert('Sécurité mise à jour avec succès !');
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-navy to-navy-blue bg-clip-text text-transparent">Paramètres</h1>
          <p className="text-gray-600 mt-2">Gérez vos préférences et paramètres de compte</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
            <Save size={20} className="mr-2" />
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'profile'
                ? 'text-red-700 border-b-2 border-red-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              Profil
            </div>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'notifications'
                ? 'text-red-700 border-b-2 border-red-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <Bell size={18} className="mr-2" />
              Notifications
            </div>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'security'
                ? 'text-red-700 border-b-2 border-red-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <Lock size={18} className="mr-2" />
              Sécurité
            </div>
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === 'company'
                ? 'text-red-700 border-b-2 border-red-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center">
              <Shield size={18} className="mr-2" />
              Entreprise
            </div>
          </button>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{profileData.name.charAt(0)}</span>
                </div>
                <div>
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-2 px-4 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
                    <Upload size={16} className="mr-2" />
                    Changer photo
                  </button>
                  <p className="text-sm text-gray-600 mt-2">Format JPG, PNG ou GIF. Taille maximale 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Save size={20} className="mr-2" />
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-deep-navy">Préférences de notification</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center">
                    <Mail size={20} className="text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications par email</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.email ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">📱</span>
                    <div>
                      <p className="font-medium text-gray-800">SMS</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications par SMS</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.sms ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">🔔</span>
                    <div>
                      <p className="font-medium text-gray-800">Notifications Push</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications push</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.push ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">Rapport hebdomadaire</p>
                      <p className="text-sm text-gray-600">Recevoir un rapport hebdomadaire</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('weeklyReport')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.weeklyReport ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handleSaveSecurity} className="space-y-6">
              <h3 className="text-lg font-semibold text-deep-navy">Sécurité du compte</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pr-12"
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pr-12"
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pr-12"
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Save size={20} className="mr-2" />
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-deep-navy">Paramètres de l'entreprise</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                  <input
                    type="text"
                    defaultValue="3A Conseils"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro d'immatriculation</label>
                  <input
                    type="text"
                    defaultValue="CI-BF-2023-001234"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse fiscale</label>
                  <input
                    type="text"
                    defaultValue="Ouagadougou, Burkina Faso"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Devise par défaut</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                    <option value="XOF">FCFA (XOF)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">Dollar US (USD)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg">
                  <Save size={20} className="mr-2" />
                  Enregistrer les paramètres
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;