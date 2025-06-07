const authenticateToken = require('./middleware/authMiddleware');

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you accessed a protected route.` });
});
