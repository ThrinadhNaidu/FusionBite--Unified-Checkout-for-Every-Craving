// app.js - The coordinator script for FusionBite

class App {
    constructor() {
        // 1. Initialize UI Elements from index.html
        this.restaurantsGrid = document.getElementById('restaurantsGrid');
        this.filterChips = document.querySelectorAll('.filter-chip');
        this.sortSelect = document.getElementById('sortSelect');
        this.searchInput = document.getElementById('searchInput');
        
        // 2. Set Initial State
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.init();
    }

    init() {
        // Initial render using the data from data.js
        this.renderRestaurants(window.RESTAURANTS_DATA);
        this.setupEventListeners();
        
        // Initialize the Notification System
        this.setupNotifications();
    }

    setupEventListeners() {
        // Category Filtering Logic
        this.filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                this.currentFilter = chip.dataset.filter;
                this.applyFiltersAndSort();
            });
        });

        // Sorting Logic
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => {
                this.applyFiltersAndSort();
            });
        }

        // Search Bar Logic
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.applyFiltersAndSort();
            });
        }
    }

    // --- NOTIFICATION SYSTEM METHODS ---

    setupNotifications() {
        const notifBtn = document.getElementById('notificationBtn');
        const notifDropdown = document.getElementById('notifDropdown');

        if (notifBtn) {
            notifBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Toggle the 'show' class from styles.css
                notifDropdown.classList.toggle('show');
                this.markNotificationsAsRead();
            });
        }

        // Real-Time Polling: Checks for Admin updates every 3 seconds
        setInterval(() => this.checkOrderUpdates(), 3000);
    }

    checkOrderUpdates() {
        // Retrieve orders from shared local storage
        const orders = JSON.parse(localStorage.getItem('fusionbite_orders')) || [];
        // Filter orders marked with the notification flag by admin.html
        const unreadUpdates = orders.filter(o => o.hasNotification === true);

        const countBadge = document.getElementById('notifCount');
        const notifList = document.getElementById('notifList');

        if (unreadUpdates.length > 0) {
            // Update the UI Badge
            countBadge.style.display = 'flex';
            countBadge.textContent = unreadUpdates.length;

            // Update the Notification Dropdown list
            notifList.innerHTML = unreadUpdates.map(order => `
                <div style="padding: 12px; border-bottom: 1px solid var(--border); border-left: 4px solid var(--primary); margin-bottom: 8px; background: var(--card); border-radius: 4px;">
                    <div style="font-weight: 800; font-size: 0.8rem; color: var(--primary);">ORDER #${order.id}</div>
                    <div style="font-size: 0.85rem; margin-top: 4px;">Status updated to: <strong>${order.status}</strong></div>
                </div>
            `).join('');
        }
    }

    markNotificationsAsRead() {
        const orders = JSON.parse(localStorage.getItem('fusionbite_orders')) || [];
        // Reset the notification flag so the badge disappears
        const updatedOrders = orders.map(o => ({ ...o, hasNotification: false }));
        localStorage.setItem('fusionbite_orders', JSON.stringify(updatedOrders));
        
        const countBadge = document.getElementById('notifCount');
        if (countBadge) countBadge.style.display = 'none';
    }

    // --- CORE RENDERING METHODS ---

    applyFiltersAndSort() {
        let filtered = [...window.RESTAURANTS_DATA];

        if (this.searchTerm) {
            filtered = filtered.filter(res => 
                res.name.toLowerCase().includes(this.searchTerm) || 
                res.cuisine.toLowerCase().includes(this.searchTerm)
            );
        }

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(r => r.category === this.currentFilter);
        }

        const sortBy = this.sortSelect ? this.sortSelect.value : 'rating';
        if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'delivery') {
            filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
        }

        this.renderRestaurants(filtered);
    }

    renderRestaurants(restaurants) {
        if (!this.restaurantsGrid) return;

        if (restaurants.length === 0) {
            this.restaurantsGrid.innerHTML = `
                <div class="loading" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--text-muted);"></i>
                    <p>No restaurants found. Try a different search or filter.</p>
                </div>`;
            return;
        }

        this.restaurantsGrid.innerHTML = restaurants.map(res => `
            <div class="restaurant-card" onclick="location.href='restaurant.html?id=${res.id}'">
                <div class="restaurant-image">
                    <img src="${res.image}" alt="${res.name}">
                    <div class="restaurant-badge">
                        <i class="fas fa-star"></i> ${res.rating}
                    </div>
                </div>
                <div class="restaurant-info">
                    <h3 class="restaurant-name">${res.name}</h3>
                    <p class="restaurant-cuisine">${res.cuisine}</p>
                    <div class="restaurant-meta">
                        <span class="meta-item"><i class="fas fa-clock"></i> ${res.deliveryTime}</span>
                        <span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${res.distance}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the App
document.addEventListener('DOMContentLoaded', () => {
    window.fusionApp = new App();
});