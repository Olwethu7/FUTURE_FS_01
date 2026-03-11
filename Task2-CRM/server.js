const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

// Path to leads.json
const leadsFile = path.join(__dirname, 'leads.json');

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

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
