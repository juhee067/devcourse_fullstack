const router = require('../modules/common');

// 좋아요 추가
router
  .route('/:id')
  .post((req, res) => {
    res.status(200).json({ msg: '좋아요 추가' });
  })
  // 좋아요 삭제
  .delete((req, res) => {
    res.status(200).json({ msg: '좋아요 삭제' });
  });

module.exports = router;
