// src/models/UserModel.js
const db = require('../config/db');

const createUser = async (email, hashedPassword) => {
  try {
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error('Error finding user:', error);
    throw new Error('Failed to find user');
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await db.query(
      'SELECT id, email, webhook_url, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw new Error('Failed to find user');
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById
};