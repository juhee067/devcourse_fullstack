import express from 'express';
import { addCart, getCart, removeCart } from '../controllers/CartController.js';
const router = express.Router();
router.use(express.json());

// 장바구니 담기
router
  .route('/')
  .post(addCart)
  // 장바구니 조회 & 선택된 장바구니 아이템 목록조회
  .get(getCart);

// 장바구니 도서 삭제
router.route('/:cart_id').delete(removeCart);

export default router;
