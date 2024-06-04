import categoryService from '../services/categoryService.js';
import { StatusCodes } from 'http-status-codes';

const allCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(500).json({ msg: '카테고리 전체 목록 조회 중에 문제가 발생했습니다.' });
  }
};

export default allCategory;
