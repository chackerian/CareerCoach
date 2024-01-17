"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import styles from './product.module.css';

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
    <div className={styles.product}>
      <h1>Resume Reviewer</h1>
      <p>
        Our Resume Reviewer service helps you optimize your resume for success in job applications.
        Submit your resume, and our experienced team of reviewers will provide constructive feedback
        to enhance your chances of landing your dream job.
      </p>
      <h2>How it works:</h2>
      <ol>
        <li>Upload your resume through the submission form.</li>
        <li>Our team will carefully review your resume.</li>
        <li>You'll receive detailed feedback on areas for improvement.</li>
        <li>Make the suggested enhancements to strengthen your resume.</li>
        <li>Experience improved chances of getting noticed by employers.</li>
      </ol>
    </div>
    </>
  );
};

export default Signup;