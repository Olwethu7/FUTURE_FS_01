const leadForm = document.getElementById('leadForm');
const leadsTable = document.getElementById('leadsTable').getElementsByTagName('tbody')[0];
const searchInput = document.getElementById('search');

const API_URL = '/api/leads';
let leadsData = [];
let editId = null;

// Load leads
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        leadsData = data;
        renderTable(leadsData);
    });

// Add / Update lead
leadForm.addEventListener('submit', e => {
    e.preventDefault();
    const lead = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        source: document.getElementById('source').value || 'N/A',
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };

    if (editId) {
        // Update existing lead
        fetch(`${API_URL}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead)
        }).then(() => {
            const index = leadsData.findIndex(l => l.id === editId);
            leadsData[index] = { ...leadsData[index], ...lead };
            renderTable(leadsData);
        });
        editId = null;
        leadForm.querySelector('button').innerText = 'Add Lead';
    } else {
        // Add new lead
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead)
        })
        .then(res => res.json())
        .then(data => {
            leadsData.push(data);
            renderTable(leadsData);
        });
    }
    leadForm.reset();
});

// Render table
function renderTable(leads) {
    leadsTable.innerHTML = '';
    leads.forEach(addLeadToTable);
}

// Add lead row
function addLeadToTable(lead) {
    const row = leadsTable.insertRow();
    row.insertCell(0).innerText = lead.name;
    row.insertCell(1).innerText = lead.email;
    row.insertCell(2).innerText = lead.source;
    row.insertCell(3).innerText = lead.status;
    row.insertCell(4).innerText = lead.notes;

    const actionsCell = row.insertCell(5);

    const editBtn = document.createElement('button');
    editBtn.classList.add('action-btn', 'edit-btn');
    editBtn.innerText = 'Edit';
    editBtn.onclick = () => editLead(lead);
    actionsCell.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('action-btn', 'delete-btn');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => deleteLead(lead.id);
    actionsCell.appendChild(deleteBtn);
}

// Edit lead
function editLead(lead) {
    document.getElementById('name').value = lead.name;
    document.getElementById('email').value = lead.email;
    document.getElementById('source').value = lead.source;
    document.getElementById('status').value = lead.status;
    document.getElementById('notes').value = lead.notes;
    editId = lead.id;
    leadForm.querySelector('button').innerText = 'Update Lead';
}

// Delete lead
function deleteLead(id) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
        leadsData = leadsData.filter(l => l.id !== id);
        renderTable(leadsData);
    });
}

// Search/filter
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    renderTable(leadsData.filter(l =>
        l.name.toLowerCase().includes(query) ||
        l.email.toLowerCase().includes(query) ||
        l.status.toLowerCase().includes(query)
    ));
});
