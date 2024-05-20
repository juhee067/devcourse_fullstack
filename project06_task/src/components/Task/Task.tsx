import React, { FC } from 'react';
import { ITask } from '../../store/types';
import { container, description, title } from './Task.css';
import { Draggable } from '@hello-pangea/dnd';
type TTaskProps = {
  task: ITask;
  boardId: string;
  index: number;
};
const Task: FC<TTaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={title}> {task.taskName}</div>
          <div className={description}>{task.taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
