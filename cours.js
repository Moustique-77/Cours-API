// const express = require('express'); // Importation du module express
// const app = express(); // Création de l'application express

// // On définit la route racine "/"
// app.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>Accueil</h1>'); // On envoie la réponse au client
// });

// // On définit la route "/contact"
// app.get('/contact', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1>Contact</h1>');
// });

// // On définit la route "/api/users"
// app.get('/users', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end("<h1>Users</h1>");
// });

// app.get("/page/:numPage/", (req, res) => {
//     let page = req.params.numPage; // On récupère le paramètre "numPage" de la route
//     page = parseInt(page);
//     let valide = Number.isInteger(page); 

//     if (valide) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end("<h1>Page " + page + "</h1>");
//     }
//     else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.end("<h1>Page not found, need a int input</h1>");
//     }
// });

// app.listen(3000, () => { // On écoute les connexions arrivant sur le port 3000
//     console.log('Serveur lancé sur le port 3000'); // On affiche un message dans la console pour indiquer le démarrage du serveur
// })