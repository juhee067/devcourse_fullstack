import React, { FC } from 'react';
import { ITask } from '../../store/types';
type TTaskProps = {
  task: ITask;
  boardId: string;
  index: number;
};
const Task: FC<TTaskProps> = ({ task, boardId, index }) => {
  return (
    <div>
      <div>{task.taskName}</div>
      <div>{task.taskDescription}</div>
    </div>
  );
};

export default Task;
