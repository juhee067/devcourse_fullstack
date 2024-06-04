import pool from '../db.js';
import { StatusCodes } from 'http-status-codes';
import { ensureAuthorization } from '../auth.js';
import jwt from 'jsonwebtoken';

const likeService = {
  addLike: async (req, res) => {
    const { liked_book_id } = req.params;

    const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)
        `;
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    }
    let values = [decodedPayload.id, liked_book_id];

    const result = await pool.execute(sql, values);
    return result[0];
  },
  removeLike: async (req, res) => {
    const { liked_book_id } = req.params;
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    }
    let values = [decodedPayload.id, liked_book_id];
    const sql = `DELETE FROM likes WHERE user_id=? AND liked_book_id=?`;

    const result = await pool.execute(sql, values);
    return result[0];
  },
};

export default likeService;
