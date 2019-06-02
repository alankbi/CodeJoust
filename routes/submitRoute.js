const express = require('express');
const request = require('request');

const router = express.Router();

// @route POST /api/submit/
router.post('/', (req, res) => {
  const { code, languageId } = req.body;
  const options = {
    url: 'https://api.judge0.com/submissions',
    form: {
      source_code: code,
      language_id: languageId,
      wait: true,
    },
  };

  request.post(options, (error, response, body) => {
    if (error) {
      res.json(error);
    } else {
      res.json(body);
    }
  });
});

module.exports = router;
