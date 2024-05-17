import { useState } from 'react';
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css';
import BoardList from './components/BoardList/BoardList';
import ListsContainer from './components/ListContainer/ListsContainer';
import { useTypedSelector } from './hooks/redux';
import { IBoardItem } from './store/types';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const getActiveBoard = boards.filter((board: IBoardItem) => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;
  return (
    <div className={appContainer}>
      {modalActive && <EditModal />}
      {isLoggerOpen && <LoggerModal setIsLoggerOpen={setIsLoggerOpen} />}
      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <div className={board}>
        <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton}>게시판 삭세하기</button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보이기'}
        </button>
      </div>
    </div>
  );
}

export default App;
