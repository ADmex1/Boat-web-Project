import React from 'react';
import { FaAnchor, FaUsers, FaRegClock, FaRegHandshake } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiHappyBeaming } from 'react-icons/bi';
import './About.css';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
function About() {
  const navigate = useNavigate();

  const handleViewBoats = () => {
    navigate('/boats');
  };
//   const handleViewBoats = () => {
  const features = [
    {
      icon: <FaAnchor />,
      title: "Professional Service",
      description: "Our experienced boat operators ensure a safe and enjoyable dolphin watching experience."
    },
    {
      icon: <FaUsers />,
      title: "Local Community",
      description: "We work directly with local boat owners to support the Lovina Beach community."
    },
    {
      icon: <FaRegClock />,
      title: "Timely Tours",
      description: "Early morning tours scheduled at the perfect time to spot dolphins in their natural habitat."
    },
    {
      icon: <MdSecurity />,
      title: "Safety First",
      description: "All our boats are equipped with proper safety equipment and maintained regularly."
    },
    {
      icon: <FaRegHandshake />,
      title: "Fair Pricing",
      description: "Transparent pricing with no hidden fees, supporting local business directly."
    },
    {
      icon: <BiHappyBeaming />,
      title: "Memorable Experience",
      description: "Create unforgettable memories with our guided dolphin watching tours."
    }
  ];

  return (
    <div className="about">
      <div className="about-hero">
        <h1>About LoviBoats</h1>
        <p className="subtitle">Connecting Tourists with Local Boat Operators Since 2020</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>
              At LoviBoats, we strive to provide unforgettable dolphin watching experiences 
              while supporting the local community of Lovina Beach. Our platform connects 
              tourists with experienced local boat operators, ensuring both quality service 
              and sustainable tourism.
            </p>
          </div>
          <div className="image-container">
            <img 
              src="/images/about/about-mission.jpg" 
              alt="Lovina Beach Boats" 
              className="mission-image"
            />
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="story-section">
          <div className="image-container">
            <img 
              src="/images/about/about-story.jpg" 
              alt="Dolphin watching experience" 
              className="story-image"
            />
          </div>
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              Starting as a small initiative to help local boat operators during 
              challenging times, LoviBoats has grown into a trusted platform connecting 
              tourists with authentic dolphin watching experiences. We work closely with 
              the local community to preserve traditional practices while embracing modern 
              booking convenience.
            </p>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready for an Adventure?</h2>
          <p>Join us for an unforgettable dolphin watching experience at Lovina Beach</p>
          <button onClick={handleViewBoats} className="cta-button">View Our Boats</button>
        </section>
      </div>
    </div>
  );
}

export default About;