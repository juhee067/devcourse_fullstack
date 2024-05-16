import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoardItem } from '../types';

type IboardState = {
  modalActive: boolean;
  boardArray: IBoardItem[];
};

type TAddBoardAction = {
  board: IBoardItem;
};

const initialState: IboardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'list 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'task 1',
              taskDescription: 'des1',
              taskOwner: 'John',
            },
            {
              taskId: 'task-1',
              taskName: 'task 2',
              taskDescription: 'des2',
              taskOwner: 'Johnson',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'list 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'task 3',
              taskDescription: 'des3',
              taskOwner: 'John3',
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // 보드를 추가하는 액션 정의
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
  },
});

export const { addBoard } = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
