const db = require('../config/db');

const createAlert = async (targetId, userId, type, message) => {
  const [result] = await db.query(
    'INSERT INTO alerts (target_id, user_id, type, message) VALUES (?, ?, ?, ?)',
    [targetId, userId, type, message]
  );
  return result.insertId;
};

const getAlertsByUser = async (userId, limit = 50) => {
  const [rows] = await db.query(
    `SELECT a.*, t.name as target_name, t.url as target_url 
     FROM alerts a 
     JOIN targets t ON a.target_id = t.id 
     WHERE a.user_id = ? 
     ORDER BY a.created_at DESC 
     LIMIT ?`,
    [userId, limit]
  );
  return rows;
};

const markAlertAsRead = async (alertId, userId) => {
  await db.query(
    'UPDATE alerts SET is_read = TRUE WHERE id = ? AND user_id = ?',
    [alertId, userId]
  );
};

module.exports = {
  createAlert,
  getAlertsByUser,
  markAlertAsRead
}; 