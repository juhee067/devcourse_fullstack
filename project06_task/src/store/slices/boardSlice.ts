import { createSlice } from '@reduxjs/toolkit';
import { IboardItem } from '../types';

type boardState = {
  modalActive: boolean;
  boardArray: IboardItem[];
};

const initialState: boardState = {
  modalActive: false,
  boardArray: [],
};
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
});

export const boardsReducer = boardSlice.reducer;
