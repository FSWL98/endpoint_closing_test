import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TodoItemType } from '../../types/types';
import TodoItem from "../TodoItem/TodoItem";

import './TodoList.css';

import { arraySort } from '../../utils/utils';
import Loader from "../Loader/Loader";

const TodoList = () => {
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get', {
            headers: {
                'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
            }
        }).then((response) => {
            const array = response.data;
            array.sort(arraySort);
            setList(array);
        })
            .catch(() => alert('Something went wrong with API request'))
            .finally(() => setLoading(false))
    }, []);

    const completeItem = (id: string) => {
        setLoading(true);
        axios.patch(`https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${id}`, {
            isComplete: true,
        }, {
            headers: {
                'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
            }
        })
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