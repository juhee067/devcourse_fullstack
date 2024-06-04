import pool from '../db.js';
import { StatusCodes } from 'http-status-codes';
import { ensureAuthorization } from '../auth.js';
import jwt from 'jsonwebtoken';
import orderService from '../services/orderService.js';
// 최주희
const order = async (req, res) => {
  let { items, delivery, totalQuantity, totalPrice, firstBookTitle } = req.body;
  const decodedPayload = ensureAuthorization(req);

  if (decodedPayload instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
  } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
  }
  try {
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let result = await pool.execute(sql, values);
    let delivery_id = result[0].insertId;

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
    VALUES (?, ?, ?, ?, ?);`;
    values = [firstBookTitle, totalQuantity, totalPrice, decodedPayload.id, delivery_id];
    result = await pool.execute(sql, values);
    let order_id = result[0].insertId;

    //items를 가지고, 장바구니에서 bookid,quantity조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    let orderItems = await pool.query(sql, [items]);

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity)
    VALUES ?;`;
    values = [];
    orderItems[0].forEach((item) => values.push([order_id, item.book_id, item.quantity]));
    [result] = await pool.query(sql, [values]);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '없음' });
    }
    result = await deleteCartItems(pool, items);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: '주문 하기 중에 오류가 발생했습니다.' });
  }
};

const deleteCartItems = async (pool, items) => {
  let sql = `DELETE FROM cartItems WHERE id IN (?)`;

  return await pool.query(sql, [items]);
};

const getOrder = async (req, res) => {
  try {
    let result = await orderService.getOrder(req, res);

    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '' });
    }
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: '주문 목록 조회 중에 오류가 발생했습니다.' });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    let result = await orderService.getOrderDetail(req, res);

    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '' });
    }
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: '주문 상세 상품 조회 중에 오류가 발생했습니다.' });
  }
};

export { order, getOrder, getOrderDetail };
