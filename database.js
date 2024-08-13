const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do SQLite
const db = new sqlite3.Database(path.join(__dirname, '../database/database.db'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Criação da tabela se não existir
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)");
});

// Rota para armazenar os dados
app.post('/store-data', (req, res) => {
    const { name, email, message } = req.body;
    db.run("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)", [name, email, message], (err) => {
        if (err) {
            return res.status(500).send("Erro ao armazenar os dados.");
        }
        res.send("Dados armazenados com sucesso.");
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
