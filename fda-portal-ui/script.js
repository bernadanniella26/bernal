const cases = [
  {
    caseNo: '3000014474085',
    caseName: 'Initial: HEALTHY ORGANICS MERCHANDISING CORP - Distributor',
    process: 'License To Operate v2.0',
    task: 'Renewal/Reissuance',
    sentBy: 'Records Officer',
    dueDate: '2028-02-25',
    lastModify: '2025-04-25',
    priority: 'Normal',
    category: 'License',
  },
  {
    caseNo: '3000014474086',
    caseName: 'Initial: HEALTHY ORGANICS MERCHANDISING CORP - Warehouse',
    process: 'License To Operate v2.0',
    task: 'Review',
    sentBy: 'Clerk',
    dueDate: '2025-10-01',
    lastModify: '2025-04-27',
    priority: 'High',
    category: 'License',
  },
  {
    caseNo: '3000014475012',
    caseName: 'Reissuance: ABC Pharma Inc.',
    process: 'Renewal/Reissuance',
    task: 'Initial Check',
    sentBy: 'Records Officer',
    dueDate: '2025-08-30',
    lastModify: '2025-05-02',
    priority: 'Low',
    category: 'Renewal',
  },
];

const state = {
  sortKey: 'dueDate',
  sortDir: 'asc',
  query: '',
  category: 'All Categories',
  process: 'All Processes',
};

const elements = {
  tbody: document.querySelector('#casesTable tbody'),
  rowTemplate: document.getElementById('rowTemplate'),
  searchInput: document.getElementById('searchInput'),
  categorySelect: document.getElementById('categorySelect'),
  processSelect: document.getElementById('processSelect'),
  headers: document.querySelectorAll('#casesTable thead th[data-sort]'),
  sidebar: document.getElementById('sidebar'),
  toggleSidebarBtn: document.getElementById('toggleSidebarBtn'),
};

function render() {
  const filtered = cases
    .filter((c) =>
      state.category === 'All Categories' ? true : c.category === state.category
    )
    .filter((c) =>
      state.process === 'All Processes' ? true : c.process === state.process
    )
    .filter((c) => {
      const q = state.query.trim().toLowerCase();
      if (!q) return true;
      return (
        c.caseNo.toLowerCase().includes(q) ||
        c.caseName.toLowerCase().includes(q) ||
        c.process.toLowerCase().includes(q) ||
        c.task.toLowerCase().includes(q) ||
        c.sentBy.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const dir = state.sortDir === 'asc' ? 1 : -1;
      const va = a[state.sortKey];
      const vb = b[state.sortKey];
      if (state.sortKey.includes('Date')) {
        return (new Date(va) - new Date(vb)) * dir;
      }
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });

  elements.tbody.innerHTML = '';
  for (const row of filtered) {
    const tr = elements.rowTemplate.content.firstElementChild.cloneNode(true);
    for (const cell of tr.querySelectorAll('[data-key]')) {
      const key = cell.getAttribute('data-key');
      let value = row[key];
      if (key.endsWith('Date')) {
        value = new Date(value).toLocaleDateString();
      }
      cell.textContent = value;
    }
    elements.tbody.appendChild(tr);
  }
}

function setSort(key) {
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortKey = key;
    state.sortDir = 'asc';
  }
  render();
}

// Event bindings
for (const th of elements.headers) {
  th.addEventListener('click', () => setSort(th.dataset.sort));
}

elements.searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

elements.categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  render();
});

elements.processSelect.addEventListener('change', (e) => {
  state.process = e.target.value;
  render();
});

// Sidebar toggle for mobile
if (elements.toggleSidebarBtn) {
  elements.toggleSidebarBtn.addEventListener('click', () => {
    elements.sidebar.classList.toggle('open');
  });
}

// Seed initial state
render();