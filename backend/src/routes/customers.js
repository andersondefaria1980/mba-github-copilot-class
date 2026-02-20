const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.get('/', customersController.getAll);
router.post('/', customersController.create);
router.put('/:id', customersController.update);

module.exports = router;
