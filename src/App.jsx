import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import './App.css';

// ============================================
// DUMMY PRODUCT DATA
// ============================================
const productsData = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600"
    ],
    description: "Experience crystal-clear audio with our premium wireless earbuds. Featuring active noise cancellation, 30-hour battery life, and seamless connectivity.",
    features: ["Active Noise Cancellation", "30-Hour Battery", "IPX5 Water Resistant", "Touch Controls"]
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    price: 399.99,
    originalPrice: 499.99,
    category: "Electronics",
    rating: 4.9,
    reviews: 1523,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600"
    ],
    description: "The ultimate smartwatch for fitness enthusiasts. Track your health metrics, receive notifications, and stay connected on the go.",
    features: ["Health Monitoring", "GPS Tracking", "5ATM Water Resistant", "7-Day Battery"]
  },
  {
    id: 3,
    name: "Premium Leather Bag",
    price: 149.99,
    originalPrice: 199.99,
    category: "Fashion",
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600"
    ],
    description: "Handcrafted from genuine Italian leather, this bag combines timeless elegance with modern functionality.",
    features: ["Genuine Italian Leather", "Multiple Compartments", "Adjustable Strap", "Dust Bag Included"]
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    originalPrice: 99.99,
    category: "Home",
    rating: 4.6,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600"
    ],
    description: "Illuminate your workspace with our sleek, adjustable desk lamp. Features touch controls and multiple brightness levels.",
    features: ["Touch Controls", "3 Color Temperatures", "USB Charging Port", "Memory Function"]
  },
  {
    id: 5,
    name: "Running Shoes Elite",
    price: 159.99,
    originalPrice: 189.99,
    category: "Sports",
    rating: 4.8,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"
    ],
    description: "Engineered for performance, these running shoes feature responsive cushioning and breathable mesh upper.",
    features: ["Responsive Cushioning", "Breathable Mesh", "Carbon Fiber Plate", "Lightweight Design"]
  },
  {
    id: 6,
    name: "Ceramic Coffee Set",
    price: 59.99,
    originalPrice: 79.99,
    category: "Home",
    rating: 4.5,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"
    ],
    description: "Artisan-crafted ceramic coffee set. Perfect for your morning ritual or entertaining guests.",
    features: ["Hand-Glazed Finish", "Microwave Safe", "Dishwasher Safe", "4-Cup Set"]
  },
  {
    id: 7,
    name: "Bluetooth Speaker Max",
    price: 129.99,
    originalPrice: 169.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 1834,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600"
    ],
    description: "Powerful 360° sound in a compact design. Perfect for any adventure with its rugged, waterproof build.",
    features: ["360° Sound", "20-Hour Battery", "IP67 Waterproof", "Built-in Microphone"]
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: 69.99,
    category: "Sports",
    rating: 4.6,
    reviews: 967,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
    ],
    description: "Eco-friendly yoga mat with superior grip and cushioning. Made from natural rubber and recycled materials.",
    features: ["Eco-Friendly Materials", "Non-Slip Surface", "6mm Thickness", "Carrying Strap"]
  },
  {
    id: 9,
    name: "Wireless Charger Pro",
    price: 45.99,
    originalPrice: 59.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 723,
    image: "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=400",
    images: [
      "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=600"
    ],
    description: "Fast wireless charging for all your devices. Sleek design with LED indicator.",
    features: ["15W Fast Charging", "Universal Compatibility", "LED Indicator", "Anti-Slip Base"]
  }
];

const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];

// ============================================
// CONTEXT - Cart Management
// ============================================
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, notification
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// ============================================
// CUSTOM HOOKS
// ============================================
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// ============================================
// COMPONENTS
// ============================================

// Notification Toast
const Notification = () => {
  const { notification } = useCart();
  
  if (!notification) return null;
  
  return (
    <div className="notification">
      <span className="notification-icon">✓</span>
      {notification}
    </div>
  );
};

