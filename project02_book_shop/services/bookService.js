import pool from '../db.js';
import { StatusCodes } from 'http-status-codes';
import { ensureAuthorization } from '../auth.js';
import jwt from 'jsonwebtoken';

const bookService = {
  filteredBooks: async (query) => {
    const { category_id, news, limit, currentPage } = query;
    let offset = limit * (currentPage - 1);
    let sql = `SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes FROM books`;
    let values = [];
    if (category_id || news) {
      sql += ` WHERE`;

      if (category_id) {
        sql += ` category_id=?`;
        values.push(category_id);
      }
      if (category_id && news) {
        sql += ` AND`;
      }
      if (news) {
        sql += ` pub_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW()`;
      }
    }

    sql += ` LIMIT ? OFFSET ?;`;
    values = [...values, limit, offset];

    let books = await pool.execute(sql, values);

    books = books[0];

    let [totalRows] = await pool.execute('SELECT FOUND_ROWS() AS totalRows');
    totalRows = totalRows[0].totalRows;
    return { books, totalRows, currentPage };
  },

  findDetailBook: async (req, res) => {
    // 로그인 상태가 아니면 => liked 빼고 전달
    // 로그인 상태면 => liked 추가해서 전달
    const decodedPayload = ensureAuthorization(req);
    let { bookId } = req.params;
    if (decodedPayload instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 만료됐습니다.' });
    } else if (decodedPayload instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: '토큰이 잘못됐습니다' });
    } else if (decodedPayload instanceof ReferenceError) {
      const sql = `SELECT *,
      (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes
      FROM books
      LEFT JOIN categorys
      ON books.category_id = categorys.category_id WHERE books.id=?;`;

      const books = await pool.execute(sql, [bookId]);
      return books;
    }

    const sql = `SELECT *,
    (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
    (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
    FROM books
    LEFT JOIN categorys
    ON books.category_id = categorys.category_id WHERE books.id=?;`;
    const values = [decodedPayload.id, bookId, bookId];
    const books = await pool.execute(sql, values);
    return books;
  },
};

export default bookService;
