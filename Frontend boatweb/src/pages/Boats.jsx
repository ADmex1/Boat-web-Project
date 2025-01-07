import React from 'react';
import { Link } from 'react-router-dom';
import './Boats.css';

function Boats() {
  const boats = [
    {
      id: 1,
      name: "Dolphin Seeker I",
      capacity: "8 persons",
      image: "/images/boats/boat1.jpg",
      description: "Perfect for small groups and families"
    },
    {
      id: 2,
      name: "Ocean Explorer",
      capacity: "12 persons",
      image: "/images/boats/boat2.jpg",
      description: "Ideal for medium-sized groups"
    },
    {
      id: 3,
      name: "Lovina Star",
      capacity: "10 persons",
      image: "/images/boats/boat3.jpg",
      description: "Traditional boat with modern comfort"
    },
    {
      id: 4,
      name: "Sunrise Voyager",
      capacity: "15 persons",
      image: "/images/boats/boat4.jpg",
      description: "Large boat with premium facilities"
    },
    {
      id: 5,
      name: "Dolphin Watch Pro",
      capacity: "6 persons",
      image: "/images/boats/boat5.jpg",
      description: "Intimate experience for small groups"
    },
    {
      id: 6,
      name: "Bali Explorer",
      capacity: "20 persons",
      image: "/images/boats/boat6.jpg",
      description: "Perfect for large groups and events"
    }
  ];

  return (
    <div className="boats-container">
      <h1>Our Boats</h1>
      <div className="boats-grid">
        {boats.map((boat) => (
          <div key={boat.id} className="boat-card">
            <img src={boat.image} alt={boat.name} />
            <div className="boat-info">
              <h3>{boat.name}</h3>
              <p className="capacity">Capacity: {boat.capacity}</p>
              <p className="description">{boat.description}</p>
              <Link to={`/boats/${boat.id}`} className="details-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boats;