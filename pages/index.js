import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import PremiumOptions from './premium'

const stripePromise = loadStripe("pk_live_6I69qE8NoOi8Q6OxIIy6Wapu");

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Career Coach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div className={styles.headline}>
        <h1 className={styles.title}>
          Welcome to CareerCoach
        </h1>

        <p className={styles.description}>
          We help you find your next role with custom strategies tailored to your profile
        </p>
      </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>1. Analysis</h3>
            <p>Enter your credentials into the system and get a personalized review of your profile</p>
          </div>

          <div className={styles.card}>
            <h3>2. Review Suggestions</h3>
            <p>View custom solutions and suggestions to enhance your profile</p>
          </div>

          <div className={styles.card}>
            <h3>3. Optimization and Open Positions</h3>
            <p>Apply solutions to your profile and view jobs tailored to you</p>
          </div>
        </div>
      </main>

    <div className={styles.register}>
      <a href="/login" className={`${styles.btn} ${styles['btn-reg']}`}>Sign Up</a>
      <a href="/login" className={`${styles.btn} ${styles['btn-reg']}`}>Login</a>
    </div>

    <PremiumOptions />

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          padding-bottom: 0 !important;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
