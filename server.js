const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// In-memory storage for guestbook entries
const entries = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// Add a new entry
app.post('/api/entries', (req, res) => {
  const { name, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const entry = {
    id: Date.now(),
    name: name.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };

  entries.unshift(entry); // newest first
  res.status(201).json(entry);
});

app.listen(PORT, () => {
  console.log(`Guestbook running at http://localhost:${PORT}`);
});
