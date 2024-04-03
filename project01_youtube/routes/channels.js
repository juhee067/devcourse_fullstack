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

// "/channels"
router
  .route('/')
  // 채널 전체 조회
  .get(
    [body('userId').notEmpty().isInt().withMessage('userId을 유효성에 맞게 작성해주세요'), validate],
    (req, res, next) => {
      let { userId } = req.body;
      const sql = `SELECT * FROM channels WHERE user_id=?`;

      dbConnection.query(sql, userId, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        if (results.length) {
          return res.status(200).json(results);
        }
        res.status(404).json({ error: '채널을 찾을 수 없습니다.' });
      });
    }
  )

  // 채널 개별 생성

  .post(
    [
      body('userId').notEmpty().isInt().withMessage('userId를 유효성에 맞게 작성해주세요'),
      body('name').notEmpty().isString().withMessage('name를 유효성에 맞게 작성해주세요'),
      validate,
    ],
    (req, res) => {
      let { name, userId } = req.body;
      const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
      const values = [name, userId];

      dbConnection.query(sql, values, (err, _) => {
        if (err) {
          console.log('err : ', err);
          return res.status(500).json({ error: '채널 생성 중에 오류가 발생했습니다.' });
        }
        return res.status(201).json({ msg: '채널이 생성되었습니다.' });
      });
    }
  );

// "/channels/:id"
router
  .route('/:id')
  // 채널 개별 조회
  .get(
    [param('id').notEmpty().withMessage('유효성을 맞춰서 id를 입력해주세요'), validate],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);
      const sql = `SELECT * FROM channels WHERE id = ?`;
      dbConnection.query(sql, id, (err, [results]) => {
        if (err) {
          return res.status(400).end();
        }
        if (results) {
          return res.status(200).json(results);
        }
        res.status(404).json({ msg: '채널이 없습니다' });
      });
    }
  )
  .put(
    [
      param('id').notEmpty().withMessage('유효성을 맞춰서 id를 입력해주세요'),
      body('name').notEmpty().isString().withMessage('유효성을 맞춰서 name을 입력해주세요'),
      validate,
    ],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);
      let { name } = req.body;
      const sql = `UPDATE channels SET name=? WHERE id = ?`;
      let values = [name, id];
      dbConnection.query(sql, values, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        if (results.affectedRows == 0) {
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  )
  .delete(
    [param('id').notEmpty().withMessage('유효성을 맞춰서 id를 입력해주세요'), validate],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);

      const sql = `DELETE FROM channels WHERE id=?`;

      dbConnection.query(sql, id, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        if (results.affectedRows == 0) {
          return res.status(404).json({ status: 404, msg: '해당 채널이 존재하지 않습니다.' });
        }
        res.status(200).json({ status: 200, msg: '채널이 삭제되었습니다.' });
      });
    }
  );

module.exports = router;
