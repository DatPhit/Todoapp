import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const authenSelector = (state: RootState) => state.authen.status;
export const notifySelector = (state: RootState) => state.notify;

export const todoListSelector = (state: RootState) => state.todoList;
export const processListSelector = (state: RootState) => state.processList;
export const doneListSelector = (state: RootState) => state.doneList;

export const filterTypeSelector = (state: RootState) => state.filter.type;
export const filterSearchSelector = (state: RootState) => state.filter.search;
export const filterWorkplaceSelector = (state: RootState) => state.filter.workplace;
export const filterGroupnameSelector = (state: RootState) => state.filter.groupname;
export const filterPrioritySelector = (state: RootState) => state.filter.priority;
export const filterDeadlineDateSelector = (state: RootState) => state.filter.deadlineDate;
export const filterDeadlineAsDeSelector = (state: RootState) => state.filter.deadlineAsDe;
export const filterStartDateSelector = (state: RootState) => state.filter.startDate;
export const filterStartDateAsDeSelector = (state: RootState) => state.filter.startAsDe;

export const filterListSelector = createSelector(
    todoListSelector,
    processListSelector,
    doneListSelector,
    filterTypeSelector,
    filterSearchSelector,
    filterWorkplaceSelector,
    filterGroupnameSelector,
    filterPrioritySelector,
    filterDeadlineDateSelector,
    filterDeadlineAsDeSelector,
    filterStartDateSelector,
    filterStartDateAsDeSelector,
    (
        todoList,
        processList,
        doneList,
        type,
        searchValue,
        workplace,
        groupname,
        priority,
        deadlineDate,
        deadlineAsDe,
        startDate,
        startDateAsDe,
    ) => {
        const list = todoList.concat(processList).concat(doneList);
        if (deadlineAsDe === 'desc') {
            list.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
        }
        if (deadlineAsDe === 'asc') {
            list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        }

        if (startDateAsDe === 'desc') {
            list.sort(
                (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
            );
        }
        if (startDateAsDe === 'asc') {
            list.sort(
                (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
            );
        }
        return list.filter((job) => {
            if (
                job.task.includes(searchValue) &&
                job.workplace.includes(workplace) &&
                job.groupname.includes(groupname) &&
                (deadlineDate !== '' ? job.deadline <= deadlineDate : true) &&
                (startDate !== '' ? job.start_date > startDate : true)
            ) {
                if (type === 'ALL') {
                    return priority === 'not' ? job : job.priority.includes(priority);
                }
                return (
                    job.type === type &&
                    (priority === 'not' ? job : job.priority.includes(priority))
                );
            } else return null;
        });
    },
);
