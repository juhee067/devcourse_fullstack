const pool = require('../db');
const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateToken = (email, name) => {
  return jwt.sign({ email, name }, process.env.PRIVATE_KEY, {
    expiresIn: '5m',
    issuer: 'juhee',
  });
};

const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
};

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const sql = `INSERT INTO users (email, password, username, salt) VALUES (?, ?, ?, ?)`;

  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPwd = hashPassword(password, salt);
  const userData = [email, hashPwd, username, salt];
  try {
    await pool.execute(sql, userData);
    res.status(StatusCodes.CREATED).json({ msg: '회원가입이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ msg: '회원가입 중에 문제가 발생했습니다.' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email=?`;
  try {
    const [results] = await pool.execute(sql, [email]);
    const user = results[0];
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: 401, msg: `아이디와 비번을 다시 확인해주세요` });
    }

    const hashPwd = hashPassword(password, user.salt);
    if (user.password === hashPwd) {
      const token = generateToken(email, password);
      res.cookie('token', token, { httpOnly: true });
      return res.status(StatusCodes.OK).json({ status: 200, results: user });
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: 401, msg: `아이디와 비번을 다시 확인해주세요` });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: '로그인 중에 문제가 발생했습니다.' });
  }
};

const reqPasswordReset = async (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * FROM users WHERE email=?`;
  try {
    const results = await pool.execute(sql, [email]);
    const userData = results[0];
    if (userData) {
      return res.status(StatusCodes.OK).json({ email: email, msg: '비밀번호 초기화가 요청됐습니다.' });
    }
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: '비밀번호 초기화 요청에 실패 했습니다.' });
  } catch (error) {
    res.status(500).json({ msg: '비밀번호 초기화 요청 중에 문제가 발생했습니다.' });
  }
};

const passwordReset = async (req, res) => {
  const { password, email } = req.body;

  const sql = `UPDATE users SET password = ?, salt=? WHERE email = ?`;

  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPwd = hashPassword(password, salt);
  const userData = [hashPwd, salt, email];
  try {
    const results = await pool.execute(sql, userData);
    const value = results[0];

    if (value.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: '해당 유저가 존재하지않습니다.' });
    }
    res.status(StatusCodes.OK).json({ msg: '비밀번호가 초기화됐습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: '비밀번호 초기화 중에 문제가 발생했습니다.' });
  }
};

module.exports = { signup, signin, reqPasswordReset, passwordReset };
// 최주희
