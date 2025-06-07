// src/models/TargetModel.js
const db = require('../config/db');

const getAllTargetsByUser = async (userId) => {
  const [rows] = await db.query('SELECT * FROM targets WHERE user_id = ?', [userId]);
  return rows;
};

// Add this new function
const getAllActiveTargets = async () => {
  const [rows] = await db.query('SELECT * FROM targets WHERE is_active = TRUE');
  return rows;
};

const getTargetById = async (id, userId) => {
  const [rows] = await db.query('SELECT * FROM targets WHERE id = ? AND user_id = ?', [id, userId]);
  return rows[0];
};

const createTarget = async (name, url, userId) => {
  const [result] = await db.query(
    'INSERT INTO targets (name, url, user_id) VALUES (?, ?, ?)',
    [name, url, userId]
  );
  return result.insertId;
};

const updateTarget = async (id, name, url, isActive, userId) => {
  await db.query(
    'UPDATE targets SET name = ?, url = ?, is_active = ? WHERE id = ? AND user_id = ?',
    [name, url, isActive, id, userId]
  );
};

const updateExpiryInfo = async (id, sslDaysToExpiry, domainDaysToExpiry) => {
  await db.query(
    'UPDATE targets SET ssl_days_to_expiry = ?, domain_days_to_expiry = ? WHERE id = ?',
    [sslDaysToExpiry, domainDaysToExpiry, id]
  );
};

const deleteTarget = async (id, userId) => {
  await db.query('DELETE FROM targets WHERE id = ? AND user_id = ?', [id, userId]);
};

module.exports = {
  getAllTargetsByUser,
  getAllActiveTargets, // Export the new function
  getTargetById,
  createTarget,
  updateTarget,
  updateExpiryInfo,
  deleteTarget
};