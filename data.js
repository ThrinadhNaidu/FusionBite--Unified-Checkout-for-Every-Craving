// 1. DATA LOADING LOGIC (Check if we have saved data first)
const savedRestaurants = localStorage.getItem('RESTAURANTS_DATA');
const savedMenu = localStorage.getItem('MENU_ITEMS');

// 2. RESTAURANTS DATA
const RESTAURANTS_DATA = savedRestaurants ? JSON.parse(savedRestaurants) : [
    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Italian, Pizza",
        rating: 4.5,
        deliveryTime: "30-35 min",
        distance: "2.5 km",
        image: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "italian",
        popular: true
    },
    {
        id: 2,
        name: "Wok & Roll",
        cuisine: "Chinese, Asian",
        rating: 4.3,
        deliveryTime: "25-30 min",
        distance: "1.8 km",
        image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "chinese",
        popular: true
    },
    {
        id: 3,
        name: "Spice Route",
        cuisine: "Indian, North Indian",
        rating: 4.6,
        deliveryTime: "35-40 min",
        distance: "3.2 km",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "indian",
        popular: false
    },
    {
        id: 4,
        name: "Taco Fiesta",
        cuisine: "Mexican, Tex-Mex",
        rating: 4.4,
        deliveryTime: "20-25 min",
        distance: "1.5 km",
        image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "mexican",
        popular: true
    },
    {
        id: 5,
        name: "Sweet Treats",
        cuisine: "Desserts, Bakery",
        rating: 4.7,
        deliveryTime: "15-20 min",
        distance: "1.2 km",
        image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "dessert",
        popular: false
    },
    {
        id: 6,
        name: "Burger Barn",
        cuisine: "American, Fast Food",
        rating: 4.2,
        deliveryTime: "25-30 min",
        distance: "2.0 km",
        image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "american",
        popular: true
    }
];

// 3. MENU ITEMS DATA
const MENU_ITEMS = savedMenu ? JSON.parse(savedMenu) : {
    1: [
        { id: 101, name: "Margherita Pizza", price: 299, image: "https://images.pexels.com/photos/35068608/pexels-photo-35068608.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.5 },
        { id: 102, name: "Pepperoni Pizza", price: 399, image: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.6 },
        { id: 103, name: "Veggie Supreme", price: 349, image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.4 },
        { id: 104, name: "BBQ Chicken Pizza", price: 449, image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.7 }
    ],
    2: [
        { id: 201, name: "Veg Fried Rice", price: 199, image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.3 },
        { id: 202, name: "Chicken Noodles", price: 249, image: "https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.5 },
        { id: 203, name: "Spring Rolls", price: 149, image: "https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.2 },
        { id: 204, name: "Manchurian Gravy", price: 179, image: "https://images.pexels.com/photos/28445828/pexels-photo-28445828.jpeg", category: "veg", rating: 4.4 }
    ],
    3: [
        { id: 301, name: "Butter Chicken", price: 329, image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.8 },
        { id: 302, name: "Paneer Tikka Masala", price: 279, image: "https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.6 },
        { id: 303, name: "Dal Makhani", price: 229, image: "https://images.pexels.com/photos/12737918/pexels-photo-12737918.jpeg", category: "veg", rating: 4.5 },
        { id: 304, name: "Biryani", price: 349, image: "https://media.istockphoto.com/id/1443200084/photo/close-up-image-of-round-copper-metal-catering-bowl-containing-rice-dish-of-chicken-biryani-on.jpg?s=2048x2048&w=is&k=20&c=SCKkHSynz307i-MaQNHctA6_Xxow03GomOf9LO4eFvc=", category: "non-veg", rating: 4.7 }
    ],
    4: [
        { id: 401, name: "Chicken Tacos", price: 199, image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.4 },
        { id: 402, name: "Veggie Burrito", price: 179, image: "https://images.pexels.com/photos/18007687/pexels-photo-18007687.jpeg", category: "veg", rating: 4.3 },
        { id: 403, name: "Nachos Supreme", price: 249, image: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.5 },
        { id: 404, name: "Quesadilla", price: 219, image: "https://images.pexels.com/photos/6419694/pexels-photo-6419694.jpeg", category: "veg", rating: 4.2 }
    ],
    5: [
        { id: 501, name: "Chocolate Cake", price: 149, image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.8 },
        { id: 502, name: "Red Velvet Cupcake", price: 99, image: "https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.6 },
        { id: 503, name: "Ice Cream Sundae", price: 129, image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.7 },
        { id: 504, name: "Brownie Fudge", price: 119, image: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.5 }
    ],
    6: [
        { id: 601, name: "Classic Burger", price: 179, image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.3 },
        { id: 602, name: "Veggie Burger", price: 149, image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.2 },
        { id: 603, name: "Cheese Burger", price: 199, image: "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=400", category: "non-veg", rating: 4.4 },
        { id: 604, name: "French Fries", price: 99, image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400", category: "veg", rating: 4.1 }
    ]
};

// 4. COUPONS DATA
const COUPONS = [
    { code: "FIRST50", discount: 50, minOrder: 200, description: "Flat ₹50 off on first order" },
    { code: "SAVE100", discount: 100, minOrder: 500, description: "₹100 off on orders above ₹500" },
    { code: "FUSION20", discount: 20, minOrder: 0, description: "20% off up to ₹100" }
];

// 5. THE SYNC FUNCTION (Add this to your Admin Page's Add/Delete functions)
window.syncToStorage = function() {
    localStorage.setItem('RESTAURANTS_DATA', JSON.stringify(window.RESTAURANTS_DATA));
    localStorage.setItem('MENU_ITEMS', JSON.stringify(window.MENU_ITEMS));
};

// Export to global scope
window.RESTAURANTS_DATA = RESTAURANTS_DATA;
window.MENU_ITEMS = MENU_ITEMS;
window.COUPONS = COUPONS;