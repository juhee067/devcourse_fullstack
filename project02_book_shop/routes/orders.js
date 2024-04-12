const router = require('../modules/common');

// 주문하기
router
  .route('/')
  .post((req, res) => {
    res.status(200).json({ msg: '전체 도서 조회' });
  }) // 주문 목록 조회
  .get((req, res) => {
    res.status(200).json({ msg: '개별 도서 조회' });
  });

// 주문 상세 상품 조회
router.route('/:id').get((req, res) => {
  res.status(200).json({ msg: '카테고리별 도서 목록 조회' });
});

module.exports = router;