// Header Component
const Header = ({ currentPage, setCurrentPage, setSelectedProduct }) => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'cart', label: 'Cart' }
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => handleNavClick('home')}>
          <span className="logo-icon">◆</span>
          <span className="logo-text">LUXE</span>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'nav-link-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="cart-btn" onClick={() => handleNavClick('cart')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  const socialLinks = [
    { icon: 'f', label: 'Facebook' },
    { icon: 't', label: 'Twitter' },
    { icon: 'in', label: 'Instagram' },
    { icon: 'yt', label: 'YouTube' }
  ];

  const footerLinks = {
    Shop: ['All Products', 'New Arrivals', 'Best Sellers', 'Sale'],
    Support: ['Contact Us', 'FAQs', 'Shipping', 'Returns'],
    Company: ['About Us', 'Careers', 'Press', 'Blog']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">LUXE</span>
          </div>
          <p className="footer-tagline">
            Curated products for the modern lifestyle. Quality meets design.
          </p>
          <div className="social-links">
            {socialLinks.map(link => (
              <a key={link.label} href="#" className="social-link" aria-label={link.label}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="footer-column">
            <h4 className="footer-title">{title}</h4>
            <ul className="footer-links">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="footer-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-column">
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-text">Subscribe for exclusive offers and updates.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email" className="newsletter-input" required />
            <button type="submit" className="newsletter-btn">→</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 LUXE. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// Star Rating Component
const StarRating = ({ rating, reviews }) => {
  return (
    <div className="star-rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= Math.floor(rating) ? 'star-filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-text">{rating}</span>
      {reviews && <span className="reviews-count">({reviews.toLocaleString()})</span>}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const [ref, isVisible] = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      ref={ref}
      className={`product-card ${isVisible ? 'product-card-visible' : ''}`}
      onClick={() => onClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className={`product-overlay ${isHovered ? 'product-overlay-visible' : ''}`}>
          <button className="quick-view-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        {discount > 0 && (
          <span className="discount-badge">-{discount}%</span>
        )}
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="product-pricing">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Hero Section - FIXED to match CSS structure
const HeroSection = ({ setCurrentPage }) => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-grid"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">New Collection 2026</span>
            <span className="badge-tag">Hot</span>
          </div>
          
          <h1 className="hero-title">
            <span className="hero-title-line">Discover</span>
            <span className="hero-title-line">
              <span className="hero-title-gradient">Premium</span> Style
            </span>
          </h1>
          
          <p className="hero-description">
            Curated products that blend innovation with elegance. 
            Experience the future of shopping today.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('products')}
            >
              Shop Now
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">
                <span className="stat-number">50K</span>
                <span className="stat-suffix">+</span>
              </span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                <span className="stat-number">200</span>
                <span className="stat-suffix">+</span>
              </span>
              <span className="stat-label">Premium Products</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                <span className="stat-number">4.9</span>
              </span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-cards">
            {/* Main Product Card */}
            <div className="hero-main-card">
              <div className="main-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" 
                  alt="Featured Product" 
                />
                <span className="main-card-badge">Best Seller</span>
              </div>
              <div className="main-card-info">
                <span className="main-card-category">Electronics</span>
                <h3 className="main-card-name">Premium Headphones</h3>
                <div className="main-card-footer">
                  <div className="main-card-price">
                    <span className="price-current">$299</span>
                    <span className="price-original">$399</span>
                  </div>
                  <div className="main-card-rating">
                    <span>★</span> 4.9
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="floating-card floating-card-1">
              <div className="floating-card-icon purple">🎧</div>
              <div className="floating-card-content">
                <span className="floating-card-label">New Arrival</span>
                <span className="floating-card-value">Audio Collection</span>
              </div>
            </div>
            
            <div className="floating-card floating-card-2">
              <div className="floating-card-icon green">⭐</div>
              <div className="floating-card-content">
                <span className="floating-card-label">Top Rated</span>
                <span className="floating-card-value">2.5K+ Reviews</span>
              </div>
            </div>
            
            {/* <div className="floating-card floating-card-3">
              <div className="floating-card-icon orange">🔥</div>
              <div className="floating-card-content">
                <span className="floating-card-label">Hot Deal</span>
                <span className="floating-card-value">25% OFF</span>
              </div>
            </div> */}

            {/* Decorative Elements */}
            <div className="hero-decoration">
              <div className="decoration-ring"></div>
              <div className="decoration-ring decoration-ring-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    { icon: '🚚', title: 'Free Shipping', description: 'On orders over $100' },
    { icon: '🔄', title: 'Easy Returns', description: '30-day return policy' },
    { icon: '🛡️', title: 'Secure Payment', description: '100% secure checkout' },
    { icon: '💬', title: '24/7 Support', description: 'Dedicated support team' }
  ];

  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <span className="feature-icon">{feature.icon}</span>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Home Page
const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const featuredProducts = productsData.slice(0, 4);

  return (
    <main className="home-page">
      <HeroSection setCurrentPage={setCurrentPage} />
      <FeaturesSection />
      
      <section className="featured-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">Bestsellers</span>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <button 
            className="view-all-btn"
            onClick={() => setCurrentPage('products')}
          >
            View All Products →
          </button>
        </div>
        
        <div className="products-grid home-grid">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      <section className="promo-section">
        <div className="promo-card">
          <div className="promo-content">
            <span className="promo-badge">Limited Time</span>
            <h2 className="promo-title">Summer Sale</h2>
            <p className="promo-description">
              Get up to 40% off on selected items. Don't miss out on these amazing deals!
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('products')}
            >
              Shop the Sale
              <span className="btn-arrow">→</span>
            </button>
          </div>
          <div className="promo-image">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500" 
              alt="Summer Sale" 
            />
          </div>
        </div>
      </section>
    </main>
  );
};

// Products Page
const ProductsPage = ({ setSelectedProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <main className="products-page">
      <div className="page-header">
        <h1 className="page-title">All Products</h1>
        <p className="page-subtitle">Discover our curated collection of premium products</p>
      </div>

      <div className="products-layout">
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'category-btn-active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="range-slider"
              />
              <div className="price-labels">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="products-content">
          <div className="products-toolbar">
            <span className="results-count">{sortedProducts.length} products</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="products-grid products-page-grid">
            {sortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// Product Details Page
const ProductDetailsPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={() => setCurrentPage('products')}>Back to Products</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
    }, 500);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <main className="product-details-page">
      <button className="back-btn" onClick={() => setCurrentPage('products')}>
        ← Back to Products
      </button>

      <div className="product-details-grid">
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="main-image"
            />
            {discount > 0 && (
              <span className="discount-badge">-{discount}%</span>
            )}
          </div>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'thumbnail-active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-details-info">
          <span className="product-category-badge">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
          
          <StarRating rating={product.rating} reviews={product.reviews} />
          
          <div className="product-price-section">
            <span className="product-detail-price">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="product-detail-original">${product.originalPrice.toFixed(2)}</span>
                <span className="product-save">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button 
              className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <span>Add to Cart</span>
                  <span className="btn-price">${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-icon">🚚</span>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🔄</span>
              <span>30-day easy returns</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🛡️</span>
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Cart Page
const CartPage = ({ setCurrentPage, setSelectedProduct }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet</p>
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentPage('products')}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <main className="cart-page">
      <div className="page-header">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <div>
                    <h3 
                      className="cart-item-name"
                      onClick={() => setSelectedProduct(item)}
                    >
                      {item.name}
                    </h3>
                    <span className="cart-item-category">{item.category}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
                
                <div className="cart-item-footer">
                  <div className="cart-quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
            <span className="btn-arrow">→</span>
          </button>

          <button 
            className="continue-shopping-btn"
            onClick={() => setCurrentPage('products')}
          >
            Continue Shopping
          </button>

          <div className="payment-methods">
            <span>We accept:</span>
            <div className="payment-icons">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">🍎</span>
              <span className="payment-icon">🅿️</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (selectedProduct && currentPage === 'details') {
      return (
        <ProductDetailsPage 
          product={selectedProduct} 
          setCurrentPage={setCurrentPage}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            setSelectedProduct={handleProductClick}
          />
        );
      case 'products':
        return <ProductsPage setSelectedProduct={handleProductClick} />;
      case 'cart':
        return (
          <CartPage 
            setCurrentPage={setCurrentPage}
            setSelectedProduct={handleProductClick}
          />
        );
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            setSelectedProduct={handleProductClick}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="app">
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          setSelectedProduct={setSelectedProduct}
        />
        {renderPage()}
        <Footer />
        <Notification />
      </div>
    </CartProvider>
  );
};

export default App;