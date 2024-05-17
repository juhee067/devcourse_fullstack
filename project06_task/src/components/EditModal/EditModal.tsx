import React, { ChangeEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);
  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, task: { ...data.task, [name]: value } });
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({ boardId: editingState.boardId, listId: editingState.listId, task: data.task })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 수정하기 :  ${editingState.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };
  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 삭제하기 :  ${editingState.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };
  return (
    <div>
      <div>
        <div>
          <div>{editingState.task.taskName}</div> <FiX onClick={handleCloseButton} />
        </div>
        <div>제목</div>
        <input type='text' name='taskName' onChange={handleChange} value={data.task.taskName} />
        <div>설명</div>
        <input
          type='text'
          name='taskDescription'
          onChange={handleChange}
          value={data.task.taskDescription}
        />
        <div>생성한 사람</div>
        <input type='text' name='taskOwner' onChange={handleChange} value={data.task.taskOwner} />
      </div>
      <div>
        <button onClick={handleUpdate}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );
};

export default EditModal;
