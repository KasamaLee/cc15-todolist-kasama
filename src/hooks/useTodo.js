import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function useTodo() {
    const sharedObj = useContext(TodoContext);
    return sharedObj;
}

export default useTodo;