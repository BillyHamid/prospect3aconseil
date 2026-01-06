import React, { createContext, useContext, useReducer } from 'react';

// Définir les actions
const ADD_PROSPECT = 'ADD_PROSPECT';
const UPDATE_PROSPECT = 'UPDATE_PROSPECT';
const DELETE_PROSPECT = 'DELETE_PROSPECT';
const SET_PROSPECTS = 'SET_PROSPECTS';

// Créer le contexte
const ProspectContext = createContext();

// Reducer pour gérer les états des prospects
const prospectReducer = (state, action) => {
  switch (action.type) {
    case ADD_PROSPECT:
      return {
        ...state,
        prospects: [...state.prospects, { ...action.payload, id: Date.now() }]
      };
    case UPDATE_PROSPECT:
      return {
        ...state,
        prospects: state.prospects.map(prospect =>
          prospect.id === action.payload.id ? action.payload : prospect
        )
      };
    case DELETE_PROSPECT:
      return {
        ...state,
        prospects: state.prospects.filter(prospect => prospect.id !== action.payload)
      };
    case SET_PROSPECTS:
      return {
        ...state,
        prospects: action.payload
      };
    default:
      return state;
  }
};

// Fournisseur de contexte
export const ProspectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(prospectReducer, {
    prospects: [
      {
        id: 1,
        name: 'Yacouba Diallo',
        phone: '+226 70 12 34 56',
        email: 'yacouba.diallo@email.bf',
        insuranceType: 'Auto',
        status: 'chaud',
        lastContact: '2026-01-03',
        nextAppointment: '2026-01-05',
        budget: '60,000 FCFA/mois',
        notes: 'Intéressé par la formule complète'
      },
      {
        id: 2,
        name: 'Aminata Traoré',
        phone: '+226 78 98 76 54',
        email: 'aminata.traore@email.bf',
        insuranceType: 'Habitation',
        status: 'a_relancer',
        lastContact: '2025-12-28',
        nextAppointment: '2026-01-10',
        budget: '42,500 FCFA/mois',
        notes: 'Besoin de réfléchir'
      },
      {
        id: 3,
        name: 'Salif Kouyaté',
        phone: '+226 76 11 22 33',
        email: 'salif.kouyate@email.bf',
        insuranceType: 'Santé',
        status: 'contrat_signe',
        lastContact: '2026-01-04',
        nextAppointment: null,
        budget: '47,500 FCFA/mois',
        notes: 'Contrat signé, en attente de mise en service'
      },
      {
        id: 4,
        name: 'Fatoumata Sissoko',
        phone: '+226 76 55 44 33',
        email: 'fatoumata.sissoko@email.bf',
        insuranceType: 'Moto',
        status: 'perdu',
        lastContact: '2025-12-20',
        nextAppointment: null,
        budget: '37,500 FCFA/mois',
        notes: 'A choisi un concurrent'
      },
      {
        id: 5,
        name: 'Issa Ouattara',
        phone: '+226 77 33 44 55',
        email: 'issa.ouattara@email.bf',
        insuranceType: 'Auto',
        status: 'a_relancer',
        lastContact: '2026-01-02',
        nextAppointment: '2026-01-08',
        budget: '55,000 FCFA/mois',
        notes: 'Très intéressé, en attente de documents'
      },
      {
        id: 6,
        name: 'Mariam Kaboré',
        phone: '+226 76 77 88 99',
        email: 'mariam.kabore@email.bf',
        insuranceType: 'Habitation',
        status: 'chaud',
        lastContact: '2026-01-04',
        nextAppointment: '2026-01-06',
        budget: '45,000 FCFA/mois',
        notes: 'Rendez-vous confirmé'
      }
    ]
  });

  const addProspect = (prospectData) => {
    const newProspect = {
      id: Date.now(),
      name: `${prospectData.firstName} ${prospectData.lastName}`,
      phone: prospectData.phone,
      email: prospectData.email,
      insuranceType: prospectData.insuranceType,
      status: 'a_relancer', // Statut par défaut pour les nouveaux prospects
      lastContact: new Date().toISOString().split('T')[0], // Date d'aujourd'hui
      nextAppointment: prospectData.appointmentDate,
      budget: `${prospectData.budget} FCFA/mois`,
      notes: `Besoin: ${prospectData.needs.join(', ')}`
    };
    
    dispatch({ type: ADD_PROSPECT, payload: newProspect });
  };

  const updateProspect = (prospect) => {
    dispatch({ type: UPDATE_PROSPECT, payload: prospect });
  };

  const deleteProspect = (id) => {
    dispatch({ type: DELETE_PROSPECT, payload: id });
  };

  const setProspects = (prospects) => {
    dispatch({ type: SET_PROSPECTS, payload: prospects });
  };

  return (
    <ProspectContext.Provider
      value={{
        prospects: state.prospects,
        addProspect,
        updateProspect,
        deleteProspect,
        setProspects
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useProspectContext = () => {
  const context = useContext(ProspectContext);
  if (!context) {
    throw new Error('useProspectContext must be used within a ProspectProvider');
  }
  return context;
};