import cartService from '../services/cartService.js';
import { StatusCodes } from 'http-status-codes';

const addCart = async (req, res) => {
  try {
    await cartService.add(req);
    res.status(StatusCodes.CREATED).json({ msg: '장바구니 담기 성공' });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: '장바구니 추가 중에 오류가 발생했습니다.' });
  }
};
// 최주희
const getCart = async (req, res) => {
  try {
    let result = await cartService.get(req);
    result = result[0];
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '장바구니에 담긴 도서가 없습니다' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: '장바구니에 담긴 도서 조회에 실패했습니다' });
  }
};
// 최주희
const removeCart = async (req, res) => {
  try {
    await cartService.remove(req);
    res.status(StatusCodes.OK).json({ msg: '장바구니 삭제가 완료되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: '장바구니 삭제 중에 문제가 발생했습니다.' });
  }
};

export { addCart, getCart, removeCart };
