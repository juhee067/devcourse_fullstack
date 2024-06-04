// categoryService.js

import pool from '../db.js';

const categoryService = {
  getAllCategories: async () => {
    const sql = `SELECT * FROM categorys`;
    try {
      const result = await pool.execute(sql);
      return result[0];
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;
