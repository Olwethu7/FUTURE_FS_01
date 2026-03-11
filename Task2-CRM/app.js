const leadForm = document.getElementById('leadForm');
const leadsTable = document.getElementById('leadsTable').getElementsByTagName('tbody')[0];

// Load leads from backend on page load
fetch('http://localhost:3000/api/leads')
    .then(res => res.json())
    .then(data => {
        data.forEach(addLeadToTable);
    });

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
    fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
    })
    .then(res => res.json())
    .then(data => {
        addLeadToTable(lead);
        leadForm.reset();
    });
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
