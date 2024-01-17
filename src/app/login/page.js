"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import styles from './Login.module.css';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post('/api/login', formData);
      if (response.status >= 200 && response.status < 300) {
        router.push('/dashboard');
      }
      console.log('Login Successful:', response.data);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <>
    <Head>
      <title>Career Coach</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <div className={styles['login-container']}>
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
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
        <button className={styles['login-button']} type="submit">
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;