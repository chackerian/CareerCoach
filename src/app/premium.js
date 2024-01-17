"use client"
import styles from './Home.module.css';
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

  async function checkout(product){
    let stripePromise = null

    const getStripe = () => {
      if(!stripePromise) {
        stripePromise = loadStripe("pk_live_6I69qE8NoOi8Q6OxIIy6Wapu");
      }
      return stripePromise
    }

    const stripe = await getStripe()

    await stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [
                  {
                    price: product,
                    quantity: 1
                  }
                ],
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin
    })

  }

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
      <div className={styles['premium-options-container']}>

        <div className={styles['premium-option']}>
          <h2>Gold Package</h2>
          <p>Get exclusive access to all premium features and content for just $29.99 per month.</p>
          <ul>
            <li>Unlimited Resume reviews</li>
            <li>Ad-free experience</li>
            <li>Priority customer support</li>
            <li>Early access to new releases</li>
          </ul>
          <button onClick={() => checkout("price_1NZQu6Hft0j4NeZgTBexSceN")} disabled={loading} className={`${styles['btn-gold']}`}>Purchase Subscription</button>
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