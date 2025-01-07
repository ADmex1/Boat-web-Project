import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About LoviBoats</h3>
          <p>
            Your trusted platform for booking dolphin watching tours at Lovina Beach, Bali. 
            We connect tourists with local boat operators for unforgettable experiences.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/boats">Our Boats</Link></li>
            <li><Link to="/account">My Account</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <MdLocationOn className="footer-icon" />
              Lovina Beach, Buleleng, Bali
            </p>
            <p>
              <FaWhatsapp className="footer-icon" />
              +62 812-3456-7890
            </p>
            <p>
              <FaEnvelope className="footer-icon" />
              info@loviboats.com
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 LoviBoats. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
