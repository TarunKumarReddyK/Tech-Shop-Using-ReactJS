import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaUserPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // For additional styling

const Header = () => {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const searchPopupRef = useRef(null);

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  const handleClickOutside = (event) => {
    if (searchPopupRef.current && !searchPopupRef.current.contains(event.target)) {
      setShowSearchPopup(false);
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);

    if (showSearchPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchPopup]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 text-white">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/techshop" id="x">Tech-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav"></Navbar.Collapse>
          <Nav className="d-flex gap-3">
            <Button variant="outline-success" onClick={toggleSearchPopup}>
              <FaSearch />
            </Button>
            <Nav.Link as={Link} to="/login" className="btn btn-outline-secondary text-white">
              <FaUserPlus />
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="btn btn-outline-secondary text-white">
              <FaShoppingCart /> <span id="cartCount">{cartCount}</span>
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      {showSearchPopup && (
        <div className="search-popup">
          <div className="search-popup-content" ref={searchPopupRef}>
            <span className="close" onClick={toggleSearchPopup}>&times;</span>
            <form className="search-form-popup">
              <input type="text" placeholder="Search for products..." />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;