import React from 'react';
import { Todo } from './TodoList';
import { Modal } from 'react-bootstrap';

type TodoModalProps = {
  show: boolean;
  todo: Todo | null;
  handleDetail: () => void;
};
const TodoModal: React.FC<TodoModalProps> = ({ show, todo, handleDetail }) => {
  return (
    <div>
      <Modal show={show} onHide={handleDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title>상세정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>{todo?.text}</Modal.Body>
      </Modal>
    </div>
  );
};

export default TodoModal;
