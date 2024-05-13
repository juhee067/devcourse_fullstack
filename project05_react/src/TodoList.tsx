import { useState } from 'react';
import { Button } from 'react-bootstrap';
type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};
const TodoList: React.FC = () => {
  const title: string = '오늘 할 일';
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '공부하기', isChecked: false },
    { id: 2, text: '잠자기', isChecked: false },
  ]);

  const [newTodo, setNewTodo] = useState<string>('');

  const handleCheckedChange = (id: number): void => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
      setNewTodo('');
    }
  };
  return (
    <div className='todoListContainer'>
      <h1 style={{ color: '#fff' }}>{title}</h1>
      <div>
        <input
          type='text'
          placeholder='할 일 입력'
          style={{ margin: '0 10px 40px 0', writingMode: 'horizontal-tb' }}
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <Button variant='warning' onClick={addTodo}>
          추가
        </Button>
      </div>
      <div className='board'>
        <ul>
          {todos.map((item) => (
            <li key={item.id}>
              <input
                type='checkbox'
                onChange={() => {
                  handleCheckedChange(item.id);
                }}
              ></input>
              <span>{item.isChecked ? <del>{item.text}</del> : item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
