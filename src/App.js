import React, { useState, useEffect } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import './App.css'; // Import your CSS file for styling

const supabaseUrl = 'https://efcqxqnaaocbcnqfodml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmY3F4cW5hYW9jYmNucWZvZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NzA4MjgsImV4cCI6MjAyOTA0NjgyOH0.WJ8oQLlHKUrm1VDa3o98dpnc0omWJZtOUP9Yfee4U38';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [reviews, setReviews] = useState([]);
  const [coffeeImages, setCoffeeImages] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.from('MI449-FinalProject-Reviews').select('*');
        if (error) {
          console.error('Error fetching reviews:', error.message);
        } else {
          console.log('Fetched reviews:', data);
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    const fetchCoffeeImages = async () => {
      try {
        const response = await fetch('https://coffee.alexflipnote.dev/random.json');
        if (!response.ok) {
          throw new Error('Failed to fetch coffee images');
        }
        const data = await response.json();
        setCoffeeImages(Array.from({ length: 3 }, () => data.file));
      } catch (error) {
        console.error(error);
        // Handle error here, e.g., show a message to the user
      }
    };

    fetchReviews();
    fetchCoffeeImages();
  }, []);

  return (
    <div className="container">
      <div className="left-section">
        <header className="header">
          <h1 className="logo">Café Scout</h1>
          <nav className="navigation">
            <ul>
              <li><a href="#">coffee search</a></li>
              <li><a href="#">about</a></li>
              <li><a href="#">login</a></li>
            </ul>
          </nav>
        </header>
        <div className="main-content">
          <h2>Welcome to Café Scout, your friend for finding hole-in-the-wall coffee shops near you!</h2>
          <p>Get started by entering your zip code below</p>
          <div className="cta-container">
            <button className="cta-button">Enter Zip Code</button>
          </div>
          <p>Read reviews from others about their experiences!</p>
          <div className="review-container">
            {reviews.map(review => (
              <div className="review" key={review.id}>
                <h3>{review.name}</h3>
                <p>{review.shop}</p>
                {/* Insert star images here */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="coffee-images">
          {coffeeImages.map((imageUrl, index) => (
            <div className="coffee-image" key={index} style={{ backgroundImage: `url(${imageUrl})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
