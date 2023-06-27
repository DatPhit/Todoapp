import { createSlice } from '@reduxjs/toolkit';
export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        search: '',
        type: 'ALL',
        startDate: '2023-05-31',
        startAsDe: '',
        deadlineDate: '2030-06-15',
        deadlineAsDe: '',
        workplace: '',
        priority: 'not',
        groupname: '',
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload;
        },
        typeFilterChange: (state, action) => {
            state.type = action.payload;
        },
        startDateFilterChange: (state, action) => {
            state.startDate = action.payload;
        },
        startAsDeFilterChange: (state, action) => {
            state.startAsDe = action.payload;
        },
        deadlineDateFilterChange: (state, action) => {
            state.deadlineDate = action.payload;
        },
        deadlineAsDeFilterChange: (state, action) => {
            state.deadlineAsDe = action.payload;
        },
        workplaceFilterChange: (state, action) => {
            state.workplace = action.payload;
        },
        priorityFilterChange: (state, action) => {
            state.priority = action.payload;
        },
        groupnameFilterChange: (state, action) => {
            state.groupname = action.payload;
        },
    },
});

export const {
    searchFilterChange,
    typeFilterChange,
    startDateFilterChange,
    startAsDeFilterChange,
    deadlineDateFilterChange,
    deadlineAsDeFilterChange,
    workplaceFilterChange,
    priorityFilterChange,
    groupnameFilterChange,
} = filterSlice.actions;
export default filterSlice.reducer;
