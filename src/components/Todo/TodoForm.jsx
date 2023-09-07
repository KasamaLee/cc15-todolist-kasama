import { useState, useContext } from 'react';
import { Button } from '../Common/Button/Button';
import styles from './TodoForm.module.scss';
import useTodo from '../../hooks/useTodo';



function TodoForm(props) {
  const [isError, setIsError] = useState(false);
  const [taskInput, setTaskInput] = useState(props.oldTodo?.task || '');
  // const { addTodo, editTodo } = useTodo();
  const { addTodo, editTodo } = useTodo();

  const handleChangeInput = function (event) {

    if (isError) setIsError(false);
    setTaskInput(event.target.value);
  };

  // FormValidation
  // case1 : submit ได้
  // case2 : submit ไม่ได้ => แสดง Error

  const handleSubmit = function (event) {
    event.preventDefault();
    // Form Validition
    if (taskInput.trim() === '') {
      console.log('Error');
      setIsError(true)
      return;
    }

    // if (props.addTodo) props.addTodo(taskInput);
    // else if (props.editTodo && props.oldTodo) {
    //   props.editTodo(props.oldTodo.id, { task: taskInput });
    // }

    if (props.oldTodo) editTodo(props.oldTodo.id, { task: taskInput });
    else addTodo(taskInput)

    props.setIsOpenForm(false);
  };

  const handleCancel = function () {
    console.log('cancel');
    // console.log(props);
    props.setIsOpenForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.todo__form__container}
    >
      {/*	Body */}
      <input
        className={styles.todo__form__input}
        placeholder='Task Name'
        value={taskInput}
        onChange={handleChangeInput}
      />

      {/*Form Footer */}
      <div className={styles.todo__form__footer}>
        {isError ? (<p className={styles.todo__error}>Title is required</p>) : (null)}
        <div className={styles.todo__form__buttons}>
          <Button
            text='Cancel'
            active={false}
            type='button'
            onClick={handleCancel}
          />

          <Button
            text={props.textSubmit}
            active={true}
            type='submit'
          />

          {/* <button onClick={handleCancel}>
            POC
          </button> */}

        </div>
      </div>
    </form>
  );
}

export default TodoForm;
