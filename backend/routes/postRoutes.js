const express = require('express');
const router = express.Router();

// Dummy route for posts
router.get('/', (req, res) => {
  res.json({ message: 'Posts route working!' });
});

module.exports = router;