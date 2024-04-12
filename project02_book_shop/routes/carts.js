const router = require('../modules/common');

// 장바구니 담기
router
  .route('/')
  .get((req, res) => {
    res.status(200).json({ msg: '장바구니 담기' });
  }) // 장바구니 조회
  .get((req, res) => {
    res.status(200).json({ msg: '장바구니 조회' });
  });

// 장바구니 도서 삭제
router.route('/:id').get((req, res) => {
  res.status(200).json({ msg: '장바구니 도서 삭제' });
});

// 장바구니에서 선택한 주문 예상 상품 목록 조회
// router.route('/').get((req, res) => {
//   res.status(200).json({ msg: '장바구니에서 선택한 주문 예상 상품 목록 조회' });
// });

module.exports = router;
