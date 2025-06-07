const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const TargetController = require('../controllers/TargetController');

router.use(auth); // All routes below are protected

// Target CRUD endpoints
router.get('/', TargetController.getTargets);
router.get('/:id', TargetController.getTarget);
router.post('/', TargetController.create);
router.put('/:id', TargetController.update);
router.delete('/:id', TargetController.remove);

// Status and history endpoints
router.get('/:id/status', TargetController.getStatus);
router.get('/:id/history', TargetController.getHistory);

// Alerts endpoint
router.get('/alerts', TargetController.getAlerts);
router.put('/alerts/:id/read', TargetController.markAlertAsRead);

module.exports = router; // ✅ this must be here
