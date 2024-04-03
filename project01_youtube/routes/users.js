const express = require('express');
const router = express.Router();

router.use(express.json());

const dbConnection = require('../mariadb');
const { body, param, validationResult } = require('express-validator');

const validate = (res, req, next) => {
  const err = validationResult(req);
  //
  if (err.isEmpty()) {
    return next(); // 다음 할 일 (미들웨어, 함수);
  }
  return res.status(400).json(err.array());
};

// 로그인
router.post(
  '/signin',
  [
    body('email').notEmpty().isEmail().withMessage('email 유효성을 확인해주세요'),
    body('password').notEmpty().isString().withMessage('password 유효성을 확인해주세요'),
    validate,
  ],
  (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT  * FROM users WHERE email=? AND password=?`;
    const requiredFields = [email, password];
    dbConnection.query(sql, requiredFields, (err, results) => {
      if (err) {
        return res.status(400).end();
      }

      const userData = results[0];
      if (userData) {
        return res.status(200).json({ status: 200, msg: `${userData.email}님 로그인 성공` });
      }
      return res.status(400).json({ status: 400, msg: `아이디와 비번을 다시 확인해주세요` });
    });
  }
);

//  회원가입
router.post(
  '/signup',
  [
    body('email').notEmpty().isEmail().withMessage('email 유효성을 확인해주세요'),
    body('password').notEmpty().isString().withMessage('password 유효성을 확인해주세요'),
    body('name').notEmpty().isString().withMessage('name 유효성을 확인해주세요'),
    body('tel').notEmpty().isInt().withMessage('tel 유효성을 확인해주세요'),
    validate,
  ],
  (req, res) => {
    const { email, name, password, tel } = req.body;
    const requiredFields = [email, name, password, tel];
    const sql = `INSERT INTO users (email, name, password, tel) VALUES (?, ?, ?, ?)`;

    dbConnection.query(sql, requiredFields, (err, results) => {
      if (err) {
        return res.status(400).end();
      }
      res.status(200).json(results);
    });
  }
);

router
  .route('/users')
  //  회원 개별 조회
  .get(
    [body('email').notEmpty().isEmail().withMessage('email 유효성을 확인해주세요'), validate],
    (req, res) => {
      const { email } = req.body;
      const sql = `SELECT * FROM users WHERE email=?`;

      dbConnection.query(sql, email, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  )
  //  회원 개별 탈퇴
  .delete(
    [body('email').notEmpty().isEmail().withMessage('email 유효성을 확인해주세요'), validate],
    (req, res) => {
      const { email } = req.body;
      const sql = `DELETE FROM users WHERE email=?`;

      dbConnection.query(sql, email, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        if (results.affectedRows == 0) {
          return res.status(404).json({ status: 404, msg: '해당 유저가 존재하지 않습니다.' });
        }
        res.status(200).json({ status: 200, msg: '회원정보가 삭제되었습니다' });
      });
    }
  );

module.exports = router;
