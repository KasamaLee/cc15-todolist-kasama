import styles from './TodoLists.module.scss';
import TodoItem from './TodoItem';

function TodoLists() {

  return (

    <ul className={styles.todo__lists}>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
      
    </ul>

  );
}

export default TodoLists;
