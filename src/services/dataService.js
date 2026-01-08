import { useState, useEffect } from 'react';

// Service de persistance des données
class DataService {
  constructor() {
    this.storageKey = 'aconseils_data';
  }

  // Charger les données depuis le localStorage
  loadData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : this.getDefaultData();
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      return this.getDefaultData();
    }
  }

  // Sauvegarder les données dans le localStorage
  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  }

  // Données par défaut
  getDefaultData() {
    return {
      contracts: [
        {
          id: 1,
          contractNumber: 'CTR-2026-001',
          clientName: 'SARL Alpha Services',
          clientContact: 'M. Alpha Diallo',
          clientPhone: '+226 70 12 34 56',
          clientEmail: 'contact@alpha-services.bf',
          contractType: 'Assurance Auto',
          startDate: '2026-01-01',
          endDate: '2026-12-31',
          amount: 280000,
          status: 'Actif',
          renewalStatus: 'À renouveler',
          nextPayment: '2026-04-01',
          notifications: [
            { type: 'email', date: '2026-11-30', sent: true },
            { type: 'sms', date: '2026-11-30', sent: true },
            { type: 'email', date: '2026-12-17', sent: false }
          ],
          documents: ['contrat.pdf', 'addendum.pdf'],
          notes: 'Client important - à contacter personnellement pour renouvellement'
        },
        {
          id: 2,
          contractNumber: 'CTR-2026-002',
          clientName: 'Entreprise Beta SARL',
          clientContact: 'Mme. Beta Traoré',
          clientPhone: '+226 78 98 76 54',
          clientEmail: 'beta@beta-enterprise.bf',
          contractType: 'Assurance Habitation',
          startDate: '2026-01-15',
          endDate: '2026-11-14',
          amount: 195000,
          status: 'Bientôt expiré',
          renewalStatus: 'À renouveler',
          nextPayment: '2026-02-15',
          notifications: [
            { type: 'email', date: '2026-10-14', sent: false },
            { type: 'sms', date: '2026-10-14', sent: false },
            { type: 'email', date: '2026-10-31', sent: false }
          ],
          documents: ['contrat.pdf'],
          notes: 'Renouvellement à discuter'
        },
        {
          id: 3,
          contractNumber: 'CTR-2026-003',
          clientName: 'Société Gamma SA',
          clientContact: 'M. Gamma Kouyaté',
          clientPhone: '+226 76 11 22 33',
          clientEmail: 'gamma@gamma-society.bf',
          contractType: 'Assurance Santé',
          startDate: '2026-02-01',
          endDate: '2027-01-31',
          amount: 320000,
          status: 'Actif',
          renewalStatus: 'À surveiller',
          nextPayment: '2026-05-01',
          notifications: [],
          documents: ['contrat.pdf', 'certificat.pdf'],
          notes: 'Contrat à valeur élevée'
        },
        {
          id: 4,
          contractNumber: 'CTR-2026-004',
          clientName: 'Comptoir Delta',
          clientContact: 'Mme. Delta Sissoko',
          clientPhone: '+226 76 55 44 33',
          clientEmail: 'delta@comptoir-delta.bf',
          contractType: 'Assurance Moto',
          startDate: '2026-01-10',
          endDate: '2026-07-09',
          amount: 95000,
          status: 'Bientôt expiré',
          renewalStatus: 'À renouveler',
          nextPayment: '2026-04-10',
          notifications: [
            { type: 'email', date: '2026-06-09', sent: false },
            { type: 'sms', date: '2026-06-09', sent: false }
          ],
          documents: ['contrat.pdf'],
          notes: 'Petit contrat mais bon client'
        }
      ],
      prospects: [
        {
          id: 1,
          name: 'Deborah BAZIE',
          phone: '+226 70 12 34 56',
          email: 'deborah@3aconseils.com',
          insuranceType: 'Auto',
          status: 'chaud',
          lastContact: '2026-01-03',
          nextAppointment: '2026-01-05',
          budget: '60,000 FCFA/mois',
          notes: 'Agent Commercial'
        },
        {
          id: 2,
          name: 'TO Alida',
          phone: '+226 78 98 76 54',
          email: 'alida@3aconseils.com',
          insuranceType: 'Habitation',
          status: 'a_relancer',
          lastContact: '2025-12-28',
          nextAppointment: '2026-01-10',
          budget: '42,500 FCFA/mois',
          notes: 'Gérante'
        },
        {
          id: 3,
          name: 'Prospect Test',
          phone: '+226 76 11 22 33',
          email: 'test@prospect.bf',
          insuranceType: 'Santé',
          status: 'contrat_signe',
          lastContact: '2026-01-04',
          nextAppointment: null,
          budget: '47,500 FCFA/mois',
          notes: 'Prospect de test'
        },
        {
          id: 4,
          name: 'Client Exemple',
          phone: '+226 76 55 44 33',
          email: 'client@exemple.bf',
          insuranceType: 'Moto',
          status: 'perdu',
          lastContact: '2025-12-20',
          nextAppointment: null,
          budget: '37,500 FCFA/mois',
          notes: 'Client exemple'
        },
        {
          id: 5,
          name: 'Prospect Important',
          phone: '+226 77 33 44 55',
          email: 'important@prospect.bf',
          insuranceType: 'Auto',
          status: 'a_relancer',
          lastContact: '2026-01-02',
          nextAppointment: '2026-01-08',
          budget: '55,000 FCFA/mois',
          notes: 'Prospect prioritaire'
        },
        {
          id: 6,
          name: 'Client Régulier',
          phone: '+226 76 77 88 99',
          email: 'regulier@client.bf',
          insuranceType: 'Habitation',
          status: 'chaud',
          lastContact: '2026-01-04',
          nextAppointment: '2026-01-06',
          budget: '45,000 FCFA/mois',
          notes: 'Client fidèle'
        }
      ]
    };
  }

  // Obtenir tous les contrats
  getContracts() {
    const data = this.loadData();
    return data.contracts;
  }

  // Ajouter un nouveau contrat
  addContract(contract) {
    const data = this.loadData();
    const newContract = {
      ...contract,
      id: Date.now(), // ID unique basé sur le timestamp
      status: 'Actif',
      renewalStatus: 'À surveiller',
      nextPayment: contract.startDate,
      notifications: [],
      documents: []
    };
    data.contracts.push(newContract);
    this.saveData(data);
    return newContract;
  }

  // Mettre à jour un contrat
  updateContract(id, updates) {
    const data = this.loadData();
    const contractIndex = data.contracts.findIndex(c => c.id === id);
    if (contractIndex !== -1) {
      data.contracts[contractIndex] = { ...data.contracts[contractIndex], ...updates };
      this.saveData(data);
    }
    return data.contracts[contractIndex];
  }

  // Supprimer un contrat
  deleteContract(id) {
    const data = this.loadData();
    data.contracts = data.contracts.filter(c => c.id !== id);
    this.saveData(data);
  }

  // Obtenir tous les prospects
  getProspects() {
    const data = this.loadData();
    return data.prospects;
  }

  // Ajouter un nouveau prospect
  addProspect(prospect) {
    const data = this.loadData();
    const newProspect = {
      ...prospect,
      id: Date.now(),
      creationDate: new Date().toISOString().split('T')[0]
    };
    data.prospects.push(newProspect);
    this.saveData(data);
    return newProspect;
  }

  // Mettre à jour un prospect
  updateProspect(id, updates) {
    const data = this.loadData();
    const prospectIndex = data.prospects.findIndex(p => p.id === id);
    if (prospectIndex !== -1) {
      data.prospects[prospectIndex] = { ...data.prospects[prospectIndex], ...updates };
      this.saveData(data);
    }
    return data.prospects[prospectIndex];
  }

  // Supprimer un prospect
  deleteProspect(id) {
    const data = this.loadData();
    data.prospects = data.prospects.filter(p => p.id !== id);
    this.saveData(data);
  }
}

// Instance singleton du service
const dataService = new DataService();

export default dataService;