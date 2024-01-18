"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import styles from './dashboard.module.css';
import ResumeDropzone from './ResumeDropzone';

const Dashboard = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [reviewResult, setReviewResult] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleFileUpload = (file) => {
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      const response = await fetch('/api/analyze_resume', {
              method: 'POST',
              body: formData,
              headers: {
                // Note: No need to set 'Content-Type' for FormData as it is automatically set
              },
            });

      const responseData = await response.json();
      setReviewResult(responseData);
    } catch (error) {
      console.error('Error submitting resume:', error);
    }
  };

  return (
    <>
    <Head>
        <title>Career Coach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    <div className={styles['dashboard']}>
      <h1>Resume Reviewer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload your resume:
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {reviewResult && (
        <div>
          <h2>Review Result</h2>
          <p className={styles['score']}>{reviewResult.totalScore}</p>
          <p>{reviewResult.isOnePage ? 'The document is approximately one page.' : 'The document is longer than one page.'}</p>
          <p>{reviewResult.hasSpellingAndGrammar ? 'Spelling and grammar are good.' : 'Spelling or grammar issues found.'}</p>
          <p>{reviewResult.positionsReview ? 'Positions meet criteria.' : 'Positions do not meet criteria.'}</p>
          <p>{reviewResult.hasStartAndEndTime ? 'Start and end times found.' : 'Start or end time not found for all positions.'}</p>
          <p>{reviewResult.hasContactInfo ? 'Contact information found.' : 'No contact information found.'}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Dashboard;
