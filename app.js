const express = require("express");
const bodyParser = require('body-parser');
const { pool, initDB } = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize database on startup
initDB();

// Routes
app.get("/", (req, res) => res.type('html').send(homePageHtml));

app.get("/contacts", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.type('html').send(contactsPageHtml(result.rows));
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).send('Error fetching contacts');
  }
});

app.post("/contacts", async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.redirect('/contacts');
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).send('Error saving contact');
  }
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const sharedStyles = `
  <style>
    @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
    @font-face {
      font-family: "neo-sans";
      src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
      font-style: normal;
      font-weight: 700;
    }
    html {
      font-family: neo-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    body {
      background: #f8fafc;
      margin: 0;
      padding: 20px;
      color: #334155;
      font-weight: 400;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }
    h2 {
      font-size: 1.125rem;
      font-weight: 500;
      color: #374151;
      margin: 1.5rem 0 1rem 0;
    }
    p {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0 0 1rem 0;
    }
    .nav {
      margin-bottom: 1.5rem;
      text-align: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }
    .nav a {
      margin: 0 0.25rem;
      color: #6366f1;
      text-decoration: none;
      padding: 0.375rem 0.75rem;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.2s;
      display: inline-block;
    }
    .nav a:hover {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
    }
    .form-group {
      margin-bottom: 0.875rem;
    }
    label {
      display: block;
      margin-bottom: 0.375rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.8rem;
    }
    input, textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.8rem;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }
    button {
      background: #6366f1;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-family: inherit;
      font-weight: 500;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover {
      background: #4f46e5;
    }
    .contact-item {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 0.875rem;
      margin-bottom: 0.875rem;
      background: #fafbfc;
    }
    .contact-name {
      font-weight: 600;
      color: #6366f1;
      font-size: 0.9rem;
      margin-bottom: 0.375rem;
    }
    .contact-field {
      margin-bottom: 0.25rem;
      font-size: 0.8rem;
    }
    .contact-field strong {
      color: #374151;
    }
    .contact-message {
      margin: 0.5rem 0;
      padding: 0.625rem;
      background: white;
      border-radius: 4px;
      font-size: 0.8rem;
      border-left: 3px solid #6366f1;
    }
    .contact-date {
      font-size: 0.7rem;
      color: #6b7280;
      margin-top: 0.375rem;
    }
    .back-link {
      color: #6366f1;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .empty-state {
      text-align: center;
      padding: 1.5rem;
      color: #6b7280;
    }
    .empty-state p {
      font-size: 0.875rem;
    }
    .empty-state a {
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.8rem;
    }
    .empty-state a:hover {
      text-decoration: underline;
    }
  </style>
`;

const homePageHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Express + PostgreSQL on Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    ${sharedStyles}
  </head>
  <body>
    <div class="container">
      <div class="nav">
        <a href="/">Home</a>
        <a href="/contacts">View Contacts</a>
      </div>
      
      <h1>Express + PostgreSQL</h1>
      <p>A simple contact form demo that saves to a PostgreSQL database.</p>
      
      <h2>Submit a Contact Form</h2>
      <form action="/contacts" method="POST">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" required placeholder="Your message here..."></textarea>
        </div>
        
        <button type="submit">Submit Contact</button>
      </form>
    </div>
  </body>
</html>
`;

const contactsPageHtml = (contacts) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Contacts - Express + PostgreSQL</title>
    ${sharedStyles}
  </head>
  <body>
    <div class="container">
      <div class="nav">
        <a href="/">Home</a>
        <a href="/contacts">View Contacts</a>
      </div>
      
      <h1>Contact Submissions</h1>
      
      ${contacts.length === 0 ? 
        '<div class="empty-state"><p>No contacts submitted yet.</p><a href="/">Submit the first one!</a></div>' :
        contacts.map(contact => `
          <div class="contact-item">
            <div class="contact-name">${escapeHtml(contact.name)}</div>
            <div class="contact-field"><strong>Email:</strong> ${escapeHtml(contact.email)}</div>
            <div class="contact-message">${escapeHtml(contact.message)}</div>
            <div class="contact-date">Submitted ${new Date(contact.created_at).toLocaleString()}</div>
          </div>
        `).join('')
      }
      
      <p><a href="/" class="back-link">← Back to Home</a></p>
    </div>
  </body>
</html>
`;

// Utility function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
