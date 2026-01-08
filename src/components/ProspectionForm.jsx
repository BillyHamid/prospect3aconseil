import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Target,
  Calendar,
  Map
} from 'lucide-react';
import { useProspectContext } from '../context/ProspectContext';

const ProspectionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    insuranceType: '',
    budget: '',
    needs: [],
    appointmentDate: '',
    location: null
  });
  const [showCustomAddress, setShowCustomAddress] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);

  const { addProspect } = useProspectContext();

  const steps = [
    { id: 1, title: 'Informations personnelles', icon: User },
    { id: 2, title: 'Coordonnées', icon: Phone },
    { id: 3, title: 'Type d\'assurance', icon: Shield },
    { id: 4, title: 'Détails de la demande', icon: Target },
    { id: 5, title: 'Rendez-vous', icon: Calendar }
  ];

  const insuranceTypes = [
    { value: 'auto', label: 'Auto', icon: '🚗' },
    { value: 'moto', label: 'Moto', icon: '🏍️' },
    { value: 'sante', label: 'Santé', icon: '🏥' },
    { value: 'habitation', label: 'Habitation', icon: '🏠' }
  ];

  const needsOptions = [
    { value: 'franchise', label: 'Meilleure franchise' },
    { value: 'couverture', label: 'Meilleure couverture' },
    { value: 'prix', label: 'Meilleur prix' },
    { value: 'assistance', label: 'Assistance 0km' },
    { value: 'reparation', label: 'Réparation rapide' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleNeed = (need) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const locationData = {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toISOString()
        };

        setLocationInfo(locationData);
        setFormData(prev => ({
          ...prev,
          location: `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`
        }));

        alert("Position actuelle récupérée avec succès !");
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("L'utilisateur a refusé la demande de géolocalisation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("La position de l'utilisateur n'est pas disponible.");
            break;
          case error.TIMEOUT:
            alert("La demande de géolocalisation a expiré.");
            break;
          default:
            alert("Une erreur inconnue s'est produite.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const getCurrentStepIcon = () => {
    const currentStepData = steps.find(step => step.id === currentStep);
    return currentStepData ? currentStepData.icon : User;
  };

  const isStepComplete = (stepId) => {
    if (stepId === 1) {
      return formData.firstName.trim() && formData.lastName.trim();
    } else if (stepId === 2) {
      return formData.phone.trim() && formData.email.trim();
    } else if (stepId === 3) {
      return formData.insuranceType;
    } else if (stepId === 4) {
      return formData.budget && parseInt(formData.budget) > 0; // S'assurer que le budget est un nombre positif
    } else if (stepId === 5) {
      return formData.appointmentDate;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir le budget en format FCFA
    const budgetFCFA = `${formData.budget} FCFA/mois`;

    // Créer le prospect avec les données du formulaire
    const prospectData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      insuranceType: formData.insuranceType,
      budget: budgetFCFA,
      needs: formData.needs || [], // S'assurer que needs est un tableau
      appointmentDate: formData.appointmentDate,
      location: formData.location, // Inclure les informations de localisation
      locationInfo: locationInfo // Inclure les détails de localisation si disponibles
    };

    // Ajouter le prospect via le contexte
    addProspect(prospectData);

    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      insuranceType: '',
      budget: '',
      needs: [],
      appointmentDate: '',
      location: null
    });

    // Réinitialiser les états de localisation
    setShowCustomAddress(false);
    setLocationInfo(null);

    // Réinitialiser l'étape
    setCurrentStep(1);

    alert('Prospect créé avec succès et ajouté au suivi !');
  };

  const CurrentStepIcon = getCurrentStepIcon();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Stepper Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-deep-navy">Nouveau Prospect</h1>
            <div className="flex items-center">
              <CurrentStepIcon size={24} />
              <span className="ml-2 text-sm font-medium text-gray-600">
                Étape {currentStep} sur {steps.length}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = isStepComplete(step.id);
              const isActive = step.id === currentStep;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-navy-blue text-white border-2 border-navy-blue'
                        : isCompleted
                          ? 'bg-green-100 text-green-600 border-2 border-green-200'
                          : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}>
                      {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${
                      isActive ? 'text-navy-blue' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-deep-navy mb-4">Informations personnelles</h2>
                  <p className="text-gray-600 mb-6">Veuillez fournir les informations de base du prospect</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                      placeholder="Prénom du prospect"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                      placeholder="Nom du prospect"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-deep-navy mb-4">Coordonnées</h2>
                  <p className="text-gray-600 mb-6">Informations de contact du prospect</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                      placeholder="Numéro de téléphone"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                      placeholder="Adresse email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                    placeholder="Adresse complète"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-deep-navy mb-4">Type d'assurance</h2>
                  <p className="text-gray-600 mb-6">Quel type d'assurance recherche le prospect ?</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {insuranceTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, insuranceType: type.value }))}
                      className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        formData.insuranceType === type.value
                          ? 'border-navy-blue bg-navy-blue bg-opacity-5 text-navy-blue'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-deep-navy mb-4">Détails de la demande</h2>
                  <p className="text-gray-600 mb-6">Budget et besoins spécifiques du prospect</p>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget mensuel souhaité (FCFA)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                    placeholder="Budget mensuel"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Besoins prioritaires
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {needsOptions.map((need) => (
                      <button
                        key={need.value}
                        type="button"
                        onClick={() => toggleNeed(need.value)}
                        className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                          formData.needs.includes(need.value)
                            ? 'border-navy-blue bg-navy-blue bg-opacity-5 text-navy-blue'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {need.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-deep-navy mb-4">Rendez-vous</h2>
                  <p className="text-gray-600 mb-6">Planifiez le rendez-vous avec le prospect</p>
                </div>

                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Date du rendez-vous
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lieu du rendez-vous
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="flex-1 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-center"
                    >
                      <MapPin size={20} className="mr-2" />
                      Géolocalisation
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCustomAddress(!showCustomAddress)}
                      className="flex-1 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-center"
                    >
                      <Map size={20} className="mr-2" />
                      Adresse personnalisée
                    </button>
                  </div>

                  {showCustomAddress && (
                    <div className="mt-4">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse du rendez-vous
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors"
                        placeholder="Entrez l'adresse du rendez-vous"
                      />
                    </div>
                  )}

                  {locationInfo && (
                    <div className="mt-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2">Position actuelle capturée :</h4>
                        <p className="text-sm text-gray-700">Latitude: {locationInfo.latitude.toFixed(6)}</p>
                        <p className="text-sm text-gray-700">Longitude: {locationInfo.longitude.toFixed(6)}</p>
                        <p className="text-sm text-gray-700 mt-1">Précision: {locationInfo.accuracy} mètres</p>
                      </div>

                      {/* Carte OpenStreetMap intégrée */}
                      <div className="mt-4">
                        <h4 className="font-medium text-blue-800 mb-2">Emplacement sur la carte :</h4>
                        <iframe
                          width="100%"
                          height="250"
                          style={{ border: 0, borderRadius: '0.5rem' }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationInfo.longitude-0.01}%2C${locationInfo.latitude-0.01}%2C${locationInfo.longitude+0.01}%2C${locationInfo.latitude+0.01}&layer=mapnik&marker=${locationInfo.latitude}%2C${locationInfo.longitude}`}
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="border-t border-gray-200 p-6 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-deep-navy hover:bg-gray-50'
              }`}
            >
              <ArrowLeft size={18} className="mr-2" />
              Précédent
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepComplete(currentStep)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isStepComplete(currentStep)
                    ? 'bg-navy-blue text-white hover:bg-blue-900'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Suivant
                <ArrowRight size={18} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-navy-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors"
              >
                Créer le prospect
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProspectionForm;