import pool from '../db.js';
import { StatusCodes } from 'http-status-codes';
import { ensureAuthorization } from '../auth.js';
import jwt from 'jsonwebtoken';

const orderService = {
  order: async (req, res) => {},
  getOrder: async (req, res) => {
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    }

    const sql = `SELECT orders.id, created_at, 
      address,receiver,contact, book_title, total_quantity, 
      total_price FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id`;
    let result = await pool.execute(sql);
    return result[0];
  },
  getOrderDetail: async (req, res) => {
    const { orderId } = req.params;
    const decodedPayload = ensureAuthorization(req);

    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    }
    const sql = `SELECT book_id, title, author, price, quantity FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?`;

    let [result] = await pool.execute(sql, [orderId]);
    return [result];
  },
};
export default orderService;
