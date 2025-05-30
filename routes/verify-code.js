const express = require('express');
const router = express.Router();

const script = require("../scripts/executeUserCode")
router.post('/', script);

module.exports = router;
