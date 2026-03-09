// Authentication Module

class Auth {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.initializeAuth();
    }

    initializeAuth() {
        // Check if user is logged in
        if (this.currentUser) {
            this.updateUIForLoggedInUser();
        }

        // Setup event listeners
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userAvatar = document.getElementById('userAvatar');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        if (userAvatar) {
            userAvatar.addEventListener('click', () => {
                const dropdown = document.getElementById('dropdownMenu');
                dropdown.classList.toggle('show');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('dropdownMenu');
            const userAvatar = document.getElementById('userAvatar');
            if (dropdown && userAvatar && !userAvatar.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }

    register(email, password, name, phone) {
        // Validate inputs
        if (!email || !password || !name) {
            return { success: false, message: 'All fields are required' };
        }

        // Check if user already exists
        const users = this.getAllUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const user = {
            id: Date.now(),
            email,
            password, // In real app, this should be hashed
            name,
            phone,
            createdAt: new Date().toISOString(),
            loyaltyPoints: 100 // Welcome bonus
        };

        users.push(user);
        localStorage.setItem('fusionbite_users', JSON.stringify(users));

        // Auto login
        this.login(email, password);

        return { success: true, message: 'Registration successful' };
    }

    login(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Remove password before storing
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem('fusionbite_current_user', JSON.stringify(userWithoutPassword));
            this.currentUser = userWithoutPassword;
            return { success: true, message: 'Login successful' };
        }

        return { success: false, message: 'Invalid email or password' };
    }

    logout() {
        localStorage.removeItem('fusionbite_current_user');
        this.currentUser = null;
        window.location.href = '/';
    }

    getCurrentUser() {
        const user = localStorage.getItem('fusionbite_current_user');
        return user ? JSON.parse(user) : null;
    }

    getAllUsers() {
        const users = localStorage.getItem('fusionbite_users');
        return users ? JSON.parse(users) : [];
    }

    updateUserProfile(updates) {
        if (!this.currentUser) return { success: false, message: 'Not logged in' };

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem('fusionbite_users', JSON.stringify(users));

            const { password, ...userWithoutPassword } = users[userIndex];
            localStorage.setItem('fusionbite_current_user', JSON.stringify(userWithoutPassword));
            this.currentUser = userWithoutPassword;

            return { success: true, message: 'Profile updated' };
        }

        return { success: false, message: 'User not found' };
    }

    updateUIForLoggedInUser() {
        const loginBtn = document.getElementById('loginBtn');
        const userDropdown = document.getElementById('userDropdown');

        if (loginBtn) loginBtn.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
            return false;
        }
        return true;
    }
}

// Initialize auth
window.auth = new Auth();