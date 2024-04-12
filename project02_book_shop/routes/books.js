const router = require('../modules/common');
const { getAllBooks, getDetailBook } = require('../controller/BookController');

// 전체 도서 조회 &
// 카테고리별 도서 목록 조회
router.get('/', getAllBooks);

// 개별 도서 조회
router.get('/:bookId', getDetailBook);

module.exports = router;
