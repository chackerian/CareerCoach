"use client"
import Head from 'next/head';
import styles from './Home.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import PremiumOptions from './premium'
import {Navbar} from './components/Navbar'
import {Loginbtn} from './components/Loginbtn'

const stripePromise = loadStripe("pk_live_6I69qE8NoOi8Q6OxIIy6Wapu");

export default function Home() {

  if (true) {
      return (
        <div className={styles.container}>
          <Head>
            <title>Career Coach</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Navbar />

          <main className={styles.main}>
          <div className={styles.headline}>
            <h1 className="text-8xl pb-12 font-bold">
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
      <a href="/signup" className={`${styles.btn} ${styles['btn-reg']}`}>Sign Up</a>
      <a href="/login" className={`${styles.btn} ${styles['btn-reg']}`}>Login</a>
    </div>

        <PremiumOptions />
        

          <footer>
          </footer>
        </div>
  )

  } else {
      return (
    <div className={styles.container}>
      <Head>
        <title>Career Coach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
      <div className={styles.headline}>
        <h1 className="text-8xl pb-12 font-bold">
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

  {/*  <div className={styles.register}>
      <a href="/login" className={`${styles.btn} ${styles['btn-reg']}`}>Sign Up</a>
      <a href="/login" className={`${styles.btn} ${styles['btn-reg']}`}>Login</a>
    </div>
*/}
    <loginbtn />

    <PremiumOptions />

      <footer>
      </footer>
    </div>
  )

  }

}
