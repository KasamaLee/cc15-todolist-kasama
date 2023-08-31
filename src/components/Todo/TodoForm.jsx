import { useState } from 'react';
import { Button } from '../Common/Button/Button';
import styles from './TodoForm.module.scss';

/*
props = {
  textSubmit : string
}
*/

/*
CC1 - Form Handle
- ใช้ FN ไปผูกกับ Event ชื่อ onSubmit
- FN จะถูก Browser เรียกใช้ (เมื่อไหร่?) โดยส่ง parameter มา 1 ตัว (event Object)
- โดย default ทุกปุ่มใน <form> จะทำหน้าที่ SubmitEvent
- วิธีแก้ ต้องกำหนด default type ของปุ่ม
  - type = 'submit' 
  - type = 'button' 
*/

function TodoForm(props) {
  const [isError, setIsError] = useState(true);

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log('submit');
  };

  const handleCancel = function () {
    console.log('cancel');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.todo__form__container}
    >
      {/*	Body */}
      <input className={styles.todo__form__input} placeholder='Task Name' />

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
