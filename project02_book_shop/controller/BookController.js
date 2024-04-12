const pool = require('../db');
const { StatusCodes } = require('http-status-codes');

const getAllBooks = async (req, res) => {
  const { category_id } = req.query;
  if (category_id) {
    try {
      const sql = `SELECT * FROM books WHERE category_id=?`;
      const books = await pool.execute(sql, [category_id]);
      const categoryBooks = books[0];
      if (books.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: '해당 카테고리별 도서가 존재하지않습니다' });
      }
      res.status(StatusCodes.OK).json(categoryBooks);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: '카테고리별 도서 조회 중에 오류가 발생했습니다.' });
    }
  } else {
    try {
      const sql = `SELECT * FROM books`;
      const books = await pool.execute(sql);
      res.status(StatusCodes.OK).json(books[0]);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: '전체 도서 조회 중에 오류가 발생했습니다.' });
    }
  }
};

const getDetailBook = async (req, res) => {
  let { bookId } = req.params;

  try {
    const sql = `SELECT * FROM books WHERE id=?`;
    const books = await pool.execute(sql, [bookId]);
    const result = books[0];
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '해당 도서가 존재하지않습니다' });
    }
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: '개별 도서 조회 중에 오류가 발생했습니다.' });
  }
};

module.exports = {
  getAllBooks,
  getDetailBook,
};
//최주희