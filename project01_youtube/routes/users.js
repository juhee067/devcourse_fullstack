const express = require('express');
const router = express.Router();
router.use(express.json());

const dbConnection = require('../mariadb');

// 로그인
router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT  * FROM users WHERE email=? AND password=?`;

  dbConnection.query(sql, [email, password], (_, results) => {
    const userData = results[0];
    if (userData) {
      return res.status(200).json({ status: 200, msg: `${userData.email}님 로그인 성공` });
    }
    return res.status(400).json({ status: 400, msg: `아이디와 비번을 다시 확인해주세요` });
  });
});

//  회원가입
router.post('/signup', (req, res) => {
  const { email, name, password, tel } = req.body;
  const requiredFields = [email, name, password, tel];
  const sql = `INSERT INTO users (email, name, password, tel) VALUES (?, ?, ?, ?)`;

  if (requiredFields.some((field) => !field)) {
    return res.status(400).json({ status: 400, msg: '모든 필드를 입력해주세요.' });
  }
  dbConnection.query(sql, requiredFields, (_, result) => {
    console.log(result);
    res.status(200).json({ status: 200 });
  });
});

router
  .route('/users')
  //  회원 개별 조회
  .get((req, res) => {
    const { email } = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;

    dbConnection.query(sql, email, (_, results) => {
      if (results) {
        return res.status(200).json({ status: 200, results: results });
      }
      res.status(404).json({ status: 404, msg: '해당 유저가 존재하지 않습니다.' });
    });
  })
  //  회원 개별 탈퇴
  .delete((req, res) => {
    const { email } = req.body;
    const sql = `DELETE FROM users WHERE email=?`;

    dbConnection.query(sql, email, (_, results) => {
      if (results) {
        return res.status(200).json({ status: 200, msg: '회원정보가 삭제되었습니다.' });
      }
      res.status(404).json({ status: 404, msg: '해당 유저가 존재하지 않습니다.' });
    });
  });

module.exports = router;
