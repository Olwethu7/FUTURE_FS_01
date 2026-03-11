const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const leadsFile = path.join(__dirname, 'leads.json');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // serve frontend files

// Helper to read leads
function readLeads() {
    if (!fs.existsSync(leadsFile)) return [];
    const data = fs.readFileSync(leadsFile);
    return JSON.parse(data || '[]');
}

// Helper to write leads
function writeLeads(leads) {
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
}

// GET all leads
app.get('/api/leads', (req, res) => {
    res.json(readLeads());
});

// POST a new lead
app.post('/api/leads', (req, res) => {
    const leads = readLeads();
    const newLead = req.body;
    newLead.id = Date.now(); // unique id
    leads.push(newLead);
    writeLeads(leads);
    res.json(newLead);
});

// PUT / Update lead
app.put('/api/leads/:id', (req, res) => {
    const leads = readLeads();
    const id = parseInt(req.params.id);
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ error: 'Lead not found' });

    leads[index] = { ...leads[index], ...req.body };
    writeLeads(leads);
    res.json(leads[index]);
});

// DELETE lead
app.delete('/api/leads/:id', (req, res) => {
    const leads = readLeads();
    const id = parseInt(req.params.id);
    const newLeads = leads.filter(l => l.id !== id);
    writeLeads(newLeads);
    res.json({ message: 'Lead deleted' });
});

// Serve frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
