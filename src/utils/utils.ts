import { TodoItemType } from '../types/types';

export const parseDate = (dateString: string) => {
    const date = dateString.split('T')[0];
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
}

export const arraySort = (a: TodoItemType, b: TodoItemType) => {
    if (a.isComplete && !b.isComplete) {
        return 1;
    } else if (!a.isComplete && b.isComplete) {
        return -1;
    } else if (!a.dueDate && b.dueDate) {
        return 1;
    } else if (a.dueDate && !b.dueDate) {
        return -1;
    } else if (new Date(a.dueDate) > new Date(b.dueDate)) {
        return 1;
    }
    return -1;
}