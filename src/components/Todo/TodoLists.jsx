import TodoItem from './TodoItem';
import styles from './TodoLists.module.scss';
import useTodo from '../../hooks/useTodo';

/* 
data = Array<{id: number, task: string, status: boolean, due_date: string }>
dataRender = Array[]<TodoItem task=... done=... date=... />
*/



function TodoLists(props) {
  // const {allTodos} = useContext(TodoContext);
  const {showTodos} = useTodo();

  return (
    <ul className={styles.todo__lists}>
      {showTodos.map((todoObj) => (
        <TodoItem
          key={todoObj.id}
          id={todoObj.id}
          task={todoObj.task}
          done={todoObj.status}
          date={todoObj.due_date}
        />
      ))}

    </ul>

  );
}

export default TodoLists;
