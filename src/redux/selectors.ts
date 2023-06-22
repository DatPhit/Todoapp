import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const todoListSelector = (state: RootState) => state.todoList;
export const processListSelector = (state: RootState) => state.processList;
export const doneListSelector = (state: RootState) => state.doneList;

export const filterListSelector = createSelector(
    todoListSelector,
    processListSelector,
    doneListSelector,
    (todoList, processList, doneList) => {
        // todoList;
    },
);
