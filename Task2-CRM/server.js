const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve frontend files from Task2-CRM
app.use(express.static(path.join(__dirname, 'Task2-CRM')));

const leadsFile = path.join(__dirname, 'Task2-CRM/leads.json');

// GET all leads
app.get('/api/leads', (req, res) => {
    fs.readFile(leadsFile, (err, data) => {
        if (err) return res.status(500).send(err);
        const leads = JSON.parse(data);
        res.json(leads);
    });
});

// POST a new lead
app.post('/api/leads', (req, res) => {
    fs.readFile(leadsFile, (err, data) => {
        if (err) return res.status(500).send(err);
        const leads = JSON.parse(data);
        leads.push(req.body);
        fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Lead added successfully!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
