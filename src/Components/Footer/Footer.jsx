import React from "react";
import "./Footer.css"; // Make sure to style it properly using the styles below
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h2 className="footer-logo">Tech-Shop</h2>
          <p>
            Subscribe to our Email alerts to receive early discount offers, and
            new products info.
          </p>
          <form className="subscribe-form">
            <input
              type="email"
              placeholder="Email Address*"
              className="subscribe-input"
              required
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>

        <div id='c' className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>FAQs</li>
            <li>Track Order</li>
            <li>Cancel Order</li>
            <li>Return Order</li>
            <li>Warranty Info</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Policies</h4>
          <ul>
            <li>Return Policy</li>
            <li>Security</li>
            <li>Sitemap</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Service Centres</li>
            <li>Careers</li>
            <li>Affiliates</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          2024 | All Rights Reserved. Built by |{" "}
          <span className="footer-author">Tarun Kumar Reddy K</span>
        </p>
        <div className="footer-social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>
    </footer>
  );
};

export default Footer;