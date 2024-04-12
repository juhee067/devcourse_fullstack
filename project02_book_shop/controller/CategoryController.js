const pool = require('../db');
const { StatusCodes } = require('http-status-codes');

const allCategory = async (req, res) => {
  const sql = `SELECT * FROM categorys`;
  //카테고리 전체 목록 리스트
  try {
    const result = await pool.execute(sql);
    const category = result[0];
    res.status(StatusCodes.OK).json(category);
  } catch (error) {
    res.status(500).json({ msg: '카테고리 전체 목록 조회 중에 문제가 발생했습니다.' });
  }
};

module.exports = allCategory;
//최주희