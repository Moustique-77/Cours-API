const express = require('express'); // Importation du module express
const app = express(); // Création de l'application express

const mariadb = require('mariadb');
let cors = require('cors');

require('dotenv').config();

const dbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

app.use(express.json());
app.use(cors());

app.get('/question', async(req, res) => {
    let conn;
    try {
        conn = await dbPool.getConnection();
        const rows = await conn.query("SELECT * FROM questions");
        res.status(200).json(rows);
    } 
    catch (err) {
        throw err;
    }
});

app.get('/question/:id', async(req, res) => {
    let conn;
    try {
        conn = await dbPool.getConnection();
        const rows = await conn.query("SELECT * FROM questions WHERE id = ?", [req.params.id]);
        res.status(200).json(rows);
    } catch (err) {
        throw err;
    }
});

app.post('/question', async (req, res) => {
    let conn;
    try {
        conn = await dbPool.getConnection();
        const { theme, question, reponse } = req.body; // Extraire les données de la requête.

        // Vérifier que les données sont présentes.
        if (!theme || !question || !reponse) {
            res.status(400).json({ message: "Tous les champs sont requis." });
            return;
        }
        // (?) = paramètre
        const result = await conn.query("INSERT INTO questions (theme, question, reponse) VALUES (?, ?, ?)", [theme, question, reponse]);
        res.status(200).json({ message: "Question ajoutée avec succès"});
    } catch (err) {
        res.status(500).json({ message: "Erreur du serveur", error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

app.put('/question/:id', async(req, res) => {
    let conn;
    try {
        conn = await dbPool.getConnection();
        const { theme, question, reponse } = req.body;
        if (!theme || !question || !reponse) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }
        const result = await conn.query("UPDATE questions SET theme = ?, question = ?, reponse = ? WHERE id = ?", [theme, question, reponse, req.params.id]);
        res.status(200).json({ message: "Question modifiée", affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ message: "Erreur du serveur", error: err.message });
    } finally {
        if (conn) conn.release();
    }
});


app.delete('/question/:id', async(req, res) => {
    let conn;
    try {
        conn = await dbPool.getConnection();
        const id = parseInt(req.params.id, 10);

        // Vérifier que l'ID est un nombre.
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        // (?) = paramètre
        const result = await conn.query("DELETE FROM questions WHERE id = ?", [id]);
        res.status(200).json({ message: "Question supprimée", affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ message: "Erreur du serveur", error: err.message });
    } finally {
        if (conn) conn.release();
    }
});


app.listen(3001, () => { // On écoute les connexions arrivant sur le port 3000
    console.log('Serveur lancé sur le port 3001'); // On affiche un message dans la console pour indiquer le démarrage du serveur
});