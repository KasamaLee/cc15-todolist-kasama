// Dependencies
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import dayjs, { Dayjs } from 'dayjs';
import './App.scss';
import AppBar from '../components/Common/AppBar/AppBar';
import SideBar from '../components/SideBar/SideBar';
import TodoHeader from '../components/Todo/TodoHeader';
import TodoCreate from '../components/Todo/TodoCreate';
import TodoLists from '../components/Todo/TodoLists';
import { Button } from '../components/Common/Button/Button';


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

const END_POINT = 'http://localhost:8080/api/todos';

function App() {

  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    // fetch AllTodo
    async function fetchAllTodo() {
      try {
        let response = await fetch("http://localhost:8080/api/todos", { method: 'GET' });
        let todoData = await response.json();

        const newTodoLists = todoData.todos.map((todo) => {
          const newTodo = { ...todo, due_date: todo.date };
          delete todo.date;
          return newTodo;
        });

        setAllTodos(newTodoLists);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllTodo();
  }, [])


  // Add
  const addTodo = async function (taskName) {
    const newTodo = {
      id: nanoid(),
      task: taskName,
      status: false,
      due_date: '2023-04-02',
    };

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      };
      let response = await fetch(END_POINT, options);
      let data = await response.json();
      const createdTodo = { ...data.todo, due_date: data.todo.date };
      delete createdTodo.date;

      // Update State
      setAllTodos((p) => [createdTodo, ...p])
    } catch (error) {
      console.log(error);
    }
  }

  // Delete
  // id มาจาก data <App /> ส่ง props data[] ที่มี id ติดไปด้วย 
  // เมื่อ onCLick // todoItem เรียก deleteTodo() พร้อมส่ง argument คือ id กลับขึ้นมาจาก App > TodoLists > TodoItem
  const deleteTodo = async function (todoId) {
    try {
      const options = { method: 'DELETE' };
      let response = await fetch(`${END_POINT}/${todoId}`, options);
      if (response.status == 204) {
        const newAllTodos = allTodos.filter((listItem) => listItem.id !== todoId);
        setAllTodos(newAllTodos);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Edit
  const editTodo = async function (todoId, updateTodoObj) {
    console.log(updateTodoObj);

    try {
      let foundIndex = allTodos.findIndex((todo) => todo.id === todoId);
      if (foundIndex !== -1) {
        // updateTodo
        const updateTodo = { ...allTodos[foundIndex], ...updateTodoObj };
        updateTodo.date = updateTodo.due_date;
        const options = {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updateTodo)
        }
        const response = await fetch(`${END_POINT}/${todoId}`, options)
        const data = await response.json();
        console.log(data.todo);

        // UpdateState
        const newTodoLists = [...allTodos];
        newTodoLists[foundIndex] = { ...data.todo, due_date: data.todo.date };
        setAllTodos(newTodoLists);
      }
    } catch (error) {
      console.log(error);
    }
    // FindTodo

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
    // const newTodoLists = allTodos.reduce((acc, todo) => {
    //   if (todo.id !== todoId) acc.push(todo);
    //   else acc.push({ ...todo, ...newTodoObj });
    //   return acc;
    // }, []);
    // setAllTodos(newTodoLists)

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
