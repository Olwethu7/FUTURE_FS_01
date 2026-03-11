const leadForm = document.getElementById('leadForm');
const leadsTable = document.getElementById('leadsTable').getElementsByTagName('tbody')[0];

const API_URL = '/api/leads'; // works locally and on Render

// Load existing leads
fetch(API_URL)
    .then(res => res.json())
    .then(data => data.forEach(addLeadToTable))
    .catch(err => console.error('Error fetching leads:', err));

// Handle form submit
leadForm.addEventListener('submit', e => {
    e.preventDefault();
    const lead = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        source: document.getElementById('source').value || 'N/A',
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
    })
    .then(res => res.json())
    .then(() => {
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
