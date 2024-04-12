const router = require('../modules/common');
const allCategory = require('../controller/CategoryController');

// 카테고리 전체 목록조회
router.get('/', allCategory);

module.exports = router;
