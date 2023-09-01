// Dependencies
import { useState } from 'react';
import { nanoid } from 'nanoid';
import dayjs, { Dayjs } from 'dayjs';
import './App.scss';
import AppBar from '../components/Common/AppBar/AppBar';
import SideBar from '../components/SideBar/SideBar';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/TodoLists';
import { Button } from '../components/Common/Button/Button';


const data = [
  { "id": nanoid(), "task": "Suspendisse potenti.", "status": false, "due_date": "2023-04-26" },
  {
    "id": nanoid(),
    "task": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "status": false,
    "due_date": "2023-05-08"
  },
  {
    "id": nanoid(),
    "task": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
    "status": false,
    "due_date": "2023-04-30"
  },
];

function App() {

  const [allTodos, setAllTodos] = useState(data);

  // Add
  const addTodo = function (taskName) {
    const newTodo = {
      id: nanoid(),
      task: taskName,
      status: false,
      due_date: dayjs().format('YYYY-MM-DD'),
    };
    setAllTodos((p) => [newTodo, ...p])
  }

  // Delete
  // id มาจาก data <App /> ส่ง props data[] ที่มี id ติดไปด้วย 
  // เมื่อ onCLick // todoItem เรียก deleteTodo() พร้อมส่ง argument คือ id กลับขึ้นมาจาก App > TodoLists > TodoItem
  const deleteTodo = function (todoId) {
    const newAllTodos = allTodos.filter((listItem) => listItem.id !== todoId);
    setAllTodos(newAllTodos);
  }

  // Edit
  const editTodo = function (todoId, newTodoObj) {

    // // # Practice #1
    // // หาของเดิม เอามาเทียบของใหม่
    // let foundTodo = allTodos.find((todo) => (todo.id === todoId));
    // if (!foundTodo) return;
    // const newTodo = Object.assign({}, foundTodo, newTodoObj);

    // let foundIndex = allTodos.findIndex((todo) => todo.id === todoId);
    // if (foundIndex === -1) return;

    // const newTodoLists = [...allTodos];
    // newTodoLists.splice(foundIndex, 1, newTodo);
    // setAllTodos(newTodoLists);

    // // # Practice #2
    // const newTodoLists = allTodos.map(function (todo) {
    //   if (todo.id != todoId) return todo;
    //   else return { ...todo, ...newTodoObj };
    // });
    // setAllTodos(newTodoLists);

    // # Practice #3
    const newTodoLists = allTodos.reduce((acc, todo) => {
      if (todo.id !== todoId) acc.push(todo);
      else acc.push({ ...todo, ...newTodoObj });
      return acc;
    }, []);
    setAllTodos(newTodoLists)

  };

  return (
    <div className='todo'>
      <div className='todo__header'>
        <AppBar />
      </div>
      <div className='todo__sidebar'>
        <SideBar />
      </div>
      <div className='todo__content'>
        <main className='todo__container'>
          <TodoHeader />
          <TodoCreate addTodo={addTodo} />
          <TodoLists data={allTodos} deleteTodo={deleteTodo} editTodo={editTodo} />
        </main>
      </div>
    </div>
  );
}

export default App;
