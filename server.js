const express = require('express');
const formidable = require('formidable');

const server = express();
const mysql = require('mysql2');
const next = require('next');
const bcrypt = require('bcrypt');
require('dotenv').config()
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs').promises;
const pdf = require('pdf-parse');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

const db = mysql.createConnection(process.env.DATABASE_URL)


app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(bodyParser.json());

  // Signup endpoint
  server.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the MySQL database
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error creating user' });
          return;
        }

        res.status(200).json({ success: true });
      }
    );
  });

 server.post('/api/analyze_resume', async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

      // Function to extract text from a resume file
    const extractTextFromResume = async (filePath) => {
      try {
        // Read file asynchronously
        const dataBuffer = await fs.readFile(filePath);

        // Extract text from the PDF using pdf-parse
        const pdfData = await pdf(dataBuffer);

        // 'text' property contains the text content of the PDF
        const text = pdfData.text;

        console.log("TEST", text);

        return text;
      } catch (error) {
        console.error('Error extracting text from resume:', error);
        throw error; // Re-throw the error for the calling function to handle
      }
    };

    // Function to check spelling and grammar (simplified)
    const checkSpellingAndGrammar = (text) => {
      // Your logic to check spelling and grammar (e.g., regex for common issues)
      // This is a simplified example, and you may need a more sophisticated solution for production use
      const commonMistakesRegex = /(manger)|(accomplishements)/i;
      return !commonMistakesRegex.test(text);
    };

    // Function to check if the document is approximately one page
    const isApproximatelyOnePage = (text) => {
      // Your logic to estimate if the document is one page (e.g., based on word count)
      // This is a simplified example and may not cover all cases
      const wordCount = text.split(/\s+/).length;
      console.log("word count: ", wordCount)
      return wordCount <= 250; // Assuming an average of 250 words per page
    };

    // Function to check if each position has three bullet points
    const hasThreeBulletPoints = (text) => {
      // Your logic to check if each position has three bullet points
      // This is a simplified example and may need to be adapted based on your resume format
      const positions = text.match(/(?:\n|^)[\s\u2028\u2029]*•[^\n]*/g);
      return positions ? positions.every(position => position.split('•').length >= 4) : false;
    };

    // Function to check if each position has a start and end time
    const hasStartAndEndTimeForAllPositions = (text) => {
      // Your logic to check if each position has a start and end time
      // This is a simplified example and may need to be adapted based on your resume format
      const positions = text.match(/(?:\n|^)[\s\u2028\u2029]*\d{4}\s*-\s*\d{4}[^\n]*/g);
      return positions ? positions.length > 0 : false;
    };

    // Function to check if the document contains a phone number or email
    const hasPhoneOrEmail = (text) => {
      // Your logic to check if the document contains a phone number or email
      // This is a simplified example using a basic regex
      const phoneOrEmailRegex = /\b(?:\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      return phoneOrEmailRegex.test(text);
    };

    form.parse(req, (err, fields, file) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      console.log("resume", file)

      // Access the resume file
      const resumeFile = file.resume[0].filepath
      extractTextFromResume(resumeFile)
      .then((text) => {
        console.log('Resume Text:', text);
        const hasSpellingAndGrammar = checkSpellingAndGrammar(text);
        console.log("grammar", hasSpellingAndGrammar)
        const isOnePage = isApproximatelyOnePage(text);
        console.log("one page", isOnePage)
        const positionsReview = hasThreeBulletPoints(text);
        console.log("positions", positionsReview)
        const hasStartAndEndTime = hasStartAndEndTimeForAllPositions(text);
        console.log("start end", hasStartAndEndTime)
        const hasContactInfo = hasPhoneOrEmail(text);
        console.log("contact", hasContactInfo)

        const weights = {
          isOnePage: 25,
          hasSpellingAndGrammar: 20,
          positionsReview: 15,
          hasStartAndEndTime: 20,
          hasContactInfo: 20,
        };

        const totalScore =
          isOnePage * weights.isOnePage +
          hasSpellingAndGrammar * weights.hasSpellingAndGrammar +
          positionsReview * weights.positionsReview +
          hasStartAndEndTime * weights.hasStartAndEndTime +
          hasContactInfo * weights.hasContactInfo;

        const reviewResult = {
          isOnePage,
          hasSpellingAndGrammar,
          positionsReview,
          hasStartAndEndTime,
          hasContactInfo,
          totalScore,
        };

       res.json(reviewResult);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


      // Function to check spelling and grammar (simplified)

    });

  } catch (error) {
    console.error('Error processing resume:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // Login endpoint
  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Server error' });
          return;
        }

        if (results.length === 0) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }

        // You may want to create and send a token for session management
        res.status(200).json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
      }
    );
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});