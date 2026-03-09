// Theme Module

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.applyTheme();
        this.initializeThemeToggle();
    }

    loadTheme() {
        return localStorage.getItem('fusionbite_theme') || 'light';
    }

    saveTheme(theme) {
        localStorage.setItem('fusionbite_theme', theme);
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        this.updateToggleIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.saveTheme(this.currentTheme);
        this.applyTheme();
    }

    updateToggleIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
}

// Initialize theme
window.themeManager = new ThemeManager();