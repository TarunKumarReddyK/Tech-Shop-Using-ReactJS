import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from './FilterBar';
import productsData from './productsData';
import './ProductsList.css';
import Notification from './Notification'; // Import Notification

const ProductsList = () => {
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [notificationMessage, setNotificationMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const filtered = productsData.filter((product) => {
      const isBrandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const isCategoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const isPriceMatch =
        product.finalPrice >= priceRange[0] && product.finalPrice <= priceRange[1];

      return isBrandMatch && isCategoryMatch && isPriceMatch;
    });

    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories, priceRange]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Set the notification message and trigger it to show
    setNotificationMessage(`Congratulations! You added "${product.title}" to the cart.`);
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handlePriceFilter = (min, max) => {
    setPriceRange([min, max]);
  };

  const renderStars = (rateCount) => {
    const stars = [];
    for (let i = 0; i < rateCount; i++) {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }
    for (let i = rateCount; i < 5; i++) {
      stars.push(<span key={i + 5} className="star">&#9734;</span>);
    }
    return stars;
  };

  return (
    <div className="products-container">
      <div className="filter-container">
        <FilterBar
          onBrandChange={handleBrandFilter}
          onCategoryChange={handleCategoryFilter}
          onPriceChange={handlePriceFilter}
        />
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-body">
              <img src={product.heroImage || product.images[0]} className="card-img-top" alt={product.title} />
              <p className="card-text">Ratings: {renderStars(product.rateCount)}</p>
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.info}</p>
              <hr />
              <div className="card-prices">
                <span style={{ textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                <span>₹{product.finalPrice}</span>
              </div>
              <button className="btn btn-danger btn-block mt-3" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display notification when an item is added to the cart */}
      <Notification message={notificationMessage} onClose={() => setNotificationMessage('')} />
    </div>
  );
};

export default ProductsList;