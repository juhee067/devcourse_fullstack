import express from 'express';
import { order, getOrder, getOrderDetail } from '../controllers/OrderController.js';
const router = express.Router();
router.use(express.json());
// 주문하기
router
  .route('/')
  .post(order) // 주문 목록 조회
  .get(getOrder);

// 주문 상세 상품 조회
router.route('/:orderId').get(getOrderDetail);

export default router;
