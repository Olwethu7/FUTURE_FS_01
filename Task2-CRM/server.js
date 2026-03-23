const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'leads.json');

// Read leads
function readLeads() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Write leads
function writeLeads(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all leads
app.get('/api/leads', (req, res) => {
  const leads = readLeads();
  res.json(leads);
});

// ADD lead
app.post('/api/leads', (req, res) => {
  const leads = readLeads();
  const newLead = {
    id: Date.now(),
    ...req.body
  };
  leads.push(newLead);
  writeLeads(leads);
  res.json(newLead);
});

// DELETE lead
app.delete('/api/leads/:id', (req, res) => {
  let leads = readLeads();
  leads = leads.filter(l => l.id != req.params.id);
  writeLeads(leads);
  res.json({ message: 'Deleted' });
});

// UPDATE status
app.put('/api/leads/:id', (req, res) => {
  let leads = readLeads();
  leads = leads.map(l =>
    l.id == req.params.id ? { ...l, ...req.body } : l
  );
  writeLeads(leads);
  res.json({ message: 'Updated' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
