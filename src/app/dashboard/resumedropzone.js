// components/ResumeDropzone.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ResumeDropzone = ({ onFileUpload, isSubmitted }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the dropped files (you can pass them to the parent component)
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf, .doc, .docx', // Specify accepted file types
    disabled: isSubmitted, // Disable dropzone when a submission has occurred
  });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>
        {isSubmitted
          ? 'Resume submitted successfully!'
          : 'Drag \'n\' drop your resume file here, or click to select files'}
      </p>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ResumeDropzone;