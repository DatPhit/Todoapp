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
        addJobShareToTodo: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload);
            state[index].helpers?.push('Quang Đạt');
        },
        shareJobTodo: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.id);
            state[index].type = 'Việc được chia sẻ';
            state[index].owner = 'Quang Đạt';
            if (state[index].group_shared) {
                state[index].group_shared?.push(action.payload.groupShare);
            } else state[index].group_shared = [action.payload.groupShare];
        },
    },
});

export const {
    addTodo,
    editTodo,
    deleteTodo,
    changeStatusToTodo,
    changeOrderTodo,
    moveToTodo,
    addJobShareToTodo,
    shareJobTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
