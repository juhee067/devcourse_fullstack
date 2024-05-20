import { ChangeEvent, FC, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { icon, input, sideForm } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputTest] = useState('');
  const dispatch = useTypedDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTest(e.target.value);
  };

  const handleBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(addBoard({ board: { boardId: uuidv4(), boardName: inputText, lists: [] } }));
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 등록: ${inputText}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
      setIsFormOpen(false);
      setInputTest('');
    }
  };
  return (
    <div className={sideForm}>
      <input
        autoFocus
        className={input}
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};

export default SideForm;
