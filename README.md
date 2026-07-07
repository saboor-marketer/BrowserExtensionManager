# Browser Extension Manager

A modern, interactive browser extension manager UI built with vanilla HTML, CSS, and JavaScript. This project demonstrates dynamic data handling, filtering, color theming, and responsive design.

## Features

- **Toggle Extensions**: Enable or disable extensions with a single click
- **Filter Extensions**: View all extensions, or filter by active/inactive status
- **Remove Extensions**: Delete extensions with a confirmation modal
- **Color Themes**: Choose from 4 color themes (Light, Dark, Blue, Green)
- **Responsive Design**: Optimized layout for mobile, tablet, and desktop
- **Smooth Animations**: Polished transitions and hover effects
- **Keyboard Support**: Press Escape to close modals
- **Local Storage**: Theme preference is saved and persists across sessions

## Project Structure

```
Browser Extension Manager/
├── index.html      # Main HTML structure
├── styles.css      # Styling with CSS variables for theming
├── script.js       # JavaScript functionality
├── data.json       # Sample extension data
└── README.md       # Project documentation
```

## Getting Started

1. Clone or download this project
2. Open `index.html` in a web browser
3. The application will automatically load the extension data from `data.json`

## Usage

### Toggle Extensions
- Click the "Enable" or "Disable" button on any extension card to toggle its active state

### Filter Extensions
- Use the filter buttons at the top to view:
  - **All**: Show all extensions
  - **Active**: Show only enabled extensions
  - **Inactive**: Show only disabled extensions

### Remove Extensions
- Click the trash icon (🗑️) on any extension card
- Confirm the removal in the modal dialog

### Change Theme
- Click one of the theme buttons in the header:
  - ☀️ Light theme
  - 🌙 Dark theme
  - 🔵 Blue theme
  - 🟢 Green theme
- Your theme preference is automatically saved

## Customization

### Adding New Extensions

Edit `data.json` to add or modify extensions:

```json
{
  "id": 9,
  "name": "Your Extension",
  "description": "Extension description",
  "icon": "🎯",
  "active": true
}
```

### Adding New Themes

1. Add a new CSS variable set in `styles.css`:
```css
[data-theme="purple"] {
    --bg-primary: #f3e8ff;
    --bg-secondary: #ffffff;
    --text-primary: #581c87;
    --text-secondary: #6b21a8;
    --accent: #9333ea;
    --accent-hover: #7e22ce;
    --border: #e9d5ff;
    --shadow: rgba(147, 51, 234, 0.2);
}
```

2. Add a theme button in `index.html`:
```html
<button class="theme-btn" data-theme="purple" aria-label="Purple theme">
    <span class="theme-icon">🟣</span>
</button>
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties (variables), Grid layout, Flexbox, Animations
- **JavaScript (ES6+)**: Async/await, Arrow functions, Template literals, LocalStorage API
- **No frameworks**: Pure vanilla JavaScript for maximum compatibility

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- CSS Custom Properties
- ES6 JavaScript
- LocalStorage API

## License

This project is open source and available for educational purposes.
