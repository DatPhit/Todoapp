import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProcessingJobs } from '../../Services/ProjectsService';

import { ListJobProps } from '../../Model/ListJob';

export const procesSlice = createSlice({
    name: 'processList',
    initialState: [...ProcessingJobs],
    reducers: {
        addProcess: (state, action: PayloadAction<ListJobProps>) => {
            state.unshift(action.payload);
        },
        deleteProcess: (state, action) => {
            state.splice(
                state.findIndex((job) => job.id === action.payload),
                1,
            );
        },
        changeStepStatusToProcessing: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.indexJob);
            state[index].steps[action.payload.indexStep].stt = 'Processing';
        },
        changeStepStatusToDone: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.indexJob);
            state[index].steps[action.payload.indexStep].stt = 'Done';
        },
        changeStepStatusToTodo: (state, action) => {
            const index = state.findIndex((job) => job.id === action.payload.indexJob);
            state[index].steps[action.payload.indexStep].stt = 'Todo';
        },
        changeStatusToProcessing: (state, action) => {
            state[action.payload].status = 'Processing';
            state[action.payload].steps.forEach((step) => (step.stt = 'Processing'));
        },
        changeOrderProcess: (state, action) => {
            const [item] = state.splice(action.payload.from, 1);
            state.splice(action.payload.to, 0, item);
        },
        moveToProcessing: (state, action) => {
            state.splice(action.payload.index, 0, action.payload.data);
        },
    },
});

export const {
    addProcess,
    deleteProcess,
    changeStepStatusToProcessing,
    changeStepStatusToDone,
    changeStepStatusToTodo,
    changeStatusToProcessing,
    changeOrderProcess,
    moveToProcessing,
} = procesSlice.actions;

export default procesSlice.reducer;
