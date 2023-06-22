import { createSlice } from '@reduxjs/toolkit';
export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        search: '',
        type: 'ALL', // radio
        deadlineDate: '2030-06-15', // date, ascending, descending
        deadlineAsDe: '', // date, ascending, descending
        project: '',
        priority: 'not', //radio
        groupname: '',
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload;
        },
        typeFilterChange: (state, action) => {
            state.type = action.payload;
        },
        deadlineDateFilterChange: (state, action) => {
            state.deadlineDate = action.payload;
        },
        deadlineAsDeFilterChange: (state, action) => {
            state.deadlineAsDe = action.payload;
        },
        projectFilterChange: (state, action) => {
            state.project = action.payload;
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
    deadlineDateFilterChange,
    deadlineAsDeFilterChange,
    projectFilterChange,
    priorityFilterChange,
    groupnameFilterChange,
} = filterSlice.actions;
export default filterSlice.reducer;
