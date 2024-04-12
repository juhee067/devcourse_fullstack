const router = require('../modules/common');
const { signup, signin, reqPasswordReset, passwordReset } = require('../controller/UserController');

// 회원가입
router.post('/signup', signup);

//로그인
router.post('/signin', signin);

// 비밀번호 초기화 요청
router
  .post('/reset', reqPasswordReset) // 비밀번호 초기화
  .put(passwordReset);

module.exports = router;
