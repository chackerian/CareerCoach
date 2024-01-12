"use client";
// Import necessary modules and components
import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [resumeFile, setResumeFile] = useState(null);  // Update state to handle file
  const [reviewResult, setReviewResult] = useState(null);

  const handleFileChange = (e) => {
    // Update state when file input changes
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleReview = async () => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('resume', resumeFile);

      // Use axios for file upload
      const response = await fetch('/api/analyze_resume', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response JSON
    const responseData = await response.json();

      // Set review result based on the response
      setReviewResult(responseData);
    } catch (error) {
      console.error("error", error);
      // Handle error appropriately
    }
  };

  return (
    <>
      <Head>
        <title>Career Coach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>
        <h1>Resume Reviewer</h1>
        {/* Use input type file for resume upload */}
        <input type="file" onChange={handleFileChange} />

        {/* Additional UI elements as needed */}
        <button onClick={handleReview}>Review Resume</button>

        {reviewResult && (
          <div>
            <p>Review Result:</p>
            <p>Is 1 page: {reviewResult.isValid ? 'Yes' : 'No'}</p>
            <p>Grammar and Spelling: {reviewResult.grammarCheckResult}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
