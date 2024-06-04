import express from 'express';
const router = express.Router();
router.use(express.json());
import allCategory from '../controllers/CategoryController.js';

// 카테고리 전체 목록조회
router.get('/', allCategory);

export default router;
