import { FC, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';
import { GoSignOut } from 'react-icons/go';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import { IBoardItem } from '../../store/types';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};
const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const activeBoardIndex = boardArray.findIndex((b: { boardId: string }) => b.boardId === activeBoardId);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(setUser({ email: userCredential.user.email, id: userCredential.user.uid }));
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { isAuth } = useAuth();
  return (
    <div className={container}>
      <div className={title}>게시판</div>
      {boardArray.map((board: IBoardItem, index: number) => {
        const isActive = activeBoardIndex === index;
        return (
          <div
            key={board.boardId}
            onClick={() => setActiveBoardId(board.boardId)}
            className={clsx(
              {
                [boardItemActive]: isActive,
              },
              {
                [boardItem]: !isActive,
              }
            )}
          >
            <div>{board.boardName}</div>
          </div>
        );
      })}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
