const express = require('express');
const mysql = require('mysql2');
const next = require('next');
const bcrypt = require('bcrypt');
require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

const db = mysql.createConnection(process.env.DATABASE_URL)

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

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