import React, { useState, useEffect } from 'react';
import { TodoItemType } from '../../types/types';
import TodoItem from "../TodoItem/TodoItem";

import './TodoList.css';

import { arraySort } from '../../utils/utils';
import Loader from "../Loader/Loader";
import taskService from "../../services/taskService";

const TodoList = () => {
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        taskService.getTasks().then((response) => {
            const array = response.data;
            array.sort(arraySort);
            setList(array);
        })
            .catch(() => alert('Something went wrong with API request'))
            .finally(() => setLoading(false))
    }, []);

    const completeItem = (id: string) => {
        setLoading(true);
        taskService.updateTask(id)
            .then(() => {
                const newList = list.map((el: TodoItemType) => {
                    if (el.id !== id)
                        return el
                    else return {
                        ...el,
                        isComplete: true,
                    }
                }).sort(arraySort);
                setList(newList as any);
            })
            .catch(() => alert('Something wrong with API request'))
            .finally(() => setLoading(false))
    }

    return (
        <>
        {isLoading && <div className='Loader'>
            <Loader />
        </div> }
            <ul className="TodoList">
                {list.map((el: TodoItemType) => <TodoItem item={el} complete={completeItem} key={el.id} />)}
            </ul>
        </>
    )
};

export default TodoList;