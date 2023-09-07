import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss';
import { useEffect, useState } from 'react';
import useTodo from '../../../hooks/useTodo';

function Search() {

  const [searchKeyword, setSearchKeyword] = useState('')
  const { searchTodo } = useTodo();

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (searchKeyword.trim() !== '') searchTodo(searchKeyword);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchKeyword])

  // ชะลอการ search 1 วินาที
  const handleChangeInput = (e) => {
    setSearchKeyword(e.target.value);
  }


  return (
    <div className={styles.search}>
      <span className={styles.search__icon}>
        <FaSearch />
      </span>
      <input
        type='text'
        placeholder='search'
        className={styles.search__input}
        value={searchKeyword}
        onChange={handleChangeInput}
      />
    </div>
  );
}

export default Search;
