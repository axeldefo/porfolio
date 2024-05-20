README - Backend
Description

Ce dépôt contient le code source du backend de l'application. Le backend est développé en utilisant Express.js et MongoDB, avec un développement en JavaScript.
Prérequis

Avant de pouvoir exécuter l'application localement, assurez-vous d'avoir installé Node.js sur votre machine.
Configuration de la base de données

    Assurez-vous d'avoir un serveur MongoDB en cours d'exécution sur votre machine ou d'accéder à un serveur MongoDB distant.
    Créez un fichier .env à la racine du projet.
    Remplissez les informations suivantes dans le fichier .env :

     URI='mongodb://local...' (lien vers la base de données mongodb)
      PORT=3000 (port d'ecoute. si différent de 3000, pensez à modifier la valeur dans le fichier vite.config (frontend)
      ACCESS_SECRET=
      REFRESH_SECRET= 
      ACCESS_EXPIRY=50d  (duree de vie de l'access token)
      ROUND = '10'

Installation

    Clonez ce dépôt sur votre machine locale.
    Accédez au répertoire du projet dans votre terminal.
    Exécutez la commande suivante pour installer les dépendances :

    pnpm install

Lancement de l'application

Une fois que la configuration de la base de données est terminée, vous pouvez démarrer l'application en exécutant la commande suivante :

nodemon --env-file=.env server.js

Le serveur backend sera démarré et sera accessible à l'adresse : http://localhost:PORT.
Manipulation des données

Avant de pouvoir utiliser l'application frontend, vous devez insérer les données de base dans la base de données MongoDB. Vous pouvez utiliser les routes API fournies pour effectuer différentes opérations de manipulation des données :

    Insérer la description de l'auteur
    Insérer les différents parcours
    Insérer les projets
    Insérer les utilisateurs
    Insérer les compétences

Les routes correspondantes sont disponibles dans le fichier REST.http avec les requis (entêtes et corps) il ne vous reste qu'à exécuter pour remplir la base de données. Assurez-vous de vous authentifier en utilisant un jeton d'accès valide pour exécuter ces opérations.

Une fois toutes les données insérées, vous pouvez passer à l'exécution de l'application frontend.
