import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <img src="/images/lovina-header.jpg" alt="Pantai Lovina" className="header-image" />
        <div className="hero-overlay">
          <h1>Welcome to Lovina Beach</h1>
        </div>
      </div>

      <div className="info-section">
        <h2>Discover Lovina Beach</h2>
        <p>
          Experience the beauty of Lovina Beach, famous for its black sand shores
          and dolphin watching activities. Our boats are ready to take you on an
          unforgettable journey to see wild dolphins in their natural habitat.
        </p>
        <Link to="/boats" className="cta-button">
          Explore Our Boats
        </Link>
      </div>
    </div>
  );
}

export default Home;