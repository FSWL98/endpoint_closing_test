import React from 'react';
import { render, screen } from '@testing-library/react';

import TodoItem from './TodoItem';
import {TodoItemType} from "../../types/types";

const completedItem : TodoItemType = {
    id: '1',
    description: 'test task',
    dueDate: '2021-06-21T14:00:00',
    isComplete: true,
};

const uncompletedItem : TodoItemType = {
    id: '2',
    description: 'test task',
    dueDate: '2021-06-21T14:00:00',
    isComplete: false,
};

const onChange : Function = jest.fn();


it('renders with proper text', () => {
    render(<TodoItem item={completedItem} complete={onChange} />);
    expect(screen.getByText(completedItem.description)).toBeInTheDocument();
    expect(screen.getByText('06/21/2021')).toBeInTheDocument();
});

it('render with proper classes', () => {
    render(<TodoItem item={completedItem} complete={onChange} />);
    render(<TodoItem item={uncompletedItem} complete={onChange} />);
    expect(screen.getAllByTestId('todo-item')[0]).toHaveClass('overdue completed');
    expect(screen.getAllByTestId('todo-item')[1]).not.toHaveClass('completed');
});

it('calls complete function on uncompleted items', () => {
    render(<TodoItem item={completedItem} complete={onChange} />);
    render(<TodoItem item={uncompletedItem} complete={onChange} />);
    const todo1 = screen.getAllByTestId('todo-item')[0];
    const todo2 = screen.getAllByTestId('todo-item')[1];
    todo1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).toBeCalledTimes(0);
    todo2.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChange).toBeCalledTimes(1);
});