const express = require('express');
const router = express.Router();

// middlewares
const { trackingNumberCheck } = require('../../middlewares/client');

// controllers
const { getCustomer } = require('../../controllers/client');

// Check tracking number existence
router.get('/client/:trackingnumber', trackingNumberCheck, getCustomer);

module.exports = router;
