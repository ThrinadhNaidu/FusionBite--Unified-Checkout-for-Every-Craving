// Cart Module - Multi-Restaurant Support

class Cart {
    constructor() {
        this.items = this.loadCart();
        this.deliveryFeePerRestaurant = 40;
        this.initializeCart();
    }

    loadCart() {
        const cart = localStorage.getItem('fusionbite_cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('fusionbite_cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addItem(restaurantId, restaurantName, item) {
        const existingItem = this.items.find(
            i => i.restaurantId === restaurantId && i.itemId === item.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                restaurantId,
                restaurantName,
                itemId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.showNotification(`${item.name} added to cart`);
    }

    removeItem(restaurantId, itemId) {
        this.items = this.items.filter(
            i => !(i.restaurantId === restaurantId && i.itemId === itemId)
        );
        this.saveCart();
    }

    updateQuantity(restaurantId, itemId, quantity) {
        const item = this.items.find(
            i => i.restaurantId === restaurantId && i.itemId === itemId
        );

        if (item) {
            if (quantity <= 0) {
                this.removeItem(restaurantId, itemId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getItemsByRestaurant() {
        const grouped = {};
        this.items.forEach(item => {
            if (!grouped[item.restaurantId]) {
                grouped[item.restaurantId] = {
                    restaurantName: item.restaurantName,
                    items: []
                };
            }
            grouped[item.restaurantId].items.push(item);
        });
        return grouped;
    }

    getRestaurantCount() {
        return Object.keys(this.getItemsByRestaurant()).length;
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getDeliveryFee() {
        return this.getRestaurantCount() * this.deliveryFeePerRestaurant;
    }

    getTaxes() {
        return Math.round(this.getSubtotal() * 0.05); // 5% GST
    }

    getTotal() {
        return this.getSubtotal() + this.getDeliveryFee() + this.getTaxes();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    initializeCart() {
        this.updateCartUI();

        // Cart button click
        const cartBtn = document.getElementById('cartBtn');
        const floatingCart = document.querySelector('.floating-cart-btn');

        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }

        if (floatingCart) {
            floatingCart.addEventListener('click', () => {
                window.location.href = '/cart.html';
            });
        }
    }

    updateCartUI() {
        const totalItems = this.getTotalItems();
        const total = this.getTotal();

        // Update cart count
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Update floating cart
        const floatingCart = document.getElementById('floatingCart');
        const floatingCartCount = document.getElementById('floatingCartCount');
        const floatingCartTotal = document.getElementById('floatingCartTotal');

        if (floatingCart) {
            floatingCart.style.display = totalItems > 0 ? 'block' : 'none';
        }

        if (floatingCartCount) {
            floatingCartCount.textContent = totalItems;
        }

        if (floatingCartTotal) {
            floatingCartTotal.textContent = `₹${total}`;
        }
    }

    showNotification(message) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            background-color: var(--success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart
window.cart = new Cart();