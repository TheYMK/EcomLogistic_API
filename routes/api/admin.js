const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../../middlewares/auth');
// controllers
const {
	create,
	readAll,
	readSingle,
	update,
	remove,
	deliveryStatus,
	deliveryLocation
} = require('../../controllers/admin');

// routes
router.post('/admin/customers', authCheck, adminCheck, create);
router.get('/admin/customers', authCheck, adminCheck, readAll);
router.get('/admin/customers/:id', authCheck, adminCheck, readSingle);
// router.put('/admin/customers/:id', authCheck, adminCheck, update);
router.delete('/admin/customers/:id', authCheck, adminCheck, remove);

// update customer delivery location
router.put('/admin/customers/:id/delivery-location', authCheck, adminCheck, deliveryLocation);
// update customer delivery status
router.put('/admin/customers/:id/delivery-status', authCheck, adminCheck, deliveryStatus);
module.exports = router;
