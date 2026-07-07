let extensions = [];
let currentFilter = 'all';
let extensionToRemove = null;

// Load extensions from data file
async function loadExtensions() {
    try {
        const response = await fetch('data.json');
        extensions = await response.json();
        renderExtensions();
    } catch (error) {
        console.error('Error loading extensions:', error);
    }
}

// Render extensions based on current filter
function renderExtensions() {
    const grid = document.getElementById('extensionsGrid');
    const emptyState = document.getElementById('emptyState');
    
    const filteredExtensions = extensions.filter(extension => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return extension.active;
        if (currentFilter === 'inactive') return !extension.active;
    });

    if (filteredExtensions.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = filteredExtensions.map(extension => `
        <div class="extension-card" data-id="${extension.id}">
            <div class="extension-header">
                <div class="extension-icon">${extension.icon}</div>
                <div class="extension-info">
                    <h3 class="extension-name">${extension.name}</h3>
                    <p class="extension-description">${extension.description}</p>
                </div>
            </div>
            <div class="extension-actions">
                <button class="btn btn-toggle ${extension.active ? '' : 'inactive'}" 
                        onclick="toggleExtension(${extension.id})">
                    ${extension.active ? 'Disable' : 'Enable'}
                </button>
                <button class="btn btn-remove" 
                        onclick="showRemoveModal(${extension.id})"
                        aria-label="Remove extension">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle extension active state
function toggleExtension(id) {
    const extension = extensions.find(ext => ext.id === id);
    if (extension) {
        extension.active = !extension.active;
        renderExtensions();
    }
}

// Show confirmation modal
function showRemoveModal(id) {
    extensionToRemove = id;
    const modal = document.getElementById('confirmModal');
    modal.classList.add('active');
}

// Hide confirmation modal
function hideModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('active');
    extensionToRemove = null;
}

// Remove extension
function removeExtension() {
    if (extensionToRemove !== null) {
        const card = document.querySelector(`.extension-card[data-id="${extensionToRemove}"]`);
        if (card) {
            card.classList.add('removing');
            setTimeout(() => {
                extensions = extensions.filter(ext => ext.id !== extensionToRemove);
                renderExtensions();
                hideModal();
            }, 300);
        }
    }
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderExtensions();
}

// Set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update button states
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
    
    // Save theme preference
    localStorage.setItem('theme', theme);
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light');
    }
}

// Initialize event listeners
function initEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
        });
    });

    // Modal buttons
    document.getElementById('cancelRemove').addEventListener('click', hideModal);
    document.getElementById('confirmRemove').addEventListener('click', removeExtension);

    // Close modal on overlay click
    document.getElementById('confirmModal').addEventListener('click', (e) => {
        if (e.target.id === 'confirmModal') {
            hideModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadExtensions();
    loadSavedTheme();
    initEventListeners();
});
