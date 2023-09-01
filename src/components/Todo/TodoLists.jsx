import { useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoLists.module.scss';

/* 
data = Array<{id: number, task: string, status: boolean, due_date: string }>
dataRender = Array[]<TodoItem task=... done=... date=... />
*/



function TodoLists(props) {

  return (

    <ul className={styles.todo__lists}>
      {props.data.map((todoObj) => (
        <TodoItem
          key={todoObj.id}
          id={todoObj.id}
          task={todoObj.task}
          done={todoObj.status}
          date={todoObj.due_date}
        />
      ))}


      {/* ## Render List #2 */}
      {/* {data.map(({ id, task, status, due_date }) => (
        <TodoItem
          key={id}
          task={task}
          done={status}
          date={due_date}
        />
      ))} */}

    </ul>

  );
}

export default TodoLists;
