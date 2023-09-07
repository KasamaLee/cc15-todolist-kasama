import { createContext } from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const END_POINT = 'http://localhost:8080/api/todos';
axios.defaults.baseURL = 'http://localhost:8080/api';

// ชื่อ Context => ใช้ทั้ง Provider, Consumer
const TodoContext = createContext();

// SetUp Context ฝั่ง Provider
function TodoContextProvider(props) {
    const [allTodos, setAllTodos] = useState([]);
    const [showTodos, setShowTodos] = useState([]);

    // Search
    const searchTodo = (keyword) => {
        const newShowTodos = allTodos.filter((todoObj) =>
            todoObj.task.toLowerCase().includes(keyword.toLowerCase())
        );
        setShowTodos(newShowTodos);
    };

    // #2 : Read
    const fetchAllTodo = async () => {
        try {
            //   let response = await fetch('http://localhost:8080/api/todos', { method: 'GET' });
            //   let todoData = await response.json();
            const response = await axios.get('/todos');

            const newTodoLists = response.data.todos.map((todo) => {
                const newTodo = { ...todo, due_date: todo.date };
                delete todo.date;
                return newTodo;
            });
            setAllTodos(newTodoLists);
            setShowTodos(newTodoLists);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllTodo();
    }, []);

    // #1 : Create
    const addTodo = async function (taskName) {
        console.log('add', taskName);
        const newTodo = {
            task: taskName,
            status: false,
            due_date: dayjs().format('YYYY-MM-DD'),
        };

        try {
            // SEND REQUEST : POST
            // WAIT RESPONSE
            //   const options = {
            //     method: 'POST',
            //     headers: {
            //       'Content-type': 'application/json',
            //     },
            //     body: JSON.stringify(newTodo),
            //   };
            //   let response = await fetch(END_POINT, options);
            //   let data = await response.json();

            const { data } = await axios.post('/todos',newTodo);

            const createdTodo = { ...data.todo, due_date: data.todo.date };
            delete createdTodo.date;

            // Update STATE
            setAllTodos((p) => [createdTodo, ...p]);
            setShowTodos((p) => [createdTodo, ...p]);
        } catch (error) {
            console.log(error);
        }
    };

    // #3 : Update
    const editTodo = async function (todoId, updateTodoObj) {
        console.log('edit');
        try {
            // FindTodo
            let foundedIndex = allTodos.findIndex((todo) => todo.id === todoId);
            if (foundedIndex !== -1) {
                // updateTodo
                const updatedTodo = { ...allTodos[foundedIndex], ...updateTodoObj };
                updatedTodo.date = updatedTodo.due_date;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(updatedTodo),
                };

                const response = await fetch(`${END_POINT}/${todoId}`, options);
                const data = await response.json();

                // UpdateState
                const newTodoLists = [...allTodos];
                newTodoLists[foundedIndex] = { ...data.todo, due_date: data.todo.date };
                setAllTodos(newTodoLists);
                setShowTodos(newTodoLists);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // #4 : Delete
    const deleteTodo = async function (todoId) {
        try {
            // const options = { method: 'DELETE' };
            // let response = await fetch(`${END_POINT}/${todoId}`, options);
            const response = await axios.delete(`todos/${todoId}`)
            if (response.status === 204) {
                setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
                setShowTodos((prev) => prev.filter((todo) => todo.id !== todoId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sharedObj = {
        allTodos,
        showTodos,
        addTodo,
        fetchAllTodo,
        editTodo,
        deleteTodo,
        searchTodo,
    };

    return <TodoContext.Provider value={sharedObj}>{props.children}</TodoContext.Provider>;
}

// export ไปครอบ UI
export default TodoContextProvider;

// export ไปให้ consumer
export { TodoContext };