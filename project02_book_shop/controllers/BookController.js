import bookService from '../services/bookService.js';
import { StatusCodes } from 'http-status-codes';
// 카테고리 별, 신간여부 : 전체 도서 목록 조회
//최주희
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.filteredBooks(req.query, res);

    if (books.books.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '해당 도서가 존재하지않습니다' });
    }
    books.books.map((item) => {
      item.pubDate = item.pub_date;
      delete item.pub_date;
    });
    res.status(StatusCodes.OK).json({
      books: books.books,
      pagination: { currentPage: parseInt(books.currentPage), totalCount: books.totalRows },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: '조회 중에 오류가 발생했습니다.' });
  }
};

// 개별도서 조회
const getDetailBook = async (req, res) => {
  try {
    const books = await bookService.findDetailBook(req);
    const result = books[0];
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: '해당 도서가 존재하지않습니다' });
    }
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: '개별 도서 조회 중에 오류가 발생했습니다.' });
  }
};

export { getAllBooks, getDetailBook };
