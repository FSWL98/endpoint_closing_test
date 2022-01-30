import React from 'react';
import { TodoItemType } from '../../types/types';
import { parseDate } from '../../utils/utils';

import './TodoItem.css';

const TodoItem = ({ item, complete } : { item: TodoItemType, complete: Function }) => {
    const isOverdue = () => {
        if (!item.dueDate)
            return false
        return new Date() > new Date(parseDate(item.dueDate))
    }

    return (
        <li
            className={`TodoItem${isOverdue() ? ' overdue' : ''}${item.isComplete ? ' completed' : ''}`}
            onClick={() => !item.isComplete && complete(item.id)}
            data-testid='todo-item'
        >
            <input type="checkbox" checked={item.isComplete} readOnly id={item.id} />
            <label htmlFor={item.id} className="TodoItem-description">{ item.description }</label>
            {item.dueDate && <span className="TodoItem-date">{ parseDate(item.dueDate) }</span> }
        </li>
    );
};

export default TodoItem;