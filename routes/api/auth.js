const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../../middlewares/auth');
// controllers
const { createOrUpdateUser, currentUser } = require('../../controllers/auth');

// User Routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);

// ADMIN ROUTES
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
