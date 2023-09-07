import { createContext } from 'react';
import { useState } from "react";
import { nanoid } from 'nanoid';



// ชื่อ Context
const TodoContext = createContext();

const END_POINT = 'http://localhost:8080/api/todos';


// SetUp Context ฝั่ง Provider
function TodoContextProvider(props) {
    // DATA
    const [allTodos, setAllTodos] = useState([]);

    // #1 : Create
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

    // #2 : Read
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

    // #3 : Update
    const editTodo = async function (todoId, updateTodoObj) {
        // console.log(updateTodoObj);

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
                // console.log(data.todo);

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

    // #4 : Delete
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


    const sharedObj = { value: 60, addTodo, deleteTodo, editTodo, allTodos, setAllTodos, fetchAllTodo };

    return <TodoContext.Provider value={sharedObj} >{props.children}</TodoContext.Provider>
}

export default TodoContextProvider;
export { TodoContext };