import { StatusCodes } from 'http-status-codes';
import likeService from '../services/likeService.js';
const addLike = async (req, res) => {
  try {
    const like = await likeService.addLike(req, res);
    res.status(StatusCodes.OK).json(like);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: '좋아요 추가 중에 문제가 발생했습니다.' });
  }
};

const removeLike = async (req, res) => {
  try {
    const like = await likeService.removeLike(req, res);
    res.status(StatusCodes.OK).json(like);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: '좋아요 삭제 중에 문제가 발생했습니다.' });
  }
};

export { addLike, removeLike };
