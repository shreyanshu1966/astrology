const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

/**
 * @route POST /api/contact/send-message
 * @desc Send contact form message
 * @access Public
 */
router.post('/send-message', contactController.sendMessage);

/**
 * @route GET /api/contact/info
 * @desc Get contact information
 * @access Public
 */
router.get('/info', contactController.getContactInfo);

module.exports = router;