import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DoneJobs } from '../../Services/ProjectsService';

import { ListJobProps } from '../../Model/ListJob';

export const doneSlice = createSlice({
    name: 'doneList',
    initialState: [...DoneJobs],
    reducers: {
        addDone: (state, action: PayloadAction<ListJobProps>) => {
            state.unshift(action.payload);
        },
        editDone: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.id);
            const data = action.payload.data;
            state[index] = data;
        },
        deleteDone: (state, action) => {
            state.splice(
                state.findIndex((job) => job.id === action.payload),
                1,
            );
        },
        changeStatusToDone: (state, action) => {
            state[action.payload].status = 'Done';
            state[action.payload].steps.forEach((step) => (step.stt = 'Done'));
        },
        changeOrderDone: (state, action) => {
            const [item] = state.splice(action.payload.from, 1);
            state.splice(action.payload.to, 0, item);
        },
        moveToDone: (state, action) => {
            state.splice(action.payload.index, 0, action.payload.data);
        },
        addJobShareToDone: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload);
            state[index].helpers?.push('Quang Đạt');
        },
        shareJobDone: (state, action) => {
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
    addDone,
    editDone,
    deleteDone,
    changeStatusToDone,
    changeOrderDone,
    moveToDone,
    addJobShareToDone,
    shareJobDone,
} = doneSlice.actions;

export default doneSlice.reducer;
