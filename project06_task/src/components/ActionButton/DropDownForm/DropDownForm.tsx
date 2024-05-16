import React, { ChangeEvent, FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardSlice';
import { v4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
type TDropDownFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  listId: string;
  list?: boolean;
};
const DropDownForm: FC<TDropDownFormProps> = ({ setIsFormOpen, boardId, listId, list }) => {
  const [text, setText] = useState('');
  const dispatch = useTypedDispatch();
  const formPlaceholder = list ? '리스트 이름을 입력하세요' : '일의 제목을 입력하세요';
  const buttonTitle = list ? '리스트 추가' : '일 추가';
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleButtonClick = () => {
    if (text) {
      if (list) {
        dispatch(addList({ boardId, list: { listId: v4(), listName: text, tasks: [] } }));
        dispatch(
          addLog({
            logId: v4(),
            logMessage: `리스트 생성하기: ${text}`,
            logAuthor: 'User',
            logTimestamp: String(Date.now()),
          })
        );
      } else {
      }
    }
  };
  return (
    <div>
      <textarea
        autoFocus
        value={text}
        onChange={handleChange}
        onBlur={() => setIsFormOpen(false)}
        placeholder={formPlaceholder}
      />
      <button onMouseDown={handleButtonClick}>{buttonTitle}</button>
      <FiX />
    </div>
  );
};

export default DropDownForm;
