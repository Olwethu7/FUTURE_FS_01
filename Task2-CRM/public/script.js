const API = "/api/leads";
const table = document.getElementById("leadsTable");

// Load leads
async function loadLeads() {
  const res = await fetch(API);
  const data = await res.json();
  table.innerHTML = "";
  data.forEach(addRow);
}

// Add lead
document.getElementById("leadForm").addEventListener("submit", async e => {
  e.preventDefault();

  const lead = {
    name: name.value,
    email: email.value,
    status: status.value,
    source: source.value,
    notes: notes.value
  };

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(lead)
  });

  loadLeads();
});

// Add row
function addRow(lead) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${lead.name}</td>
    <td>${lead.email}</td>
    <td>
      <select onchange="updateStatus(${lead.id}, this.value)">
        <option ${lead.status==='new'?'selected':''}>new</option>
        <option ${lead.status==='contacted'?'selected':''}>contacted</option>
        <option ${lead.status==='converted'?'selected':''}>converted</option>
      </select>
    </td>
    <td>${lead.source}</td>
    <td>
      <button onclick="deleteLead(${lead.id})">Delete</button>
    </td>
  `;

  table.appendChild(row);
}

// Delete
async function deleteLead(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadLeads();
}

// Update
async function updateStatus(id, status) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ status })
  });
}

loadLeads();
