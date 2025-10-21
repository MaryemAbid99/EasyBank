# EasyBank – Full Stack Application

**EasyBank** est une application web complète composée d’un **backend NestJS** et d’un **frontend Next.js**.  
Elle permet la **gestion des utilisateurs et des articles** avec authentification **JWT** et gestion des **rôles (Admin / User)**.

---

## Rôles et autorisations

- **Admin** : peut créer, modifier, supprimer et publier des articles.  
- **User** : peut consulter uniquement les articles publiés.

### Gestion des rôles

- Lors de l’inscription, chaque utilisateur est créé avec le rôle **USER** par défaut.  
- Le rôle **ADMIN** n’est **pas attribuable via l’application** ; il doit être modifié **manuellement dans la base de données**, par exemple :

```sql
UPDATE user SET role = 'ADMIN' WHERE email = 'example@email.com';
Setup Instructions
1. Backend Setup (NestJS)
cd backend
npm install
Configuration du fichier .env
Créer un fichier .env dans le dossier backend/ contenant :
DATABASE_URL=postgresql://user:password@localhost:5432/easybank
JWT_SECRET=your_secret_key
PORT=3000
Remplace user et password par tes identifiants PostgreSQL.
Mise en place de la base de données
Si tu utilises Docker :
docker-compose up -d
Sinon, crée la base manuellement :
CREATE DATABASE easybank;
Lancer le serveur backend
npm run start:dev
Le backend tourne sur http://localhost:3000

2. Frontend Setup (Next.js)
Installation des dépendances
cd ../frontend
npm install
Configuration du fichier .env.local

Créer un fichier .env.local dans le dossier frontend/ contenant :
NEXT_PUBLIC_API_URL=http://localhost:3000
Lancer le frontend
npm run dev
Le frontend tourne sur http://localhost:3001
Structure du projet
EASYBANK/
│
├── backend/               # API NestJS
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/              # Application Next.js
│   ├── src/
│   ├── .env.local
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml     # Lancement de la base PostgreSQL
└── README.md              # Documentation principale
Technologies utilisées
| Côté             | Technologies principales    |
| ---------------- | --------------------------- |
| Frontend         | Next.js, TypeScript, Axios  |
| Backend          | NestJS, TypeORM, PostgreSQL |
| Authentification | JWT                         |
| Déploiement      | Docker                      |
| UI               | CSS simple et responsive    |
Fonctionnalités principales
Authentification JWT (login / register)

Gestion des rôles : Admin / User

CRUD complet des articles

Publication / dépublication d’articles

Protection des routes selon le rôle

Connexion frontend-backend via API REST
Installation rapide (pour tester)
# Cloner le dépôt
git clone https://github.com/MaryemAbid99/easybank.git
cd easybank

# Lancer le backend
cd backend
npm install
npm run start:dev

# Lancer le frontend
cd ../frontend
npm install
npm run dev
Auteur

Maryem Abid
Email : Maryem1999abid@gmail.com

GitHub : MaryemAbid99
