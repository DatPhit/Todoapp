import { createSlice } from '@reduxjs/toolkit';
import { TodoJobs } from '../../Services/ProjectsService';
export const todoSlice = createSlice({
    name: 'todoList',
    initialState: [...TodoJobs],
    reducers: {
        addTodo: (state, action) => {
            state.unshift(action.payload);
        },
        editTodo: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.id);
            const data = action.payload.data;
            state[index] = data;
        },
        deleteTodo: (state, action) => {
            state.splice(
                state.findIndex((job) => job.id === action.payload),
                1,
            );
        },
        changeStatusToTodo: (state, action) => {
            state[action.payload].status = 'Todo';
            state[action.payload].steps.forEach((step) => (step.stt = 'Todo'));
        },
        changeOrderTodo: (state, action) => {
            const [item] = state.splice(action.payload.from, 1);
            state.splice(action.payload.to, 0, item);
        },
        moveToTodo: (state, action) => {
            state.splice(action.payload.index, 0, action.payload.data);
        },
    },
});

export const { addTodo, editTodo, deleteTodo, changeStatusToTodo, changeOrderTodo, moveToTodo } =
    todoSlice.actions;
export default todoSlice.reducer;
