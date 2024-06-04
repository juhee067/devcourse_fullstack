import express from 'express';
const router = express.Router();
router.use(express.json());
import { signup, signin, reqPasswordReset, passwordReset } from '../controllers/UserController.js';

// 회원가입
router.post('/signup', signup);

//로그인
router.post('/signin', signin);

// 비밀번호 초기화 요청
router
  .post('/reset', reqPasswordReset) // 비밀번호 초기화
  .put(passwordReset);

export default router;
