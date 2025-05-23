const express = require('express');
const Science = require('../../models/science');
const config = require('../../config/config');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pageSize = config.pageSize;
    const articles = await Science.find({ 'source': { $ne: null } }).sort({ publishedAt: 'desc' }).limit(pageSize).lean();
    if (articles.length) {
      res.status(200).json(articles);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;
