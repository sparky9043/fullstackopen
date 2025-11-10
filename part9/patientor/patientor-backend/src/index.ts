import app from './app';

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.json({ success: 'route setup successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});