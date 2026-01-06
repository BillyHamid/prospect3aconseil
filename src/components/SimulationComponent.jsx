import React, { useState, useMemo } from 'react';
import {
  Shield,
  CreditCard,
  Star,
  Check,
  Clock,
  Car,
  Home,
  Heart,
  Bike,
  Award,
  Zap,
  ShieldCheck,
  Building2,
  Users,
  TrendingUp,
  MapPin
} from 'lucide-react';

const SimulationComponent = () => {
  const [selectedInsurance, setSelectedInsurance] = useState('auto');
  const [budget, setBudget] = useState(150000); // Montant en FCFA
  const [coverageLevel, setCoverageLevel] = useState('standard');

  const insuranceTypes = [
    { value: 'auto', label: 'Auto', icon: Car },
    { value: 'moto', label: 'Moto', icon: Bike },
    { value: 'sante', label: 'Santé', icon: Heart },
    { value: 'habitation', label: 'Habitation', icon: Home }
  ];

  const coverageLevels = [
    { value: 'basic', label: 'Basique', description: 'Couverture essentielle' },
    { value: 'standard', label: 'Standard', description: 'Meilleur rapport qualité/prix' },
    { value: 'premium', label: 'Premium', description: 'Couverture complète' }
  ];

  // Données des compagnies d'assurance du Burkina Faso
  const insuranceCompanies = [
    {
      id: 1,
      name: 'SUNU Assurances',
      logo: 'SA',
      rating: 4.7,
      founded: '1995',
      headquarters: 'Dakar, Sénégal'
    },
    {
      id: 2,
      name: 'NSIA Assurances',
      logo: 'NA',
      rating: 4.5,
      founded: '1985',
      headquarters: 'Abidjan, Côte d\'Ivoire'
    },
    {
      id: 3,
      name: 'Sahélienne Assurances',
      logo: 'SA',
      rating: 4.3,
      founded: '1990',
      headquarters: 'Ouagadougou, Burkina Faso'
    },
    {
      id: 4,
      name: 'Générale Assurances',
      logo: 'GA',
      rating: 4.4,
      founded: '1988',
      headquarters: 'Paris, France'
    },
    {
      id: 5,
      name: 'AXA Assurances',
      logo: 'AA',
      rating: 4.6,
      founded: '1985',
      headquarters: 'Paris, France'
    },
    {
      id: 6,
      name: 'Alliance Assurances',
      logo: 'AA',
      rating: 4.2,
      founded: '1992',
      headquarters: 'Lomé, Togo'
    }
  ];

  // Données des offres d'assurance selon le type et le niveau de couverture
  const getInsuranceOffers = (type, level) => {
    const offers = [];

    // Pour chaque compagnie, générer des offres selon le type et le niveau
    insuranceCompanies.forEach(company => {
      // Prix de base selon le type d'assurance
      let basePrice;
      switch(type) {
        case 'auto':
          basePrice = 80000;
          break;
        case 'moto':
          basePrice = 40000;
          break;
        case 'sante':
          basePrice = 100000;
          break;
        case 'habitation':
          basePrice = 60000;
          break;
        default:
          basePrice = 70000;
      }

      // Ajuster le prix selon le niveau de couverture
      let priceMultiplier;
      switch(level) {
        case 'basic':
          priceMultiplier = 0.8;
          break;
        case 'standard':
          priceMultiplier = 1.0;
          break;
        case 'premium':
          priceMultiplier = 1.4;
          break;
        default:
          priceMultiplier = 1.0;
      }

      // Générer des variations de prix pour chaque compagnie
      const variation = Math.random() * 0.3 + 0.85; // Entre 85% et 115%
      const finalPrice = Math.round(basePrice * priceMultiplier * variation);

      // Générer des caractéristiques spécifiques selon le type
      let features = [];
      switch(type) {
        case 'auto':
          features = [
            { name: 'Franchise', value: level === 'basic' ? '100 000 FCFA' : level === 'standard' ? '50 000 FCFA' : '25 000 FCFA', highlight: level !== 'basic' },
            { name: 'Assistance', value: level === 'basic' ? '50km' : '0km', highlight: level !== 'basic' },
            { name: 'Réparation', value: level === 'basic' ? '72h' : level === 'standard' ? '48h' : '24h', highlight: level === 'premium' },
            { name: 'Remorquage', value: level === 'basic' ? 'Payant' : 'Inclus', highlight: level !== 'basic' }
          ];
          break;
        case 'moto':
          features = [
            { name: 'Franchise', value: level === 'basic' ? '50 000 FCFA' : level === 'standard' ? '30 000 FCFA' : '15 000 FCFA', highlight: level !== 'basic' },
            { name: 'Vol', value: level === 'basic' ? 'Non' : 'Oui', highlight: level !== 'basic' },
            { name: 'Accident', value: level === 'basic' ? '70%' : level === 'standard' ? '85%' : '100%', highlight: level === 'premium' },
            { name: 'Casque', value: level === 'basic' ? 'Non' : 'Oui', highlight: level !== 'basic' }
          ];
          break;
        case 'sante':
          features = [
            { name: 'Consultation', value: level === 'basic' ? 'Payant' : level === 'standard' ? 'Remboursé' : 'Sans frais', highlight: level !== 'basic' },
            { name: 'Médecine douce', value: level === 'basic' ? 'Non' : level === 'standard' ? 'Partiel' : 'Complet', highlight: level !== 'basic' }
          ];
          break;
        case 'habitation':
          features = [
            { name: 'Incendie', value: level === 'basic' ? '50%' : level === 'standard' ? '75%' : '100%', highlight: level === 'premium' },
            { name: 'Vol', value: level === 'basic' ? 'Non' : 'Oui', highlight: level !== 'basic' },
            { name: 'Responsabilité civile', value: level === 'basic' ? '5 000 000 FCFA' : level === 'standard' ? '10 000 000 FCFA' : '20 000 000 FCFA', highlight: level === 'premium' },
            { name: 'Dégâts des eaux', value: level === 'basic' ? 'Non' : 'Oui', highlight: level !== 'basic' }
          ];
          break;
      }

      // Générer des badges selon le niveau
      let badges = [];
      switch(level) {
        case 'basic':
          badges = ['Essentiel'];
          break;
        case 'standard':
          badges = ['Meilleur rapport qualité/prix'];
          break;
        case 'premium':
          badges = ['Couverture complète', 'Service premium'];
          break;
      }

      offers.push({
        id: `${company.id}-${type}-${level}`,
        companyName: company.name,
        companyLogo: company.logo,
        companyRating: company.rating,
        price: finalPrice,
        features,
        badges,
        description: `Formule ${level.charAt(0).toUpperCase() + level.slice(1)} de ${company.name} pour ${type === 'auto' ? 'véhicule automobile' : type === 'moto' ? 'motocyclette' : type === 'sante' ? 'protection santé' : 'logement'}`,
        type,
        level
      });
    });

    return offers;
  };

  // Filtrer les offres selon le budget
  const allOffers = useMemo(() => {
    const offers = getInsuranceOffers(selectedInsurance, coverageLevel);
    return offers.filter(offer => offer.price <= budget);
  }, [selectedInsurance, coverageLevel, budget]);

  const InsuranceIcon = insuranceTypes.find(type => type.value === selectedInsurance)?.icon || Car;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-blue to-blue-700 p-8 text-white">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <Shield size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Simulateur d'assurance</h1>
              <p className="text-blue-100 mt-1">Comparez les offres de toutes les assurances du Burkina Faso</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-8 bg-white border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Insurance Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Type d'assurance
              </label>
              <div className="grid grid-cols-2 gap-3">
                {insuranceTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedInsurance(type.value)}
                      className={`p-4 border-2 rounded-2xl text-center transition-all duration-200 ${
                        selectedInsurance === type.value
                          ? 'border-navy-blue bg-navy-blue bg-opacity-10 text-navy-blue shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <Icon size={24} className="mx-auto mb-2" />
                      <div className="font-medium">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Budget mensuel: <span className="text-navy-blue font-bold">{budget.toLocaleString()} FCFA</span>
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-navy-blue"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>50 000 FCFA</span>
                  <span>500 000 FCFA</span>
                </div>
              </div>
            </div>

            {/* Coverage Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Niveau de couverture
              </label>
              <div className="space-y-3">
                {coverageLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setCoverageLevel(level.value)}
                    className={`w-full p-4 border-2 rounded-2xl text-left transition-all duration-200 ${
                      coverageLevel === level.value
                        ? 'border-navy-blue bg-navy-blue bg-opacity-10 text-navy-blue shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold text-lg">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Offres disponibles ({allOffers.length})</h2>
            <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {allOffers.length} offres trouvées dans votre budget
            </div>
          </div>

          {/* Insurance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {allOffers.length > 0 ? (
              allOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl bg-white"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-navy-blue to-blue-600 flex items-center justify-center mr-3 shadow-md">
                        <span className="text-white font-bold text-sm">{offer.companyLogo}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{offer.companyName}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star size={14} className="text-yellow-400 fill-current mr-1" />
                          <span>{offer.companyRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{offer.level}</div>
                      <div className="text-xs text-gray-500">{offer.type}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-navy-blue mb-2">
                      <CreditCard size={28} className="inline mr-2" />
                      {offer.price.toLocaleString()}
                      <span className="text-base font-normal text-gray-500">/mois</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {offer.features.map((feature, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 text-sm">{feature.name}</span>
                        <span className={`font-semibold text-sm ${
                          feature.highlight ? 'text-navy-blue' : 'text-gray-900'
                        }`}>
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {offer.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-blue text-white"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-navy-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Choisir cette offre
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Shield size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune offre disponible</h3>
                <p className="text-gray-600">Aucune assurance ne correspond à vos critères. Essayez d'ajuster votre budget ou vos préférences.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Résumé de votre simulation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-2">Type d'assurance</div>
            <div className="flex items-center">
              {(() => {
                const IconComponent = insuranceTypes.find(type => type.value === selectedInsurance)?.icon;
                return IconComponent ? <IconComponent size={24} className="text-navy-blue mr-3" /> : null;
              })()}
              <span className="font-bold text-lg text-gray-800">
                {insuranceTypes.find(type => type.value === selectedInsurance)?.label}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-2">Budget</div>
            <div className="flex items-center">
              <CreditCard size={24} className="text-navy-blue mr-3" />
              <span className="font-bold text-lg text-gray-800">{budget.toLocaleString()} FCFA/mois</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="text-sm text-gray-600 mb-2">Niveau</div>
            <div className="font-bold text-lg text-gray-800 capitalize">{coverageLevel}</div>
          </div>
          <div className="bg-gradient-to-r from-navy-blue to-blue-600 rounded-2xl p-6 text-white">
            <div className="text-sm text-blue-100 mb-2">Offres disponibles</div>
            <div className="flex items-center">
              <TrendingUp size={24} className="mr-3 text-yellow-300" />
              <span className="font-bold text-lg">{allOffers.length} choix</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Companies Info */}
      <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Compagnies d'assurance au Burkina Faso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insuranceCompanies.map(company => (
            <div key={company.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-navy-blue to-blue-600 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-white font-bold">{company.logo}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{company.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star size={14} className="text-yellow-400 fill-current mr-1" />
                    <span>{company.rating}/5</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  Siège: {company.headquarters}
                </div>
                <div className="flex items-center">
                  <Building2 size={14} className="mr-2" />
                  Créée en: {company.founded}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationComponent;