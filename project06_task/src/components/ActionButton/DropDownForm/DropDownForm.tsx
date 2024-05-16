import React, { FC } from 'react';
type TDropDownFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  listId: string;
  list: boolean;
};
const DropDownForm: FC<TDropDownFormProps> = ({ setIsFormOpen, boardId, listId, list }) => {
  return <div>DropDownForm</div>;
};

export default DropDownForm;
