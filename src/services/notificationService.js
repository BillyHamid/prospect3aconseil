import dataService from './dataService';

// Service de notifications pour les échéances de contrats
class NotificationService {
  constructor() {
    this.notifications = [];
    this.checkInterval = null;
  }

  // Méthode pour initialiser le service
  initialize() {
    this.setupNotificationChecks();
  }

  // Configuration des vérifications de notifications
  setupNotificationChecks() {
    // Arrêter l'ancien intervalle s'il existe
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    
    // Vérifier quotidiennement les échéances
    this.checkInterval = setInterval(() => {
      this.checkExpiringContracts();
    }, 24 * 60 * 60 * 1000); // 24 heures
    
    // Vérifier immédiatement au démarrage
    this.checkExpiringContracts();
  }

  // Vérifier les contrats expirant bientôt
  checkExpiringContracts() {
    const today = new Date();
    
    // Obtenir les contrats depuis le service de données
    const contracts = dataService.getContracts();
    
    contracts.forEach(contract => {
      const endDate = new Date(contract.endDate);
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Vérifier si une notification pour cette échéance a déjà été planifiée
      const existingNotification = this.notifications.find(n => 
        n.contractId === contract.id && 
        n.type === 'one_month' && 
        n.date.toDateString() === new Date(today.getTime() + 30*24*60*60*1000).toDateString()
      );
      
      // Notification 1 mois avant (30 jours)
      if (diffDays === 30 && !existingNotification) {
        this.scheduleNotification(contract, 'one_month', 'Un contrat expire dans 1 mois');
      }
      // Notification 2 semaines avant (14 jours)
      else if (diffDays === 14) {
        this.scheduleNotification(contract, 'two_weeks', 'Un contrat expire dans 2 semaines');
      }
      // Notification la veille
      else if (diffDays === 1) {
        this.scheduleNotification(contract, 'one_day', 'Un contrat expire demain');
      }
    });
  }

  // Planifier une notification
  scheduleNotification(contract, type, message) {
    const notification = {
      id: Date.now() + Math.random(),
      contractId: contract.id,
      type,
      message,
      date: new Date(),
      clientName: contract.clientName,
      clientContact: contract.clientContact,
      clientEmail: contract.clientEmail,
      clientPhone: contract.clientPhone,
      contractNumber: contract.contractNumber,
      sent: false
    };
    
    this.notifications.push(notification);
    this.showBrowserNotification(notification);
  }

  // Afficher une notification dans le navigateur
  showBrowserNotification(notification) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.message, {
          body: `Contrat: ${notification.contractNumber}\nClient: ${notification.clientName}`,
          icon: '/src/assets/3ac.jpeg'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(notification.message, {
              body: `Contrat: ${notification.contractNumber}\nClient: ${notification.clientName}`,
              icon: '/src/assets/3ac.jpeg'
            });
          }
        });
      }
    }
  }

  // Envoyer une notification par email (simulé)
  sendEmailNotification(notification) {
    console.log(`Envoi d'email de notification:`, {
      to: notification.clientEmail,
      subject: `Rappel d'échéance de contrat - ${notification.contractNumber}`,
      message: `${notification.message}. Le contrat ${notification.contractNumber} pour ${notification.clientName} arrive à échéance.`
    });
    // Dans une application réelle, cela appellerait une API backend
  }

  // Envoyer une notification par SMS (simulé)
  sendSMSNotification(notification) {
    console.log(`Envoi de SMS de notification:`, {
      to: notification.clientPhone,
      message: `[3A Conseils] ${notification.message}. Contrat: ${notification.contractNumber}`
    });
    // Dans une application réelle, cela appellerait une API SMS
  }

  // Obtenir les notifications non envoyées
  getPendingNotifications() {
    return this.notifications.filter(n => !n.sent);
  }

  // Marquer une notification comme envoyée
  markAsSent(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.sent = true;
    }
  }

  // Envoyer toutes les notifications en attente
  sendAllPendingNotifications() {
    const pending = this.getPendingNotifications();
    pending.forEach(notification => {
      this.sendEmailNotification(notification);
      this.sendSMSNotification(notification);
      this.markAsSent(notification.id);
    });
  }
}

// Instance singleton du service
const notificationService = new NotificationService();

export default notificationService;