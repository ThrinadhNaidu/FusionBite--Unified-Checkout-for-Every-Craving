// orders.js - Handles the loading and display of purchase history

class OrdersManager {
    constructor() {
        // Match the ID from your HTML
        this.ordersListContainer = document.getElementById('ordersList');
        this.init();
    }

    init() {
        // 1. Security Check: Redirect if not logged in
        if (!window.auth.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }
        this.renderOrders();
    }

    getOrders() {
        // Retrieve the data stored during the checkout process
        const orders = localStorage.getItem('fusionbite_orders');
        return orders ? JSON.parse(orders) : [];
    }

    renderOrders() {
        if (!this.ordersListContainer) return;

        const orders = this.getOrders();

        // 2. Handle the "No Orders" state
        if (orders.length === 0) {
            this.ordersListContainer.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-receipt"></i>
                    <p>No orders found. Start your first order today!</p>
                    <a href="index.html" class="btn-primary">Explore Restaurants</a>
                </div>`;
            return;
        }

        // 3. Generate HTML for each order
        this.ordersListContainer.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <span class="order-id">Order #${order.id}</span>
                        <div class="order-date">${order.date}</div>
                    </div>
                    <span class="status-badge">${order.status || 'Confirmed'}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>₹${item.price * item.quantity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <span class="total-label">Paid Amount</span>
                    <span class="total-amount">₹${order.total}</span>
                </div>
            </div>
        `).join('');
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new OrdersManager();
});