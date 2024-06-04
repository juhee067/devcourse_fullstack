import pool from '../db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userService = {
  generateToken: (id, email, name) => {
    return jwt.sign({ id, email, name }, process.env.PRIVATE_KEY, {
      expiresIn: '1h',
      issuer: 'juhee',
    });
  },
  hashPassword: (req, salt) => {
    const { password } = req.body;
    return crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
  },
  signup: async (req, res) => {
    const { email, password, username } = req.body;
    const sql = `INSERT INTO users (email, password, username, salt) VALUES (?, ?, ?, ?)`;

    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPwd = hashPassword(password, salt);
    const userData = [email, hashPwd, username, salt];

    const result = await pool.execute(sql, userData);
    return result[0];
  },

  verifyUser: async (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;
    const [results] = await pool.execute(sql, [email]);
    return [results];
  },

  reqPasswordReset: async (req, res) => {
    const { email } = req.body;

    const sql = `SELECT * FROM users WHERE email=?`;
    const results = await pool.execute(sql, [email]);
    return results[0];
  },

  passwordReset: async (req) => {
    const { email, password } = req.body;

    const sql = `UPDATE users SET password = ?, salt=? WHERE email = ?`;
    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPwd = hashPassword(password, salt);
    const userData = [hashPwd, salt, email];
    const results = await pool.execute(sql, userData);
    return results[0];
  },
};
export default userService;
