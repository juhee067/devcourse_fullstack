import pool from '../db.js';
import jwt from 'jsonwebtoken';
import { ensureAuthorization } from '../auth.js';
import { StatusCodes } from 'http-status-codes';

const cartService = {
  add: async (req) => {
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    }
    let { book_id, quantity } = req.body;
    const values = [book_id, quantity, decodedPayload.id];
    let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?,?,?)`;
    await pool.execute(sql, values);
  },
  get: async (req, res) => {
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    } else {
      let { selected } = req.body;
      let sql = `SELECT cartItems.id,book_id,title,summary,quantity,price FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id WHERE user_id =? `;
      const values = [decodedPayload.id];
      if (selected) {
        //주문서 작성시 '선택한 장바구니 목록 조회'
        sql += `AND cartItems.id IN (?)`;
        values.push(selected);
      }
      // 장바구니 보기

      let result = await pool.query(sql, values);
      return result;
    }
  },
  remove: async (req) => {
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    }
    const sql = `DELETE FROM cartItems WHERE id = ?;`;
    const { cart_id } = req.params;
    await pool.execute(sql, [cart_id]);
  },
};

export default cartService;
