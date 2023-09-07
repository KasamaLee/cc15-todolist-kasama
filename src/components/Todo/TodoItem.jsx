import { useState, useContext } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { HiOutlineCheck } from 'react-icons/hi';
import useTodo from '../../hooks/useTodo';

import TodoForm from "./TodoForm";
import styles from './TodoItem.module.scss';


// Object Destructuring (Props)
// const { task, done, date } = props;
function TodoItem({ id, task, done, date }) {

    const [isOpenForm, setIsOpenForm] = useState(false);
    const { deleteTodo, editTodo } = useTodo();
    // console.log(id);

    const handleClick = function (event) {
        setIsOpenForm(!isOpenForm);
    };

    const handleDelete = function (event) {
        deleteTodo(id);
    }

    const toggleStatus = () => {
        editTodo(id, {status: !done});
    }
    return (
        <>
            {isOpenForm ? (
                < TodoForm
                    textSubmit='Edit Task'
                    setIsOpenForm={setIsOpenForm}
                    editTodo={editTodo}
                    oldTodo={{ id, task, done, date }}
                />
            ) : (
                <li className={styles.todo}>
                    <div className={`${styles.todo__checkbox} ${done ? styles.todo__checkbox__done : ''}`}>
                        <HiOutlineCheck
                            className={styles.todo__checkbox__icon}
                            onClick={toggleStatus}
                        />
                    </div>

                    <p className={`${styles.todo__task} ${done ? styles.todo__task__done : ''}`}>{task}</p>
                    <span className={styles.todo__date}>{date}</span>
                    <div className={styles.todo__action}>
                        <span onClick={handleClick} >
                            <FaPen className={styles.todo__edit} />
                        </span>
                        <span onClick={handleDelete}>
                            <FaTrashAlt className={styles.todo__delete} />
                        </span>
                    </div>
                </li>
            )}
        </>
    );
}

export default TodoItem;