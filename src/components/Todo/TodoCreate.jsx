import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';

import TodoForm from './TodoForm.jsx';
import styles from './TodoCreate.module.scss';

/*
CC1 - Condition Rendering
- Default : Show Button & Text
- Active : Show TodoForm
*/

/*
CC2 - EVENT HANDLING
- เอาฟังก์ชันไปผูกติดกับ UI เพื่อให้ USER เป็นคนเรียกใช้ฟังก์ชันเอง
- onCLick : ต้อง CLick ก่อน , FN ถึงจะรัน
*/

/*
CC3 - JS Value ไม่สามารถทำให้ React Rerenderได้
- ต้องใช้ State
*/

/*
CC4 - React State (1 ในฟังก์ชันของกลุ่ม React Hook)
    const [state, setState] = useState(initialState: any)
- element 1: current State
- element 2: Fn สำหรับ setState
*/

// #1 : FC = Function Component (Render)
function TodoCreate() {
    // HOOk FN
    const [isOpenForm, setIsOpenForm] = useState(false);

    // let active = true;

    // #2 : JS Function (Logic)
    const handleClick = function (event) {
        // console.log('clicked', event);
        setIsOpenForm(!isOpenForm);
        // active = !active;
        // console.log('clicked', active);
    };

    return (
        <>
            {isOpenForm ? (
                < TodoForm />
            ) : (
                <div className={styles.todo__create} onClick={handleClick}>
                    <div className={styles.todo__create__button}>
                        <HiPlus />
                    </div>
                    <h3 className={styles.todo__create__text}>Add Task</h3>
                </div>
            )}
        </>
    );
}

export default TodoCreate;
