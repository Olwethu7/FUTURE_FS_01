// Select form and table
const leadForm = document.getElementById('leadForm');
const leadsTable = document.getElementById('leadsTable').getElementsByTagName('tbody')[0];

// Array to store leads
let leads = [];

// Handle form submission
leadForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const source = document.getElementById('source').value;
    const status = document.getElementById('status').value;
    const notes = document.getElementById('notes').value;

    // Create lead object
    const lead = { name, email, source, status, notes };
    leads.push(lead);

    // Add lead to table
    addLeadToTable(lead);

    // Reset form
    leadForm.reset();
});

// Function to add a lead row in the table
function addLeadToTable(lead) {
    const row = leadsTable.insertRow();
    row.insertCell(0).innerText = lead.name;
    row.insertCell(1).innerText = lead.email;
    row.insertCell(2).innerText = lead.source;
    row.insertCell(3).innerText = lead.status;
    row.insertCell(4).innerText = lead.notes;
}
