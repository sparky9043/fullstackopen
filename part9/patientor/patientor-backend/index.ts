import express from 'express';

const app = express();

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.json({ success: 'route set up successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});