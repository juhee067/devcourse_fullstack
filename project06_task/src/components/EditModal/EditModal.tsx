import { ChangeEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from './EditModal.css';

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
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>{' '}
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input
          className={input}
          type='text'
          name='taskName'
          onChange={handleChange}
          value={data.task.taskName}
        />
        <div className={title}>설명</div>
        <input
          className={input}
          type='text'
          name='taskDescription'
          onChange={handleChange}
          value={data.task.taskDescription}
        />
        <div className={title}>생성한 사람</div>
        <input
          className={input}
          type='text'
          name='taskOwner'
          onChange={handleChange}
          value={data.task.taskOwner}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdate}>
            수정하기
          </button>
          <button className={deleteButton} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
