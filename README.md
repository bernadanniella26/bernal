# FDA ePORTAL Clone

A web-based clone of the FDA Philippines ePORTAL system (eportal.fda.gov.ph/sysFDC) for managing food and drug administration cases.

## Overview

This project recreates the look and functionality of the FDA Philippines electronic portal system, featuring:

- **Case Management Interface**: View and manage FDA cases with detailed information
- **Interactive Data Table**: Sortable columns, filtering, and search functionality
- **Sidebar Navigation**: Quick access to different case categories (New Case, Inbox, Draft, etc.)
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Interactions**: Dynamic filtering, sorting, and notifications

## Features

### 🎯 Core Functionality
- ✅ Complete UI recreation of the original FDA portal
- ✅ Interactive data table with sample FDA cases
- ✅ Sidebar navigation with case categories
- ✅ Filtering by process type and category
- ✅ Real-time search functionality
- ✅ Column sorting (ascending/descending)
- ✅ Row selection with checkboxes
- ✅ Pagination controls
- ✅ Notifications system

### 🎨 Visual Design
- ✅ Authentic FDA portal styling
- ✅ Proper color scheme and typography
- ✅ Status icons and priority indicators
- ✅ Responsive layout
- ✅ Professional government portal appearance

### ⚡ Interactive Features
- ✅ Click case numbers to view details
- ✅ Filter cases by process type
- ✅ Search across all case data
- ✅ Sort by any column
- ✅ Select multiple cases
- ✅ Keyboard shortcuts (Ctrl+A, Escape)

## File Structure

```
fda-portal/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Sample Data

The application includes realistic sample data for FDA cases:

- **License to Operate applications**
- **Product Registration cases**
- **Cosmetic Product Registration**
- **Food Facility Registration**
- **Medical Device Registration**

Each case includes:
- Case number (format: 39000-xxxxxxxx)
- Case name and company details
- Process type and current task
- Assigned officer and due dates
- Priority levels (HIGH, NORMAL, LOW)
- Status indicators

## Usage

### Opening the Application
Simply open `index.html` in a web browser to start using the FDA portal clone.

### Navigation
- **Sidebar Menu**: Click on different categories (New Case, Inbox, Draft, etc.)
- **Filter Controls**: Use dropdowns to filter by process type or category
- **Search**: Type in the search box to find specific cases
- **Sort**: Click column headers to sort data

### Case Management
- **Select Cases**: Use checkboxes to select individual cases or select all
- **View Case Details**: Click on case numbers (blue underlined)
- **Priority Indicators**: HIGH (red), NORMAL (gray), LOW (green)
- **Status Icons**: Different emojis indicate case status

### Keyboard Shortcuts
- `Ctrl+A`: Select all cases
- `Escape`: Deselect all cases

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Advanced styling with Flexbox and Grid
- **Vanilla JavaScript**: Interactive functionality
- **Font Awesome**: Icons for interface elements

### Browser Compatibility
- ✅ Chrome/Chromium-based browsers
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Responsive Breakpoints
- **Desktop**: Full layout with sidebar and table
- **Tablet**: Adjusted column widths
- **Mobile**: Stacked layout with collapsible sidebar

## Customization

### Adding New Cases
Use the `addNewCase()` function to add new cases dynamically:

```javascript
addNewCase({
    id: 146,
    caseNumber: "39000-14074691",
    caseName: "New Product Registration",
    company: "SAMPLE COMPANY INC. - Manufacturer",
    process: "Product Registration",
    task: "Initial Review",
    sentBy: "Registration Officer",
    dueDate: "30/06/2028",
    lastModified: "01/05/2025",
    priority: "NORMAL",
    status: "new"
});
```

### Modifying Styles
Edit `styles.css` to customize:
- Color scheme
- Typography
- Layout dimensions
- Status indicators

### Extending Functionality
The modular JavaScript structure allows easy extension:
- Add new filter types
- Implement advanced search
- Add case detail modals
- Integrate with backend APIs

## License

This project is created for educational and demonstration purposes. It replicates the visual design of the FDA Philippines portal but is not affiliated with or endorsed by the Food and Drug Administration of the Philippines.

## Screenshots

The application accurately recreates the original FDA portal interface including:
- Header with FDA branding
- Sidebar navigation
- Data table with case information
- Filter and search controls
- Status indicators and priority levels

---

*Created as a demonstration of web development skills and government portal UI/UX recreation.*