# 3A Conseils - Prospector

Application de prospection et de gestion de prospects pour les commerciaux en assurance.

## Description

3A Conseils - Prospector est une application web moderne conçue pour aider les commerciaux en assurance à gérer efficacement leurs prospects, à simuler des offres d'assurance et à suivre leurs activités en temps réel.

## Fonctionnalités

- **Authentification sécurisée** : Système de connexion et d'inscription pour les commerciaux
- **Dashboard commercial** : Résumé des performances, rendez-vous du jour et prospects récents
- **Prospection** : Formulaire de création de prospect avec interface par étapes (stepper)
- **Simulateur d'assurance** : Comparateur d'offres interactif avec différentes options
- **Suivi des prospects** : Liste des prospects avec statuts colorés et filtres
- **Système de notes** : Pour chaque visite et interaction

## Design & UI/UX

- Interface moderne et épurée inspirée de Linear, Stripe ou Revolut
- Palette de couleurs professionnelle : Navy (#1e3a8a) et Or (#d4af37)
- Typographie avec Inter et Plus Jakarta Sans
- Interactions élégantes avec transitions douces
- Design responsive pour mobile, tablette et desktop

## Technologies utilisées

- **React.js** : Framework JavaScript pour l'interface utilisateur
- **Vite** : Outil de build rapide pour React
- **Tailwind CSS** : Framework CSS utilitaire pour le design
- **Lucide React** : Icônes vectorielles légères
- **React Hooks** : Gestion d'état côté client

## Structure du projet

```
src/
├── components/           # Composants réutilisables
│   ├── Layout.jsx       # Mise en page avec sidebar
│   ├── AuthPage.jsx     # Page d'authentification
│   ├── Dashboard.jsx    # Tableau de bord
│   ├── ProspectionForm.jsx # Formulaire de prospection
│   ├── SimulationComponent.jsx # Simulateur d'assurance
│   ├── ProspectTracking.jsx # Suivi des prospects
│   └── Skeleton.jsx     # Composants de chargement
├── App.jsx              # Composant principal
└── main.jsx             # Point d'entrée de l'application
```

## Installation

1. Clonez le repository
2. Exécutez `npm install` pour installer les dépendances
3. Exécutez `npm run dev` pour démarrer le serveur de développement

## Démarrage rapide

```bash
npm install
npm run dev
```

L'application sera accessible à l'adresse http://localhost:5173

## Caractéristiques techniques

- **Design responsive** : Optimisé pour tous les écrans
- **Chargement par étapes** : Interface de prospection en plusieurs étapes
- **Système de simulation** : Comparateur d'offres d'assurance
- **Indicateurs de statut** : Couleurs codées pour les statuts des prospects
- **Animations subtiles** : Transitions douces pour une expérience utilisateur fluide
- **Skeleton screens** : Écrans de chargement pour une meilleure UX