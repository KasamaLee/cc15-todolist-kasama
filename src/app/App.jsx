// Dependencies
import { useEffect, useContext } from 'react';
import {TodoContext} from '../context/TodoContext';
import './App.scss';
import AppBar from '../components/Common/AppBar/AppBar';
import SideBar from '../components/SideBar/SideBar';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/TodoLists';


// const data = [
//   { "id": nanoid(), "task": "Suspendisse potenti.", "status": false, "due_date": "2023-04-26" },
//   {
//     "id": nanoid(),
//     "task": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
//     "status": false,
//     "due_date": "2023-05-08"
//   },
//   {
//     "id": nanoid(),
//     "task": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
//     "status": false,
//     "due_date": "2023-04-30"
//   },
// ];


function App() {

  const {addTodo, deleteTodo, editTodo, allTodos } = useContext(TodoContext);

  const sharedObj = useContext(TodoContext);


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
          <TodoLists deleteTodo={deleteTodo} editTodo={editTodo} />
        </main>
      </div>
    </div>
  );
}

export default App;
