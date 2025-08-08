// FDA Portal JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateDateTime();
    initializeTableFeatures();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Sidebar menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', handleMenuItemClick);
    });

    // Select all checkbox
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }

    // Individual row checkboxes
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleRowSelection);
    });

    // Filter dropdowns
    const filterSelects = document.querySelectorAll('.form-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilterChange);
    });

    // Search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Case number links
    const caseNumbers = document.querySelectorAll('.case-number');
    caseNumbers.forEach(caseNumber => {
        caseNumber.addEventListener('click', handleCaseClick);
    });

    // Pagination buttons
    const paginationButtons = document.querySelectorAll('.btn-pagination');
    paginationButtons.forEach(button => {
        button.addEventListener('click', handlePagination);
    });
}

// Handle sidebar menu item clicks
function handleMenuItemClick(event) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    
    const menuText = event.currentTarget.textContent.trim();
    console.log(`Selected menu: ${menuText}`);
    
    // Here you would typically load different data based on the menu selection
    // For demonstration, we'll just show an alert
    showNotification(`Loaded ${menuText} view`);
}

// Handle select all checkbox
function handleSelectAll(event) {
    const isChecked = event.target.checked;
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
    
    updateSelectedCount();
}

// Handle individual row selection
function handleRowSelection() {
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    const selectAllCheckbox = document.getElementById('select-all');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = checkedBoxes.length === rowCheckboxes.length;
        selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < rowCheckboxes.length;
    }
    
    updateSelectedCount();
}

// Update selected count display
function updateSelectedCount() {
    const checkedBoxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    if (checkedBoxes.length > 0) {
        showNotification(`${checkedBoxes.length} item(s) selected`);
    }
}

// Handle filter changes
function handleFilterChange(event) {
    const filterType = event.target.id;
    const selectedValue = event.target.value;
    
    console.log(`Filter changed: ${filterType} = ${selectedValue}`);
    
    // Apply filter to table
    filterTable(filterType, selectedValue);
}

// Filter table based on criteria
function filterTable(filterType, value) {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        let shouldShow = true;
        
        if (value && value !== 'All Categories' && value !== 'All Processes') {
            switch (filterType) {
                case 'category-select':
                    // This would filter by category if we had that data
                    break;
                case 'process-select':
                    const processCell = row.cells[5]; // Process column
                    if (processCell && !processCell.textContent.includes(value)) {
                        shouldShow = false;
                    }
                    break;
                case 'actions-select':
                    // This would handle actions like Read/Unread
                    break;
            }
        }
        
        row.style.display = shouldShow ? '' : 'none';
    });
}

// Handle search input
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const shouldShow = rowText.includes(searchTerm);
        row.style.display = shouldShow ? '' : 'none';
    });
}

// Handle case number clicks
function handleCaseClick(event) {
    event.preventDefault();
    const caseNumber = event.target.textContent;
    showNotification(`Opening case: ${caseNumber}`);
    
    // Here you would typically open a case detail modal or navigate to a case page
    console.log(`Case clicked: ${caseNumber}`);
}

// Handle pagination
function handlePagination(event) {
    const buttonText = event.target.textContent;
    console.log(`Pagination clicked: ${buttonText}`);
    
    // Here you would implement actual pagination logic
    showNotification(`${buttonText} page requested`);
}

// Initialize table features
function initializeTableFeatures() {
    // Make table headers sortable
    const tableHeaders = document.querySelectorAll('th');
    tableHeaders.forEach((header, index) => {
        if (index > 0) { // Skip checkbox column
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => sortTable(index));
            
            // Add sort indicator
            const sortIcon = document.createElement('span');
            sortIcon.innerHTML = ' ↕️';
            sortIcon.style.fontSize = '10px';
            header.appendChild(sortIcon);
        }
    });
}

// Sort table by column
function sortTable(columnIndex) {
    const table = document.querySelector('.data-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    const header = table.querySelectorAll('th')[columnIndex];
    const isAscending = !header.classList.contains('sort-desc');
    
    // Reset all headers
    table.querySelectorAll('th').forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Set current header sort direction
    header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Try to parse as numbers first
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? aNum - bNum : bNum - aNum;
        }
        
        // Fall back to string comparison
        return isAscending ? 
            aValue.localeCompare(bValue) : 
            bValue.localeCompare(aValue);
    });
    
    // Reorder rows in table
    rows.forEach(row => tbody.appendChild(row));
    
    showNotification(`Table sorted by ${header.textContent.replace('↕️', '').trim()}`);
}

// Update date and time
function updateDateTime() {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        dateElement.textContent = formattedDate;
    }
}

// Show notification (simple implementation)
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 12px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Sample data for dynamic content (you can extend this)
const sampleCases = [
    {
        id: 145,
        caseNumber: "39000-14074690",
        caseName: "Medical Device Registration",
        company: "HEALTHTECH SOLUTIONS INC. - Medical Equipment",
        process: "Medical Device Registration",
        task: "Initial Review",
        sentBy: "Medical Officer",
        dueDate: "20/05/2028",
        lastModified: "28/04/2025",
        priority: "HIGH",
        status: "new"
    }
];

// Function to add new rows dynamically
function addNewCase(caseData) {
    const tbody = document.getElementById('table-body');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${caseData.id}</td>
        <td><span class="status-icon status-${caseData.status}">📄</span></td>
        <td class="case-number">${caseData.caseNumber}</td>
        <td class="case-name">
            <div>${caseData.caseName}</div>
            <div class="sub-text">${caseData.company}</div>
        </td>
        <td>${caseData.process}</td>
        <td>${caseData.task}</td>
        <td>${caseData.sentBy}</td>
        <td>${caseData.dueDate}</td>
        <td>${caseData.lastModified}</td>
        <td class="priority-${caseData.priority.toLowerCase()}">${caseData.priority}</td>
    `;
    
    tbody.appendChild(row);
    
    // Add event listeners for the new row
    const checkbox = row.querySelector('input[type="checkbox"]');
    const caseNumber = row.querySelector('.case-number');
    
    checkbox.addEventListener('change', handleRowSelection);
    caseNumber.addEventListener('click', handleCaseClick);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl+A to select all
    if (event.ctrlKey && event.key === 'a') {
        event.preventDefault();
        const selectAllCheckbox = document.getElementById('select-all');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = true;
            handleSelectAll({ target: selectAllCheckbox });
        }
    }
    
    // ESC to deselect all
    if (event.key === 'Escape') {
        const selectAllCheckbox = document.getElementById('select-all');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
            handleSelectAll({ target: selectAllCheckbox });
        }
    }
});

console.log('FDA Portal system initialized successfully!');