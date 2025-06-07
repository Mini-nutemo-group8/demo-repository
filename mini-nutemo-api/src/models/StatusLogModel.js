const db = require('../config/db');

const createStatusLog = async (targetId, statusCode, latencyMs, isSuccess, errorMessage) => {
  const [result] = await db.query(
    'INSERT INTO status_logs (target_id, status_code, latency_ms, is_success, error_message) VALUES (?, ?, ?, ?, ?)',
    [targetId, statusCode, latencyMs, isSuccess, errorMessage]
  );
  return result.insertId;
};

const getLatestStatus = async (targetId) => {
  const [rows] = await db.query(
    'SELECT * FROM status_logs WHERE target_id = ? ORDER BY created_at DESC LIMIT 1',
    [targetId]
  );
  return rows[0];
};

const getStatusHistory = async (targetId, hours = 24) => {
  const [rows] = await db.query(
    'SELECT * FROM status_logs WHERE target_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? HOUR) ORDER BY created_at DESC',
    [targetId, hours]
  );
  return rows;
};

module.exports = {
  createStatusLog,
  getLatestStatus,
  getStatusHistory
}; 