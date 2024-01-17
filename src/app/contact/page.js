"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import styles from './contact.module.css';

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
     <div className={styles.contact}>
      <h1>Contact Us</h1>
      <p>
        Feel free to reach out to us with any questions or concerns.
      </p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message"></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Signup;