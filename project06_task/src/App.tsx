import { useState } from 'react';
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css';
import BoardList from './components/BoardList/BoardList';
import ListsContainer from './components/ListContainer/ListsContainer';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import { IBoardItem, ITask, Ilist } from './store/types';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard, sort } from './store/slices/boardSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 } from 'uuid';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const getActiveBoard = boards.filter((board: IBoardItem) => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;

  const dispatch = useTypedDispatch();
  const handleDelteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 지우기: ${getActiveBoard.boardName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board: { boardId: string }) => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0 ? indexToBeDeleted + 1 : indexToBeDeleted - 1;
      };
      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert('최소 게시판 개수는 한 개입니다.');
    }
  };

  const handleEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) return; // destination이 null일 경우 처리

    const sourceList = lists.filter((list: Ilist) => list.listId === source.droppableId)[0];

    dispatch(
      sort({
        boardIndex: boards.findIndex((board: IBoardItem) => board.boardId === activeBoardId),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId: draggableId,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 : ${sourceList.listName} 에서 리스트 ${
          lists.filter((list: Ilist) => list.listId === destination.droppableId)[0].listName
        }으로  ${
          sourceList.tasks.filter((task: ITask) => task.taskId === draggableId)[0].taskName
        }을 옮김 `,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
  };
  return (
    <div className={appContainer}>
      {modalActive && <EditModal />}
      {isLoggerOpen && <LoggerModal setIsLoggerOpen={setIsLoggerOpen} />}

      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <div className={board}>
        <DragDropContext onDragEnd={handleEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />{' '}
        </DragDropContext>
      </div>

      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDelteBoard}>
          게시판 삭세하기
        </button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보이기'}
        </button>
      </div>
    </div>
  );
}

export default App;
