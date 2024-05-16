import React, { FC } from 'react';
import { Ilist } from '../../store/types';
import List from '../List/List';
import ActionButton from '../ActionButton/DropDownForm/ActionButton';
import { listsContainer } from './ListsContainer.css';
type TListsContainerProps = {
  lists: Ilist[];
  boardId: string;
};
const ListsContainer: FC<TListsContainerProps> = ({ lists, boardId }) => {
  return (
    <div className={listsContainer}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton />
    </div>
  );
};

export default ListsContainer;
