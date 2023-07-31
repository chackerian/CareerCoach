import styles from '../styles/Home.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_live_6I69qE8NoOi8Q6OxIIy6Wapu");

const Premium = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
      });

      var responseClone; // 1
      fetch('/api/checkout_sessions', {
        method: 'POST'
      })
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(function (data) {
            // Do something with data
        }, function (rejectionReason) { // 3
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
            .then(function (bodyText) {
                console.log('Received the following instead of valid JSON:', bodyText); // 6
            });
        });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const session = await response.json();
      // Rest of the code to handle the session data and redirect to checkout
    } catch (error) {
      console.error('Error during fetch:', error);
    }

      setLoading(false);
    }

  return (
    <div>
      <h1>Choose Your Premium Option</h1>
      <div className={styles['premium-options-container']}>

        <div className={styles['premium-option']}>
          <h2>Option 1: Gold Package</h2>
          <p>Get exclusive access to all premium features and content for just $29.99 per month.</p>
          <ul>
            <li>Unlimited downloads</li>
            <li>Ad-free experience</li>
            <li>Priority customer support</li>
            <li>Early access to new releases</li>
          </ul>
          <button onClick={handleCheckout} disabled={loading} className={`${styles.btn} ${styles['btn-gold']}`}>Subscribe Now</button>
        </div>

        <div className={styles['premium-option']}>
          <h2>Option 2: Platinum Package</h2>
          <p>Upgrade to our Platinum Package for $49.99 per month and enjoy even more benefits.</p>
          <ul>
            <li>All Gold Package features</li>
            <li>Exclusive access to premium events</li>
            <li>Personalized recommendations</li>
            <li>Special offers and discounts</li>
          </ul>
          <button onClick={handleCheckout} disabled={loading} className={`${styles.btn} ${styles['btn-platinum']}`}>Upgrade Now</button>
        </div>

        <div className={styles['premium-option']}>
          <h2>Option 3: Diamond Package</h2>
          <p>For the ultimate experience, choose our Diamond Package for $99.99 per month.</p>
          <ul>
            <li>All Platinum Package features</li>
            <li>One-on-one coaching sessions</li>
            <li>Customizable user interface</li>
            <li>Exclusive merchandise</li>
          </ul>
          <button onClick={handleCheckout} disabled={loading} className={`${styles.btn} ${styles['btn-diamond']}`}>Upgrade to Diamond</button>
        </div>

      </div>
    </div>

  )}

const PremiumOptions = () => {
  return (
    <Elements stripe={stripePromise}>
      <Premium />
    </Elements>
  );
};

export default PremiumOptions;