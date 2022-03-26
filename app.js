const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/css', express.static(path.join(__dirname + '/css')));
app.use('/icon', express.static(path.join(__dirname + '/icon')));
app.use('/js', express.static(path.join(__dirname + '/js')));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "ednevnik"
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
});

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
});

app.get('/table.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/table.html'));
});

app.get('/download.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/download.html'));
});

app.get('/predmet/:id_predmeta', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Connected as id: ${connection.threadId}`)

        connection.query("SELECT ucenici.ime_ucenika, ucenici.prezime_ucenika, predmeti.naziv_predmeta, ocjena.ocjene FROM ((ocjena INNER JOIN ucenici ON ocjena.id_ucenika = ucenici.id_ucenika) INNER JOIN predmeti ON ocjena.id_predmeta = predmeti.id_predmeta) WHERE predmeti.id_predmeta = ? ORDER BY ucenici.id_ucenika", [req.params.id_predmeta], (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/ucenik/:id_ucenika', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Connected as id: ${connection.threadId}`)

        connection.query("SELECT ucenici.ime_ucenika, ucenici.prezime_ucenika, predmeti.naziv_predmeta, ocjena.ocjene FROM ((ocjena INNER JOIN ucenici ON ocjena.id_ucenika = ucenici.id_ucenika) INNER JOIN predmeti ON ocjena.id_predmeta = predmeti.id_predmeta) WHERE ucenici.id_ucenika = ? ORDER BY predmeti.redni_broj", [req.params.id_ucenika], (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/prosjek', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Connected as id: ${connection.threadId}`)

        connection.query("SELECT ucenici.id_ucenika, ocjena.ocjene FROM ((ocjena INNER JOIN ucenici ON ocjena.id_ucenika = ucenici.id_ucenika) INNER JOIN predmeti ON ocjena.id_predmeta = predmeti.id_predmeta) ORDER BY ucenici.id_ucenika, predmeti.redni_broj;", (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

app.listen(port, () => console.log(`Listening on port: ${port}`))