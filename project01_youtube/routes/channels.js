const express = require('express');
const router = express.Router();

router.use(express.json());
const dbConnection = require('../mariadb');
let db = new Map();
let id = 1;

// "/channels"
router
  .route('/')
  // 채널 전체 조회
  .get((req, res) => {
    let { userId } = req.body;
    const sql = `SELECT * FROM channels WHERE user_id=?`;

    if (!userId) {
      return res.status(200).json({ msg: '데이터를 작성해주세요' });
    }

    dbConnection.query(sql, userId, (_, results) => {
      if (results.length) {
        return res.status(200).json(results);
      }
      return notFoundChannel(res);
    });
  })
  // 채널 개별 생성
  .post((req, res) => {
    let { name, userId } = req.body;
    const values = [name, userId];
    const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;

    if (!name || !userId) {
      return res.status(404).json({ msg: '잘못된 데이터입니다.' });
    }
    dbConnection.query(sql, values, () => {
      return res.status(201).json({ msg: '채널이 생성되었습니다.' });
    });
  });

// "/channels/:id"
router
  .route('/:id')
  // 채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const sql = `SELECT * FROM channels WHERE id = ?`;
    dbConnection.query(sql, id, (_, [results]) => {
      if (results) {
        return res.status(200).json(results);
      }
      return notFoundChannel(res);
    });
  })
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    if (channel) {
      const newTitle = req.body.channelTitle;
      const preChannel = channel.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);
      return res.status(200).json({
        status: 200,
        msg: `${preChannel} 채널명이 ${newTitle} 채널 명으로 성공적으로 수정됐습니다.`,
      });
    }
    notFoundChannel();
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    if (channel) {
      db.delete(id);
      return res.status(200).json({
        status: 200,
        msg: `${channel.channelTitle} 채널명이 성공적으로 삭제됐습니다.`,
      });
    }
    notFoundChannel();
  });

function notFoundChannel(res) {
  res.status(404).json({ status: 404, msg: '해당 채널을 찾을 수 없습니다.' });
}

module.exports = router;
