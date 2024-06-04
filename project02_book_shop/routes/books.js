import express from 'express';
const router = express.Router();
router.use(express.json());
import { getAllBooks, getDetailBook } from '../controllers/BookController.js';

// 전체 도서 조회 &카테고리별 도서 목록 조회
router.get('/', getAllBooks);

// 개별 도서 조회
router.get('/:bookId', getDetailBook);

export default router;
