"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import styles from './signup.module.css';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your signup API endpoint
      const response = await axios.post('/api/signup', formData);
      console.log('Signup Successful:', response.data);
      if (response.status >= 200 && response.status < 300) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  return (
    <>
    <Head>
      <title>Career Coach</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <div className={styles['signup-container']}>
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className={styles['input-field']}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            className={styles['input-field']}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            className={styles['input-field']}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button className={styles['signup-button']} type="submit">
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
};

export default Signup;