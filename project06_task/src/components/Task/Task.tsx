import React, { FC } from 'react';
import { ITask } from '../../store/types';
import { container, description, title } from './Task.css';
type TTaskProps = {
  task: ITask;
  boardId: string;
  index: number;
};
const Task: FC<TTaskProps> = ({ task, boardId, index }) => {
  return (
    <div className={container}>
      <div className={title}> {task.taskName}</div>
      <div className={description}>{task.taskDescription}</div>
    </div>
  );
};

export default Task;
