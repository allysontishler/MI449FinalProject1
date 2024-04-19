import React, { useState, useEffect } from 'react';
import './App.css'; 

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://efcqxqnaaocbcnqfodml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmY3F4cW5hYW9jYmNucWZvZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NzA4MjgsImV4cCI6MjAyOTA0NjgyOH0.WJ8oQLlHKUrm1VDa3o98dpnc0omWJZtOUP9Yfee4U38';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [reviews, setReviews] = useState([]);
  const [quoteOne, setQuoteOne] = useState('');
  const [quoteTwo, setQuoteTwo] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.from('reviews').select('*');
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

    const fetchQuotes = async () => {
      try {
        const { data, error } = await supabase.from('quotes').select('*');
        if (error) {
          console.error('Error fetching quotes:', error.message);
        } else {
          console.log('Fetched quotes:', data);
          setQuoteOne(data[0]?.quote || '');
          setQuoteTwo(data[1]?.quote || '');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error.message);
      }
    };

    fetchReviews();
    fetchQuotes();
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
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right-section">
        <div className="quotes">
          <div className="quote-green">{quoteOne}</div>
          <div className="quote-brown">{quoteTwo}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
