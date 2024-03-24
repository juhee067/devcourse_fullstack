const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());

// db 설정
let db = new Map();
let id = 1;

// 로그인
app.post('/signin', (req, res) => {
  const userData = req.body;
  res.status(200).json({ status: '200', msg: `${req.body.userId}님 로그인 성공` });
});

//  회원가입
app.post('/signup', (req, res) => {
  const userData = req.body;

  if (userData.name) {
    return res.status(201).json({ status: '200', msg: `${userData.name}님 회원가입 성공` });
  }

  db.set(id++, userData);
  res.status(400).json({ status: '400', msg: '데이터를 입력해주세요' });
});

//  회원 개별 조회
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.get(parseInt(id));
  if (user) {
    return res.status(200).json({ status: '200', userId: user.userId, name: user.name });
  }
  res.status(404).json({ status: '400', msg: '해당 유저가 존재하지 않습니다.' });
});

//  회원 개별 탈퇴
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.get(parseInt(id));

  if (user) {
    db.delete(parseInt(id));
    return res.status(200).json({ status: '200', msg: `${user.name}님, 성공적으로 탈퇴가 됐습니다.` });
  }

  res.status(400).json({ status: '400', msg: '해당 유저가 존재하지 않습니다.' });
});

app
  .route('/users/:id')
  .get((req, res) => {
    const { id } = req.params;
    const user = db.get(parseInt(id));
    if (user) {
      return res.status(200).json({ status: '200', userId: user.userId, name: user.name });
    }
    res.status(404).json({ status: '400', msg: '해당 유저가 존재하지 않습니다.' });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const user = db.get(parseInt(id));

    if (user) {
      db.delete(parseInt(id));
      return res.status(200).json({ status: '200', msg: `${user.name}님, 성공적으로 탈퇴가 됐습니다.` });
    }

    res.status(400).json({ status: '400', msg: '해당 유저가 존재하지 않습니다.' });
  });
