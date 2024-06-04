import express from 'express';
const router = express.Router();
router.use(express.json());
import { addLike, removeLike } from '../controllers/LikeController.js';

// 좋아요 추가
router
  .route('/:liked_book_id')
  .post(addLike)
  // 좋아요 삭제
  .delete(removeLike);

export default router;
