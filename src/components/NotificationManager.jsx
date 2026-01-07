import React, { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, Calendar, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import notificationService from '../services/notificationService';
import dataService from '../services/dataService';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Charger les contrats depuis le service de données
    const loadContracts = async () => {
      try {
        const loadedContracts = dataService.getContracts();
        setContracts(loadedContracts);

        // Initialiser le service de notifications
        notificationService.initialize();

        // Mettre à jour les notifications périodiquement
        const interval = setInterval(() => {
          setNotifications(notificationService.getPendingNotifications());
        }, 60000); // Mise à jour toutes les minutes

        // Mise à jour initiale
        setNotifications(notificationService.getPendingNotifications());

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Erreur lors du chargement des contrats:', error);
      }
    };

    loadContracts();
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail size={16} />;
      case 'sms':
        return <MessageSquare size={16} />;
      case 'one_month':
        return <Calendar size={16} />;
      case 'two_weeks':
        return <Clock size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'one_month':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'two_weeks':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'one_day':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    return notification.type === activeTab;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-deep-navy flex items-center">
          <Bell size={24} className="mr-2 text-navy-blue" />
          Notifications d'échéance
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeTab === 'all' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes
          </button>
          <button 
            onClick={() => setActiveTab('one_month')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeTab === 'one_month' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1 mois
          </button>
          <button 
            onClick={() => setActiveTab('two_weeks')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeTab === 'two_weeks' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            2 sem.
          </button>
          <button 
            onClick={() => setActiveTab('one_day')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeTab === 'one_day' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1 jour
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucune notification d'échéance prévue</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-xl flex items-start ${getNotificationColor(notification.type)}`}
            >
              <div className="mr-3 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm opacity-80 mt-1">
                  Contrat: {notification.contractNumber} • Client: {notification.clientName}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span>{new Date(notification.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Mail size={12} className="mr-1" /> {notification.clientEmail}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <MessageSquare size={12} className="mr-1" /> {notification.clientPhone}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    notificationService.sendEmailNotification(notification);
                    notificationService.markAsSent(notification.id);
                    setNotifications(notificationService.getPendingNotifications());
                  }}
                  className="p-1.5 text-gray-600 hover:bg-white hover:bg-opacity-30 rounded"
                  title="Envoyer email"
                >
                  <Mail size={14} />
                </button>
                <button 
                  onClick={() => {
                    notificationService.sendSMSNotification(notification);
                    notificationService.markAsSent(notification.id);
                    setNotifications(notificationService.getPendingNotifications());
                  }}
                  className="p-1.5 text-gray-600 hover:bg-white hover:bg-opacity-30 rounded"
                  title="Envoyer SMS"
                >
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={() => notificationService.sendAllPendingNotifications()}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <CheckCircle size={18} className="mr-2" />
            Envoyer toutes les notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;