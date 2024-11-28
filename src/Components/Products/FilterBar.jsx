import React from 'react';
import './FilterBar.css'; // Ensure proper styling

const FilterBar = ({ onBrandChange, onCategoryChange, onPriceChange }) => {
  const brands = ['JBL', 'boAt', 'Sony'];
  const categories = ['Headphones', 'Earbuds', 'Earphones', 'Neckbands'];

  // Handler for price slider change
  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split(',');  // Split the range (e.g., "0,20000")
    onPriceChange(parseInt(min), parseInt(max));  // Pass min and max to the parent component
  };

  return (
    <div className="filter-bar">
      <h5>Filter By</h5>
      <hr />
      
      {/* Brands filter */}
      <div className="filter-section">
        <h6>Brands</h6>
        {brands.map((brand) => (
          <div key={brand}>
            <label>
              <input
                type="checkbox"
                value={brand}
                onChange={() => onBrandChange(brand)}
              />{' '}
              {brand}
            </label>
          </div>
        ))}
      </div>

      <hr />

      {/* Categories filter */}
      <div className="filter-section">
        <h6>Category</h6>
        {categories.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                value={category}
                onChange={() => onCategoryChange(category)}
              />{' '}
              {category}
            </label>
          </div>
        ))}
      </div>

      <hr />

      {/* Price Range slider */}
      <div className="filter-section">
        <h6>Price Range</h6>
        <input
          type="range"
          min="0"
          max="20000"
          step="100"
          defaultValue="0,20000"
          onChange={handlePriceChange}
          className="price-slider"
        />
        <div>
          <span>₹{0}</span> - <span>₹{20000}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;