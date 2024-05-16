import React, { FC } from 'react';
import { ITask, Ilist } from '../../store/types';
import { GrSubtract } from 'react-icons/gr';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/DropDownForm/ActionButton';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { setModalData } from '../../store/slices/modalSlice';
import { deleteButton, header, listWrapper, name } from './List.css';

type TListProps = {
  list: Ilist;
  boardId: string;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ listId, boardId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기:${list.listName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, taskId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };
  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract className={deleteButton} onClick={() => handleListDelete(list.listId)} />
      </div>

      {list.tasks.map((task, index) => (
        <div key={task.taskId} onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}>
          <Task task={task} boardId={boardId} index={index} />
        </div>
      ))}
      <div>
        <ActionButton />
      </div>
    </div>
  );
};

export default List;
