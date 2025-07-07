import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp, FaStar, FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import './BoatDetails.css';
import api from '../services/api';

function BoatDetails() {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Data lengkap untuk semua perahu
  const boatData = {
    1: {
      id: 1,
      name: "Dolphin Seeker I",
      capacity: "8 persons",
      paymentMethods: "Cash, Bank Transfer",
      priceRange: "IDR 350,000 - 400,000",
      operatingHours: "5:30 AM - 9:00 AM",
      experience: "10 years",
      facilities: "Life jackets, First aid kit, Drinking water, Snacks",
      ownerName: "Pak Wayan",
      whatsappNumber: "6281234567890",
      lastUpdated: "2024-03-20",
      description: "Experience the best dolphin watching tour with our comfortable traditional boat. Perfect for families and small groups.",
      image: "/images/boats/boat1.jpg"
    },
    2: {
      id: 2,
      name: "Ocean Explorer",
      capacity: "12 persons",
      paymentMethods: "Cash, Bank Transfer, Credit Card",
      priceRange: "IDR 450,000 - 500,000",
      operatingHours: "5:00 AM - 10:00 AM",
      experience: "15 years",
      facilities: "Life jackets, First aid kit, Drinking water, Breakfast, WiFi",
      ownerName: "Pak Made",
      whatsappNumber: "6281234567891",
      lastUpdated: "2024-03-19",
      description: "Luxury boat with modern amenities. Perfect for medium-sized groups seeking comfort.",
      image: "/images/boats/boat2.jpg"
    },
    3: {
      id: 3,
      name: "Lovina Star",
      capacity: "10 persons",
      paymentMethods: "Cash, Bank Transfer",
      priceRange: "IDR 400,000 - 450,000",
      operatingHours: "5:30 AM - 9:30 AM",
      experience: "12 years",
      facilities: "Life jackets, First aid kit, Drinking water, Local fruits",
      ownerName: "Pak Ketut",
      whatsappNumber: "6281234567892",
      lastUpdated: "2024-03-18",
      description: "Traditional boat with modern comfort. Best choice for authentic experience.",
      image: "/images/boats/boat3.jpg"
    },
    4: {
      id: 4,
      name: "Sunrise Voyager",
      capacity: "15 persons",
      paymentMethods: "Cash, Bank Transfer, QRIS",
      priceRange: "IDR 500,000 - 600,000",
      operatingHours: "5:00 AM - 11:00 AM",
      experience: "8 years",
      facilities: "Life jackets, First aid kit, Drinking water, Breakfast, Photography service",
      ownerName: "Pak Nyoman",
      whatsappNumber: "6281234567893",
      lastUpdated: "2024-03-17",
      description: "Large boat with premium facilities. Ideal for group tours and special occasions.",
      image: "/images/boats/boat4.jpg"
    },
    5: {
      id: 5,
      name: "Dolphin Watch Pro",
      capacity: "6 persons",
      paymentMethods: "Cash, Bank Transfer",
      priceRange: "IDR 300,000 - 350,000",
      operatingHours: "5:30 AM - 8:30 AM",
      experience: "20 years",
      facilities: "Life jackets, First aid kit, Drinking water",
      ownerName: "Pak Gede",
      whatsappNumber: "6281234567894",
      lastUpdated: "2024-03-16",
      description: "Small, agile boat perfect for intimate dolphin watching experience.",
      image: "/images/boats/boat5.jpg"
    },
    6: {
      id: 6,
      name: "Bali Explorer",
      capacity: "20 persons",
      paymentMethods: "Cash, Bank Transfer, Credit Card, QRIS",
      priceRange: "IDR 600,000 - 700,000",
      operatingHours: "5:00 AM - 12:00 PM",
      experience: "25 years",
      facilities: "Life jackets, First aid kit, Drinking water, Full breakfast, WiFi, Photography service, Tour guide",
      ownerName: "Pak Komang",
      whatsappNumber: "6281234567895",
      lastUpdated: "2024-03-15",
      description: "Our largest boat with complete facilities. Perfect for large groups and special events.",
      image: "/images/boats/boat6.jpg"
    }
  };

  // Mengambil data perahu berdasarkan ID
  const boatDetails = boatData[id] || boatData[1]; // fallback ke boat 1 jika id tidak ditemukan

  // Data statis untuk contoh
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "Sarah",
      userId: "user123", // Simulasi ID user yang sedang login
      rating: 5,
      comment: "Amazing experience! The captain was very friendly and knowledgeable.",
      date: "2024-03-15"
    },
    {
      id: 2,
      username: "John",
      userId: "user456",
      rating: 4,
      comment: "Great trip, saw lots of dolphins. Highly recommended!",
      date: "2024-03-10"
    }
  ]);

  // Ambil user ID saat komponen dimount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUserId(user.id);
    }
  }, []);

  // Fetch reviews saat komponen dimount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await api.getReviews(id);
        console.log('Reviews from backend:', response.data); // untuk debugging

        // Transform data dari backend ke format frontend
        const formattedReviews = response.data.map(review => ({
          id: review.id,
          username: review.user.username, // username dari setiap review
          userId: review.user_id,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.created_at).toISOString().split('T')[0]
        }));

        setComments(formattedReviews);
      } catch (err) {
        console.error('Error loading reviews:', err);
      }
    };

    loadReviews();
  }, [id]);

  // Submit comment baru
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createReview(id, {
        comment: comment,
        rating: rating
      });

      // Pastikan data yang diterima dari backend memiliki user info
      console.log('Response from backend:', response.data); // untuk debugging

      // Transform data dari backend ke format frontend
      const newReview = {
        id: response.data.review.id,
        username: response.data.review.user.username, // username dari user yang login
        userId: response.data.review.user_id,
        rating: response.data.review.rating,
        comment: response.data.review.comment,
        date: new Date(response.data.review.created_at).toISOString().split('T')[0]
      };

      // Tambahkan review baru ke state
      setComments([newReview, ...comments]);
      setComment('');
      setRating(0);
    } catch (err) {
      console.error('Error posting review:', err);
    }
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find(c => c.id === commentId);
    setEditingId(commentId);
    setEditText(commentToEdit.comment);
    setEditRating(commentToEdit.rating);
  };

  // Edit comment
  const handleSaveEdit = async (commentId) => {
    try {
      const response = await api.updateReview(commentId, {
        comment: editText,
        rating: editRating
      });

      // Transform data dari backend ke format frontend
      const updatedReview = {
        id: response.data.review.id,
        username: response.data.review.user.username,
        userId: response.data.review.user_id,
        rating: response.data.review.rating,
        comment: response.data.review.comment,
        date: new Date(response.data.review.created_at).toISOString().split('T')[0]
      };

      setComments(comments.map(c => 
        c.id === commentId ? updatedReview : c
      ));
      setEditingId(null);
      setEditText('');
      setEditRating(0);
    } catch (err) {
      console.error('Error updating review:', err);
      // Bisa tambahkan notifikasi error di sini
    }
  };

  const handleDelete = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  // Delete comment
  const confirmDelete = async () => {
    try {
      await api.deleteReview(commentToDelete);
      setComments(comments.filter(c => c.id !== commentToDelete));
      setShowDeleteModal(false);
      setCommentToDelete(null);
    } catch (err) {
      console.error('Error deleting review:', err);
      // Bisa tambahkan notifikasi error di sini
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  return (
    <div className="boat-details">
      <div className="boat-header">
        <img src={boatDetails.image} alt={boatDetails.name} />
        <h1>{boatDetails.name}</h1>
      </div>

      <div className="boat-info-grid">
        <div className="info-item">
          <h3>Capacity</h3>
          <p>{boatDetails.capacity}</p>
        </div>
        <div className="info-item">
          <h3>Payment Methods</h3>
          <p>{boatDetails.paymentMethods}</p>
        </div>
        <div className="info-item">
          <h3>Price Range</h3>
          <p>{boatDetails.priceRange}</p>
        </div>
        <div className="info-item">
          <h3>Operating Hours</h3>
          <p>{boatDetails.operatingHours}</p>
        </div>
        <div className="info-item">
          <h3>Experience</h3>
          <p>{boatDetails.experience}</p>
        </div>
        <div className="info-item">
          <h3>Facilities</h3>
          <p>{boatDetails.facilities}</p>
        </div>
      </div>

      <div className="boat-description">
        <h2>About this boat</h2>
        <p>{boatDetails.description}</p>
      </div>

      <a 
        href={`https://wa.me/${boatDetails.whatsappNumber}`}
        className="contact-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp /> Contact Owner ({boatDetails.ownerName})
      </a>

      <div className="reviews-section">
        <h2>Reviews</h2>
        
        {/* Form untuk menambah komentar */}
        <form onSubmit={handleSubmitComment} className="review-form">
          <div className="rating-container">
            <p>Your Rating:</p>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="star"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={24}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
          </div>
          
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            required
          />
          <button type="submit" className="submit-button">Submit Review</button>
        </form>

        {/* Daftar komentar */}
        <div className="reviews-list">
          {comments.map((review) => (
            <div key={review.id} className="review-item">
              {editingId === review.id ? (
                // Form Edit Komentar
                <div className="edit-form">
                  <div className="rating-container">
                    <p>Edit Rating:</p>
                    <div className="star-rating">
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <FaStar
                            key={index}
                            className="star"
                            color={ratingValue <= editRating ? "#ffc107" : "#e4e5e9"}
                            size={24}
                            onClick={() => setEditRating(ratingValue)}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-textarea"
                  />
                  <div className="edit-buttons">
                    <button 
                      onClick={() => handleSaveEdit(review.id)}
                      className="save-button"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Tampilan Normal Komentar
                <>
                  <div className="review-header">
                    <span className="review-author">{review.username}</span>
                    <div className="star-display">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="review-content">{review.comment}</p>
                  <div className="review-footer">
                    <span className="review-date">{review.date}</span>
                    {currentUserId === review.userId && (
                      <div className="review-actions">
                        <button 
                          onClick={() => handleEdit(review.id)}
                          className="action-button edit"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="action-button delete"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="last-updated">
        Last updated: {boatDetails.lastUpdated}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Delete Comment</h3>
            <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button 
                onClick={cancelDelete}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="modal-button delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoatDetails;