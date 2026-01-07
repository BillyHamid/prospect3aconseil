import React, { createContext, useContext, useReducer, useEffect } from 'react';
import dataService from '../services/dataService';

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
    prospects: []
  });

  // Charger les prospects depuis le service de données au montage
  useEffect(() => {
    const loadProspects = async () => {
      try {
        const prospects = dataService.getProspects();
        dispatch({ type: SET_PROSPECTS, payload: prospects });
      } catch (error) {
        console.error('Erreur lors du chargement des prospects:', error);
      }
    };

    loadProspects();
  }, []);

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

    // Sauvegarder dans le service de données
    dataService.addProspect(newProspect);

    dispatch({ type: ADD_PROSPECT, payload: newProspect });
  };

  const updateProspect = (prospect) => {
    // Mettre à jour dans le service de données
    dataService.updateProspect(prospect.id, prospect);

    dispatch({ type: UPDATE_PROSPECT, payload: prospect });
  };

  const deleteProspect = (id) => {
    // Supprimer du service de données
    dataService.deleteProspect(id);

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