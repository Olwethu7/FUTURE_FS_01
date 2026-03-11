const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const leadsFile = path.join(__dirname, 'leads.json');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // serve frontend files

// API Routes
app.get('/api/leads', (req, res) => {
    fs.readFile(leadsFile, (err, data) => {
        if (err) return res.status(500).send(err);
        const leads = JSON.parse(data || '[]');
        res.json(leads);
    });
});

app.post('/api/leads', (req, res) => {
    fs.readFile(leadsFile, (err, data) => {
        if (err) return res.status(500).send(err);
        const leads = JSON.parse(data || '[]');
        leads.push(req.body);
        fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Lead added successfully!' });
        });
    });
});

// Serve frontend index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
