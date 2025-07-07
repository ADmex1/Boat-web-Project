import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import './BoatDetail.css';

function BoatDetail() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  const boatInfo = {
    id: id,
    name: "Dolphin Seeker",
    capacity: "10 persons",
    paymentMethod: "Cash, Transfer",
    priceRange: "IDR 100,000 - 150,000",
    operatingYears: "5 years",
    lastUpdated: "2024-03-20",
    whatsappNumber: "+6281234567890"
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Implement review submission to database
  };

  return (
    <div className="boat-detail">
      <h1>{boatInfo.name}</h1>
      <div className="boat-info-grid">
        <div>ID: {boatInfo.id}</div>
        <div>Capacity: {boatInfo.capacity}</div>
        <div>Payment: {boatInfo.paymentMethod}</div>
        <div>Price: {boatInfo.priceRange}</div>
        <div>Operating: {boatInfo.operatingYears}</div>
        <div>Updated: {boatInfo.lastUpdated}</div>
      </div>

      <a 
        href={`https://wa.me/${boatInfo.whatsappNumber}`}
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp /> Contact via WhatsApp
      </a>

      <div className="reviews-section">
        <h2>Reviews</h2>
        <form onSubmit={handleSubmitReview}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p>{review.content}</p>
              <div className="review-meta">
                <span>{review.username}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoatDetail;