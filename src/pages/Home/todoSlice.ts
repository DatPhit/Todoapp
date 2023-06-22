import { createSlice } from '@reduxjs/toolkit';
import { TodoJobs } from '../../Services/ProjectsService';
export const todoSlice = createSlice({
    name: 'todoList',
    initialState: [...TodoJobs],
    reducers: {
        addTodo: (state, action) => {
            state.unshift(action.payload);
        },
        deleteTodo: (state, action) => {
            state.splice(action.payload, 1);
        },
    },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
