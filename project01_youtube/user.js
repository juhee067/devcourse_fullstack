const express = require('express');
const app = express();
app.listen(3001);
app.use(express.json());

// db 설정
let db = new Map();
let id = 1;

const isEmptyObject = (obj) => {
  return Object.keys(obj).length !== 0;
};

// 로그인
// forEach
app.post('/signin', (req, res) => {
  // userId가 디비에 저장된 회원인지 확인
  const { userId, password } = req.body;

  let userData = {};
  db.forEach((user, id) => {
    if (user.userId == userId) {
      userData = user;
    }
  });

  // userID를 못찾았으면
  // if (userData.userId) {
  if (isEmptyObject(userData)) {
    if (userData.password == password) {
      return res.status(200).json({ status: 200, msg: `${userId}님 로그인 성공` });
    }
    res.status(400).json({ status: 400, msg: `비밀번호가 맞지않습니다.` });
  } else {
    res.status(400).json({ status: 400, msg: `${userId}, 입력하신 아이디는 없는 아이디입니다.` });
  }
});

//  회원가입
app.post('/signup', (req, res) => {
  const userData = req.body;

  if (userData) {
    db.set(id++, userData);
    return res.status(201).json({ status: 200, msg: `${userData.name}님 회원가입 성공` });
  }

  res.status(400).json({ status: 400, msg: '데이터를 입력해주세요' });
});

//  회원 개별 조회
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.get(parseInt(id));
  if (user) {
    return res.status(200).json({ status: 200, userId: user.userId, name: user.name });
  }
  res.status(404).json({ status: 400, msg: '해당 유저가 존재하지 않습니다.' });
});

//  회원 개별 탈퇴
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.get(parseInt(id));

  if (user) {
    db.delete(parseInt(id));
    return res.status(200).json({ status: 200, msg: `${user.name}님, 성공적으로 탈퇴가 됐습니다.` });
  }

  res.status(400).json({ status: 400, msg: '해당 유저가 존재하지 않습니다.' });
});
