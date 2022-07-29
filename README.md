Projet 7 - Groupomania
Formation développeur web 

INSTALLATION

Prérequis :

-Git : https://git-scm.com/downloads

-Node.js : https://nodejs.org/en/

-MySql : https://dev.mysql.com/downloads/installer/

Créer un dossier vide puis cloner ce repository à l'intérieur.

Le projet requiert la connection à une base de donnée MYSQL. Pour cela, créez une base de donnée "groupomania" et importez-y le fichier ./backend/groupomania.sql contenant les tables du projet. Au besoin, il faut également modifier le fichier .env dans le dossier "backend" afin d'y inclure vos propres identifiants de connexion à la base de donnée.

BACK END

Ouvrir un terminal dans le dossier backend puis effectuer les lignes de commandes suivantes :

npm install
nodemon server
FRONT END

Ouvrir un autre terminal dans le dossier frontend puis effectuer les lignes de commandes suivantes :

npm install

npm run serve

Ouvrir le navigateur a l'adresse http://localhost:8080/
