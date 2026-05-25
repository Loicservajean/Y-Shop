# # Y-Shop — Boutique E-Commerce Touhou

## Présentation du projet

Y-Shop est un projet de boutique e-commerce développé autour de l’univers Touhou Project. Le site permet aux utilisateurs de consulter des produits dérivés liés à la licence Touhou : jeux vidéo, mangas, figurines, peluches et autres objets de collection.

L’objectif principal du projet était de créer une application web full-stack complète avec :

* Un frontend dynamique
* Un backend Node.js / Express
* Une API REST
* Une gestion de produits
* Une organisation claire du code
* Une communication frontend/backend

Ce projet a été réalisé dans un cadre pédagogique afin de découvrir le fonctionnement réel d’une application web moderne.

---

# Objectifs du projet

Le projet avait plusieurs objectifs techniques et pédagogiques :

* Comprendre l’architecture frontend/backend
* Apprendre à utiliser Node.js et Express
* Créer une API REST
* Gérer des données produits
* Développer une interface utilisateur moderne
* Organiser un projet en équipe
* Découvrir les problématiques réelles du développement web

---

# Technologies utilisées

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## Gestion des données

* JSON

## Outils

* VS Code
* Git
* npm

---

# Structure du projet

## Frontend

Le frontend correspond à la partie visible du site.

### Structure :

```bash
frontend/
│
├── css/
├── js/
├── Image/
├── pages/
├── package.json
├── server.js
└── start.bat
```

### CSS

Le dossier `css` contient les styles du site.

Exemples :

* `cart.css` → style du panier
* `favori.css` → style des favoris
* `product.css` → style des produits
* `style.css` → style général

Cette séparation permet une meilleure organisation du projet.

### JavaScript

Le dossier `js` contient la logique côté client.

Exemples :

* `cart.js` → gestion du panier
* `catalogue.js` → affichage des produits
* `favorites.js` → gestion des favoris
* `product.js` → affichage produit

JavaScript permet de rendre le site dynamique.

### Pages HTML

Le dossier `pages` contient les différentes pages du site :

* `index.html`
* `cart.html`
* `favorites.html`
* `product.html`

Chaque page possède une fonctionnalité spécifique.

---

# Backend

Le backend gère les données et la communication avec le frontend.

## Structure :

```bash
backend/
│
├── controller/
├── router/
├── app.js
├── data.json
└── package.json
```

## Controller

Le dossier `controller` contient la logique métier.

Le fichier :

* `products.js`

permet de traiter les requêtes liées aux produits.

## Router

Le dossier `router` contient les routes de l’API.

Exemple :

* récupération des produits
* gestion des requêtes HTTP

## app.js

Le fichier `app.js` lance le serveur Express.

Il représente le point d’entrée principal du backend.

## data.json

Les produits sont stockés dans un fichier JSON.

Cette solution a été choisie pour simplifier la gestion des données dans le cadre d’un projet étudiant.

---

# Fonctionnalités principales

## Catalogue produits

Le site permet d’afficher différents produits Touhou.

## Page produit

Chaque produit possède une page dédiée avec :

* image
* description
* informations produit

## Panier

Le panier permet :

* d’ajouter des produits
* de supprimer des produits
* de modifier les quantités

## Favoris

Les utilisateurs peuvent enregistrer des produits favoris.

## Gestion du stock

Le système peut gérer les quantités disponibles.

## Communication API

Le frontend communique avec le backend grâce à des requêtes HTTP.

Exemples :

* GET → récupérer des produits
* POST → envoyer des données
* DELETE → supprimer des données

---

# Fonctionnement général

Le frontend envoie des requêtes HTTP vers le backend grâce à une API REST.

Le backend traite les requêtes, récupère les données depuis `data.json`, puis renvoie une réponse au frontend.

Architecture simplifiée :

```text
Frontend → API REST → Backend → JSON
```

Cette séparation permet de garder un projet plus organisé et plus facile à maintenir.

---

# Difficultés rencontrées

## Communication frontend/backend

La connexion entre le frontend et le backend a demandé plusieurs tests.

## Gestion des routes

La création des routes Express nécessitait une bonne organisation.

## Structure du projet

Il fallait séparer correctement les fichiers pour garder un code propre.

## Travail en équipe

Le projet demandait une bonne coordination entre les membres du groupe.

Ces difficultés nous ont permis de progresser techniquement.

---

# Ce que nous avons appris

Grâce à ce projet, nous avons appris :

* le fonctionnement d’une API REST
* l’utilisation de Node.js et Express
* la communication frontend/backend
* l’organisation d’un projet full-stack
* le travail en équipe
* la structure d’une application web moderne

---

# Améliorations possibles

Plusieurs améliorations pourraient être ajoutées :

* système de connexion utilisateur
* base de données MongoDB ou MySQL
* système de paiement
* panneau administrateur
* authentification sécurisée
* responsive design avancé
* recherche et filtres dynamiques

---

# Conclusion

Y-Shop est un projet e-commerce complet développé autour de l’univers Touhou.

Ce projet nous a permis de découvrir le développement web full-stack et le fonctionnement d’une architecture moderne frontend/backend.

Il nous a également permis d’acquérir une expérience concrète proche d’un véritable projet professionnel.

---

# Équipe du projet

Projet réalisé par :

* Nico
* Loïc
* [Ton nom]

---

# Lancer le projet

## Installation

```bash
npm install
```

## Lancer le backend

```bash
node app.js
```

## Lancer le frontend

```bash
start.bat
```

---

# Licence

Projet pédagogique réalisé dans un cadre scolaire.

