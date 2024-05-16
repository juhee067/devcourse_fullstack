import React, { FC } from 'react';
import { Ilist } from '../../store/types';
import { GrSubtract } from 'react-icons/gr';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/DropDownForm/ActionButton';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList } from '../../store/slices/boardSlice';

type TListProps = {
  list: Ilist;
  boardId: string;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ listId, boardId }));
  };
  return (
    <div>
      <div>
        <div>{list.listName}</div>
        <GrSubtract onClick={() => handleListDelete(list.listId)} />
      </div>

      {list.tasks.map((task, index) => (
        <Task task={task} boardId={boardId} index={index} />
      ))}
      <div>
        <ActionButton /> 새로운 일 등록
      </div>
    </div>
  );
};

export default List;
