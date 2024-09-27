# obookgroove - Frontend

obookgroove est une application Single Page (SPA) permettant de suggérer des livres en fonction des goûts musicaux des utilisateurs, basés sur leurs playlists Spotify.

## Description du Projet

Ce projet constitue la partie **front-end** de l'application **obookgroove**. Il repose sur **React** pour construire l'interface utilisateur, et **Redux** pour gérer l'état global de l'application. Le but est de créer une expérience interactive en associant musique et littérature via les données de l'API Spotify. Il faut donc l'utiliser en deploiement de la partie **back-end**.

## Fonctionnalités principales

- Recommandations de livres basées sur les playlists Spotify des utilisateurs
- Visualisation et gestion des livres favoris
- Interface utilisateur réactive
- Authentification utilisateur

## Lancement du projet

1. Cloner le dépôt :

   git clone <url-SSH-du-dépôt-front>

2. Installer les dépendances :

   pnpm install

3. Créer un fichier `.env` à la racine du projet avec les variables suivantes :

   VITE_API_URL=http://localhost:4000  
   VITE_RECAPTCHA_SITE_KEY='cecapcha-site-key'

4. Lancer le serveur de développement :

   npm run dev

L'application sera accessible à l'adresse `http://localhost:5173`.

## Technologies utilisées

- **React**
- **Redux**
- **Vite**
- **Axios**
