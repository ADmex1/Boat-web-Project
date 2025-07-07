import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './ReviewSection.css';

function ReviewSection({ boatId }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(5);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userHasReviewed, setUserHasReviewed] = useState(false);

    // Fetch reviews
    useEffect(() => {
        fetchReviews();
    }, [boatId]);

    const fetchReviews = async () => {
        try {
            const response = await api.get(`/boats/${boatId}/reviews`);
            setReviews(response.data);
            // Check if current user has already reviewed
            setUserHasReviewed(response.data.some(review => review.user_id === user?.id));
            setError(null);
        } catch (err) {
            setError('Failed to load reviews');
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    // Post new review
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/boats/${boatId}/reviews`, {
                comment: newReview,
                rating: rating
            });
            setReviews([response.data.review, ...reviews]);
            setNewReview('');
            setRating(5);
            setUserHasReviewed(true);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post review');
            console.error('Error posting review:', err);
        }
    };

    // Update review
    const handleUpdate = async (reviewId) => {
        try {
            const reviewToUpdate = reviews.find(r => r.id === reviewId);
            const response = await api.put(`/reviews/${reviewId}`, {
                comment: reviewToUpdate.editContent || reviewToUpdate.comment,
                rating: reviewToUpdate.editRating || reviewToUpdate.rating
            });
            
            setReviews(reviews.map(r => 
                r.id === reviewId ? response.data.review : r
            ));
            setEditingId(null);
            setError(null);
        } catch (err) {
            setError('Failed to update review');
            console.error('Error updating review:', err);
        }
    };

    // Delete review
    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        
        try {
            await api.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter(r => r.id !== reviewId));
            setUserHasReviewed(false);
            setError(null);
        } catch (err) {
            setError('Failed to delete review');
            console.error('Error deleting review:', err);
        }
    };

    // Start editing
    const startEdit = (review) => {
        setReviews(reviews.map(r => {
            if (r.id === review.id) {
                return {
                    ...r,
                    editContent: r.comment,
                    editRating: r.rating
                };
            }
            return r;
        }));
        setEditingId(review.id);
    };

    return (
        <div className="review-section">
            <h3>Reviews</h3>
            
            {/* Review Form - Only show if user hasn't reviewed yet */}
            {!userHasReviewed && (
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="rating-input">
                        <label>Rating:</label>
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        required
                    />
                    <button type="submit">Post Review</button>
                </form>
            )}

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Reviews List */}
            <div className="reviews-list">
                {loading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="review">
                            <div className="review-header">
                                <span className="username">{review.user.username}</span>
                                <span className="rating">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </span>
                            </div>
                            
                            {editingId === review.id ? (
                                // Edit Form
                                <div className="edit-form">
                                    <select
                                        value={review.editRating}
                                        onChange={(e) => setReviews(reviews.map(r => 
                                            r.id === review.id 
                                                ? {...r, editRating: Number(e.target.value)} 
                                                : r
                                        ))}
                                    >
                                        {[5,4,3,2,1].map(num => (
                                            <option key={num} value={num}>{num} Stars</option>
                                        ))}
                                    </select>
                                    <textarea
                                        value={review.editContent}
                                        onChange={(e) => setReviews(reviews.map(r => 
                                            r.id === review.id 
                                                ? {...r, editContent: e.target.value} 
                                                : r
                                        ))}
                                    />
                                    <div className="edit-actions">
                                        <button onClick={() => handleUpdate(review.id)}>
                                            Save
                                        </button>
                                        <button onClick={() => setEditingId(null)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="review-content">{review.comment}</p>
                                    {user && user.id === review.user_id && (
                                        <div className="review-actions">
                                            <button onClick={() => startEdit(review)}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(review.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ReviewSection; 