// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Import CSS file for styling
import { useHistory } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const history = useHistory(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs only once after component mount

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const priceFilteredProducts = filteredProducts.filter((product) =>
    (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice)
  );

  const handleLogout = () => {
    // Delete token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    history.push('/login');
    window.location.reload();
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">Byit</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          {/* Add more navbar links as needed */}
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="cart">
          <span>Card : {cart.length}</span>
          <span> Total : ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</span>
        </div>
      </div>
      <div className='below_nav'>
      <h4 className='tag_line'>Shop Byit: Your One-Stop Destination for Quality and Style!</h4>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="price-input"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="price-input"
        />
      </div>
      </div>
      
      <div className="products-container">
        <div className="product-cards">
          {priceFilteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} className="product-image" />
              <div className="product-details">
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
                {/* <p>Stock: {product.stock}</p> */}
                <p>Category: {product.category}</p>
                <div className="button-container">
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>{isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}</button>
                  {isProductInCart(product.id) && <button className="remove-from-cart-btn" onClick={() => removeFromCart(product.id)}>Remove from Cart</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
