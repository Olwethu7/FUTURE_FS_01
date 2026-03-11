const leadForm = document.getElementById('leadForm');
const leadsTable = document.getElementById('leadsTable').getElementsByTagName('tbody')[0];

// Set backend URL: use live Render URL for deployment
const LOCAL_URL = 'http://localhost:3000/api/leads';
const LIVE_URL = 'https://future-fs-01-5in3.onrender.com/api/leads';

// Choose which URL to use
// Change this to LIVE_URL when you deploy
const API_URL = LIVE_URL;  // or LOCAL_URL for local testing
const API_URL = '/api/leads';  // works both locally and on Render

// Load leads from backend on page load
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        data.forEach(addLeadToTable);
    })
    .catch(err => console.error('Error fetching leads:', err));

// Handle form submission
leadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const lead = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        source: document.getElementById('source').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };

    // Send to backend
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
    })
    .then(res => res.json())
    .then(data => {
        addLeadToTable(lead);
        leadForm.reset();
    })
    .catch(err => console.error('Error adding lead:', err));
});

// Add lead to table
function addLeadToTable(lead) {
    const row = leadsTable.insertRow();
    row.insertCell(0).innerText = lead.name;
    row.insertCell(1).innerText = lead.email;
    row.insertCell(2).innerText = lead.source;
    row.insertCell(3).innerText = lead.status;
    row.insertCell(4).innerText = lead.notes;
}
