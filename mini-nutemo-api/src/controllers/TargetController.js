// src/controllers/TargetController.js
const TargetModel = require('../models/TargetModel');
const StatusLogModel = require('../models/StatusLogModel');
const AlertModel = require('../models/AlertModel');

const getTargets = async (req, res) => {
  try {
    const targets = await TargetModel.getAllTargetsByUser(req.user.id);
    res.json(targets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTarget = async (req, res) => {
  try {
    const target = await TargetModel.getTargetById(req.params.id, req.user.id);
    if (!target) {
      return res.status(404).json({ error: 'Target not found' });
    }
    res.json(target);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, url } = req.body;
    const targetId = await TargetModel.createTarget(name, url, req.user.id);
    res.status(201).json({ id: targetId, name, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, url, isActive } = req.body;
    await TargetModel.updateTarget(req.params.id, name, url, isActive, req.user.id);
    res.json({ message: 'Target updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await TargetModel.deleteTarget(req.params.id, req.user.id);
    res.json({ message: 'Target deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New status and history methods
const getStatus = async (req, res) => {
  try {
    // Verify target belongs to user
    const target = await TargetModel.getTargetById(req.params.id, req.user.id);
    if (!target) {
      return res.status(404).json({ error: 'Target not found' });
    }

    const status = await StatusLogModel.getLatestStatus(req.params.id);
    res.json(status || { message: 'No status data available' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    // Verify target belongs to user
    const target = await TargetModel.getTargetById(req.params.id, req.user.id);
    if (!target) {
      return res.status(404).json({ error: 'Target not found' });
    }

    const hours = parseInt(req.query.hours) || 24;
    const history = await StatusLogModel.getStatusHistory(req.params.id, hours);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New alerts methods
const getAlerts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const alerts = await AlertModel.getAlertsByUser(req.user.id, limit);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAlertAsRead = async (req, res) => {
  try {
    await AlertModel.markAlertAsRead(req.params.id, req.user.id);
    res.json({ message: 'Alert marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTargets,
  getTarget,
  create,
  update,
  remove,
  getStatus,
  getHistory,
  getAlerts,
  markAlertAsRead
};
